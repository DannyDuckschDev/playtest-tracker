// backend/tests/surveyRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Import the Express app
const { sequelize } = require('../config/db'); // Import Sequelize instance

// Before running any tests, sync the database
beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync and reset the database
});

describe('Survey Routes', () => {
    let surveyId;

    // Test creating a new survey
    it('should create a new survey', async () => {
        const res = await request(app)
            .post('/api/surveys/create')
            .send({
                title: 'Test Survey',
                description: 'This is a test survey',
                questions: {
                    question1: 'What is your favorite color?',
                    question2: 'How often do you exercise?',
                },
                createdBy: 1,
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        surveyId = res.body.id;
    });

    // Test retrieving all surveys
    it('should retrieve all surveys', async () => {
        const res = await request(app)
            .get('/api/surveys');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test retrieving a single survey by ID
    it('should retrieve a survey by ID', async () => {
        const res = await request(app)
            .get(`/api/surveys/${surveyId}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', surveyId);
    });

    // Test updating an existing survey
    it('should update a survey', async () => {
        const res = await request(app)
            .put(`/api/surveys/${surveyId}`)
            .send({
                title: 'Updated Survey',
                description: 'This is an updated test survey',
                questions: {
                    question1: 'What is your updated favorite color?',
                    question2: 'How often do you exercise?',
                },
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Survey');
    });

    // Test deleting a survey
    it('should delete a survey', async () => {
        const res = await request(app)
            .delete(`/api/surveys/${surveyId}`);
        
        expect(res.statusCode).toEqual(200);
    });

    // Test retrieving the deleted survey (should return 404)
    it('should return 404 for a deleted survey', async () => {
        const res = await request(app)
            .get(`/api/surveys/${surveyId}`);
        
        expect(res.statusCode).toEqual(404);
    });
});

// After all tests are done, close the database connection
afterAll(async () => {
    await sequelize.close();
});
