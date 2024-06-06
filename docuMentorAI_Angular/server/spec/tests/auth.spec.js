const request = require('supertest');
const { app, pool } = require('../../server');

describe('Authentication functionality', () => {
    beforeAll(async () => {
        // Clean up existing test data if it exists
        await pool.query('DELETE FROM users WHERE email = $1', ['testuser@example.com']);
        await pool.query('DELETE FROM users WHERE email LIKE $1', ['newuser%@example.com']);
    });

    it('should register a new user successfully', async () => {
        const uniqueEmail = `testuser${Date.now()}@example.com`;
        const uniqueUser = `testuser${Date.now()}`;  
        const response = await request(app)
            .post('/register')
            .send({
                username: uniqueUser,
                email: uniqueEmail,
                password1: 'password123'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it('Registration should fail with existing email', async () => {
        const email = 'testuser@example.com';
        // Register a user first
        await request(app)
            .post('/register')
            .send({
                username: 'testuser1',
                email: email,
                password1: 'password123'
            });

        // Try to register with the same email again
        const response = await request(app)
            .post('/register')
            .send({
                username: 'testuser2',
                email: email,
                password1: 'password123'
            });
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe('Email already registered');
    });
});