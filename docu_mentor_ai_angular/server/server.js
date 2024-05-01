const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
//const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const users = [];

// Secret key for JWT token generation
const JWT_SECRET = 'your-secret-key';

app.use('/api', documentRouter);

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
  try {
      // Extract user details from request body
      const { username, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user details to the database (or in-memory storage)
      users.push({ username, email, password: hashedPassword });

      // Respond with success message
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for user login
app.post('/api/login', async (req, res) => {
  try {
      // Extract login credentials from request body
      const { username, password } = req.body;

      // Find the user in the database (or in-memory storage)
      const user = users.find(user => user.username === username);

      // If user not found, respond with error
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If password does not match, respond with error
      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ username: user.username }, JWT_SECRET);

      // Respond with token
      res.status(200).json({ token });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

/*
// Define routes and API endpoints here
app.post('/api/v1/storeDocument', (req, res) => {
    // Implement logic to store the document in the database
    res.status(200).json({ message: 'Document stored successfully' });
  });

// Example route for retrieving a document
app.get('/api/v1/retrieveDocument', (req, res) => {
    // Implement logic to retrieve the document from the database
    res.status(200).json({ message: 'Document retrieved' });
  });
*/

//const server = createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
