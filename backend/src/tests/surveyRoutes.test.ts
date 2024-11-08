// backend/tests/surveyRoutes.test.ts

import request from 'supertest';
import app from '../app'; // Import the Express app
import { sequelize } from '../config/db'; // Import Sequelize instance

// Interface to type the response from created survey
interface SurveyResponse {
    id: number;
    title: string;
    description?: string;
    questions: Record<string, any>;
    createdBy: number;
}

// Before running any tests, sync the database
beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync and reset the database
});

describe('Survey Routes', () => {
    let surveyId: number;

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

        // Cast res.body to SurveyResponse to enforce the expected structure
        const surveyData = res.body as SurveyResponse;

        // Validate the status code an the structure of the response
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(surveyData.title).toEqual('Test Survey');
        expect(surveyData.description).toEqual('This is a test survey');

        //Save the survey ID for other tests
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
