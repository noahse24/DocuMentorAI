const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Ensure this matches what your Angular service expects

app.use(bodyParser.json());
app.use(cors());

const documents = [
    { id: 1, title: 'Document 1', description: 'Description of Document 1', summary: 'Summary of Document 1' },
    { id: 2, title: 'Document 2', description: 'Description of Document 2', summary: 'Summary of Document 2' }
];

app.get('/api/documents', (req, res) => {
    res.status(200).json(documents);
});

app.get('/api/documents/:id/summary', (req, res) => {
    const documentId = parseInt(req.params.id);
    const document = documents.find(doc => doc.id === documentId);

    if (!document) {
        return res.status(404).send('Document not found');
    }

    res.status(200).json({ summary: document.summary });
});

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
