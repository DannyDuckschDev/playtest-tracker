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

    it('should login an existing user', async () => {
        await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });
        
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not allow registering a fuser with an existing email', async () => {
        //Register the first user
        await request(app)
            .post('/api/auth/register')
            .send({
                username: "username",
                email: "test@example.com",
                password: 'password123'
            });
        
        //Attempt to register the same email again
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser2",
                email: "test@example.com", //Same email as before
                password: 'password123'
            });
        console.log(res.body);
        expect(res.statusCode).toEqual(400); //Expecting a failure due to existing email
        expect(res.body).toHaveProperty('msg', 'User already exists'); //The expected error message
    });
});