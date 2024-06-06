const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Replicate = require('replicate');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

const app = express();
const port = 3000; // Ensure this matches what your Angular service expects
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT_ANGULAR || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

const bcrypt = require('bcryptjs');
const pool = require('./dataBase');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
//const authRoutes = require('./routes/authRoutes');
//app.use('/api', searchDocumentsRouter);

const JWT_SECRET = process.env.JWT_SECRET

// LLM Communication API
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

app.post('/generate-document', async (req, res) => {
    console.log('Using API Token:', process.env.REPLICATE_API_TOKEN);
    try {
    const input = {
        prompt: req.body.prompt,
        top_k: req.body.top_k || 50,
        top_p: req.body.top_p || 0.9,
        temperature: req.body.temperature || 0.6,
        max_new_tokens: req.body.max_new_tokens || 512,
        prompt_template: req.body.prompt_template || "<s>[INST] {prompt} [/INST] ",
        presence_penalty: req.body.presence_penalty || 0,
        frequency_penalty: req.body.frequency_penalty || 0
    };

    const events = replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input });

    let fullResponse = '';

    for await (const event of events) {
        console.log(event.toString());
        fullResponse += event.toString();
    }

    res.send({ message: fullResponse }); // Send the complete response back to the client

    } catch (error) {
    console.error('Failed to generate document:', error);
    res.status(500).send('Failed to generate document');
    }
});


// API Registration Requests
app.post('/register', async (req, res) => {
    const { username, email, password1 } = req.body;
    try {
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password1, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password1) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        const userId = newUser.rows[0].id;
        const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token: token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Unable to register user' });
    }
});
// API Login Request
app.post('/login', async (req, res) => {
    const { email, password1 } = req.body;
    try {
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
        const isValid = await bcrypt.compare(password1, user.rows[0].password1);
        if (isValid) {
        const token = jwt.sign({ userId: user.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
        } else {
        res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
    } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Unable to login' });
    }
});

// API Document Search
router.post('/search-documents', async (req, res) => {
    const { prompt } = req.body;

      // SQL to search documents based on keywords
    const query = `
        SELECT id, title, category, content1, created_at FROM documents
        WHERE content1 ILIKE $1 OR title ILIKE $1
        ORDER BY created_at DESC
        LIMIT 10;
    `;
    try {
        const results = await pool.query(query, [`%${prompt}%`]);
        res.json(results.rows);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).send({ message: 'Error retrieving documents' });
    }
});

//module.exports = router;

// API endpoint for fetching documents
app.get('/documents', (req, res) => {
    pool.query('SELECT * FROM documents', (error, results) => {
    if (error) {
        return res.status(400).json({ error: "Database error occurred" });
    }
    res.status(200).json(results.rows);
    });
});


app.post('/generate-summary', async (req, res) => {
console.log('Using API Token:', process.env.REPLICATE_API_TOKEN);
//const { content } = req.body.prompt;
//const prompt = "Summarize this text: " + { content };
try {
    const input = {
        prompt: req.body.prompt,
        top_k: req.body.top_k || 50,
        top_p: req.body.top_p || 0.9,
        temperature: req.body.temperature || 0.6,
        max_new_tokens: req.body.max_new_tokens || 512,
        prompt_template: req.body.prompt_template || "<s>[INST] {prompt} [/INST] ",
        presence_penalty: req.body.presence_penalty || 0,
        frequency_penalty: req.body.frequency_penalty || 0
    };

    let summary = '';
    const events = replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input });
    for await (const event of events) {
        console.log(event.toString());
        summary += event.toString();
        
    }

    res.send({ message: summary }); // Send the complete response back to the client
    //res.json({ success: true, summary: summary });
    //loadDocumentSummary();

    } catch (error) {
    console.error('Failed to generate summary:', error);
    res.status(500).send('Failed to generate summary');
    }
});



// Server response
/*
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
*/
// Export app
module.exports = { app, pool };
