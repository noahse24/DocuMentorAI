const request = require('supertest');
const { app, pool } = require('../../server');
const bcrypt = require('bcryptjs');

describe('Integration Tests', () => {
    let token;

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

        // Clean up existing test data if it exists
        await pool.query('DELETE FROM users WHERE email = $1', ['testuser@example.com']);
        await pool.query('DELETE FROM users WHERE email LIKE $1', ['newuser%@example.com']);

        // Create a test user
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        await pool.query(
            'INSERT INTO users (username, email, password1) VALUES ($1, $2, $3)',
            ['testuser', 'testuser@example.com', hashedPassword]
        );

        // Log in to get a token
        const response = await request(app)
            .post('/login')
            .send({
                email: 'testuser@example.com',
                password1: 'testpassword'
            });

        token = response.body.token;
    });

    afterAll(async () => {
        // Clean up test data
        await pool.query('DELETE FROM users WHERE email = $1', ['testuser@example.com']);
        await pool.query('DELETE FROM documents WHERE title = $1', ['Test Document']);
    });

    it('should allow a user to register, login, and perform actions with a valid token', async () => {
        const uniqueEmail = `newuser${Date.now()}@example.com`;

        // Register a new user
        const registerResponse = await request(app)
            .post('/register')
            .send({
                username: 'newuser',
                email: uniqueEmail,
                password1: 'newpassword'
            });

        expect(registerResponse.statusCode).toBe(201);
        expect(registerResponse.body.token).toBeDefined();

        // Login with the new user
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: uniqueEmail,
                password1: 'newpassword'
            });

        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body.token).toBeDefined();

        // Use the token to create a document
        const documentResponse = await request(app)
            .post('/generate-document')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .send({
                prompt: 'Test Document Content'
            });

        expect(documentResponse.statusCode).toBe(200);
        expect(documentResponse.body.message).toBeDefined();
    });

    it('should search documents successfully with a valid token', async () => {
        // Create a test document
        await pool.query(
            'INSERT INTO documents (title, category, content1) VALUES ($1, $2, $3)',
            ['Test Document', 'Test', 'This is a test document.']
        );

        // Search for the document
        const searchResponse = await request(app)
            .post('/api/search-documents')
            .set('Authorization', `Bearer ${token}`)
            .send({
                prompt: 'Test Document'
            });

        expect(searchResponse.statusCode).toBe(200);
        expect(searchResponse.body).toEqual(jasmine.any(Array));
        expect(searchResponse.body.length).toBeGreaterThan(0);
        expect(searchResponse.body[0]).toEqual(jasmine.objectContaining({
            title: 'Test Document'
        }));
    });
});


