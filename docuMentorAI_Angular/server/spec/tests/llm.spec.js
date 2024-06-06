const request = require('supertest');
const { app, pool } = require('../../server');
const Replicate = require('replicate');

describe('Test Suite', function() {
    it('should make a request', async () => {
        const res = await request(app).get('/documents');
        expect(res.status).toBe(200);
    });
});


describe('LLM Functionality Tests', function() {
    describe('Fetch Documents', function() {
        it('should retrieve all documents successfully', async () => {
            const response = await request(app)
                .get('/documents')
                .expect(200)  
                .expect('Content-Type', /json/);  

            expect(response.body).toEqual(jasmine.any(Array));  
            if (response.body.length > 0) {
                expect(response.body[0]).toEqual(jasmine.objectContaining({
                    id: jasmine.any(Number),
                    title: jasmine.any(String),
                    content1: jasmine.any(String),
                    category: jasmine.any(String),
                    created_at: jasmine.any(String)
                }));  
            }
        });

        it('should handle database errors gracefully', async () => {
            spyOn(pool, 'query').and.callFake((sql, callback) => callback(new Error("Database error"), null));

            const response = await request(app)
                .get('/documents')
                .expect(400);  

            expect(response.body).toEqual(jasmine.objectContaining({
                error: jasmine.any(String)
            }));  
        });
    });
});


    describe('Search Documents', function() {
        it('should search documents successfully', async () => {
            const prompt = 'example search';
            const mockResults = [
                { id: 1, title: 'Example Document', category: 'Example', content1: 'This is an example document content.', created_at: new Date().toISOString() }
            ];

            spyOn(pool, 'query').and.returnValue(Promise.resolve({ rows: mockResults }));

            const response = await request(app)
                .post('/api/search-documents')
                .send({ prompt })
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toEqual(jasmine.any(Array));
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toEqual(jasmine.objectContaining({
                id: jasmine.any(Number),
                title: jasmine.any(String),
                category: jasmine.any(String),
                content1: jasmine.any(String),
                created_at: jasmine.any(String)
            }));
        });


    describe('Generate Summary', function() {
        it('should generate a summary successfully', async () => {
            const prompt = 'Summarize this text';
            const mockSummary = 'This is a summary of the text.';

            spyOn(Replicate.prototype, 'stream').and.returnValue({
                [Symbol.asyncIterator]: async function* () {
                    yield mockSummary;
                }
            });

            const response = await request(app)
                .post('/generate-summary')
                .send({ prompt })
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toEqual(jasmine.objectContaining({
                message: jasmine.any(String)
            }));        
    });
});
});


