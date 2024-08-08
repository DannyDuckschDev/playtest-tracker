//backend/test/auth.test.js

const request = require('supertest'); // use supertest to conduct HTTP-Tests
const app = require('../app'); // import the express application
const { sequelize } = require('../config/db'); //import the sequelize-instance
const User = require('../models/User');

//Synchronize the database
beforeAll(async () => {
    await sequelize.sync(); 
});

//Cleanup the users table before each test
beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
});

//Cleanup the database after eacht test
afterAll(async () => {
    await sequelize.close(); //close database
});

describe('Auth Endpoints', () => { //group of tests for authenficiation-endpoints
    it('should register a new user', async () => { //one test to check the user registration
        const res = await request(app) // HTTP-Request to start the express-application
        .post('/api/auth/register') // POST request to /api/auth/register route
        .send({ // the body of the request includes the registration data
            username: "testuser",
            email: "test@example.com",
            password: 'password123'
        });
        console.log(res.body); // log answer, to see the details
        expect(res.statusCode).toEqual(200); // expected the status code to be 200
        expect(res.body).toHaveProperty('token'); //expected that the response includes a token
    });
});