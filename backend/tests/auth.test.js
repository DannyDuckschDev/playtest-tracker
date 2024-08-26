// backend/test/auth.test.js

const request = require('supertest'); // Use supertest to conduct HTTP tests
const app = require('../app'); // Import the express application
const { sequelize } = require('../config/db'); // Import the sequelize instance
const User = require('../models/User'); // Import the User model


// Synchronize the database before running any tests
beforeAll(async () => {
    await sequelize.sync(); 
});

// Clean up the Users table before each test
beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0'); //Deactivates foreign key checks
    await User.destroy({ where: {}, truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // Reactivates foreign key checks
});

// Close the database connection after all tests are done
afterAll(async () => {
    await sequelize.close();
});

describe('Auth Endpoints', () => { // Group of tests for authentication endpoints

    // Test to check if user registration is successful
    it('should register a new user', async () => {
        const res = await request(app) // Make an HTTP request to the express application
            .post('/api/auth/register') // POST request to the /api/auth/register route
            .send({ // Body of the request containing registration data
                username: "testuser",
                email: "test@example.com",
                password: 'password123'
            });
        console.log(res.body); // Log the response body to see details
        expect(res.statusCode).toEqual(200); // Expect the status code to be 200
        expect(res.body).toHaveProperty('token'); // Expect the response to include a token
    }, 20000);  // Set timeout to 20 seconds

    // Test to ensure registration fails if required fields are missing
    it('should not register a user with missing fields', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: "test2@example.com",
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body.errors).toHaveLength(1); // Expect exactly one validation error
        expect(res.body.errors[0].msg).toEqual('Username is required'); // Expect a specific error message
    }, 20000);  // Set timeout to 20 seconds

    // Test to ensure registration fails with an invalid email format
    it('should not register a user with invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser2",
                email: "invalid-email", // Invalid email format
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body.errors).toHaveLength(1); // Expect exactly one validation error
        expect(res.body.errors[0].msg).toEqual('Please include a valid email'); // Expect a specific error message
    }, 20000);  // Set timeout to 20 seconds

    // Test to ensure registration fails if the password is too short
    it('should not register a user with short password', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser3",
                email: "test3@example.com",
                password: '123' // Password too short
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body.errors).toHaveLength(1); // Expect exactly one validation error
        expect(res.body.errors[0].msg).toEqual('Password must be at least 6 characters long'); // Expect a specific error message
    }, 20000); // Set timeout to 20 seconds

    // Test to ensure registration fails if the email is already in use
    it('should not allow registering a user with an existing email', async () => {
        // Register the first user
        await request(app)
            .post('/api/auth/register')
            .send({
                username: "username",
                email: "test@example.com",
                password: 'password123'
            });
        
        // Attempt to register the same email again
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser2",
                email: "test@example.com", // Same email as before
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body).toHaveProperty('msg', 'User already exists'); // Expect a specific error message
    } ,20000); // Set timeout to 20 seconds

    // Test to check if a user can log in successfully
    it('should login an existing user', async () => {
        // Create a user directly in the database
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
        expect(res.statusCode).toEqual(200); // Expect the status code to be 200
        expect(res.body).toHaveProperty('token'); // Expect the response to include a token
    }, 20000);  // Set timeout to 20 seconds

    // Test to ensure login fails with an invalid email format
    it('should not login with invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "not-an-email", // Invalid email format
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body.errors).toHaveLength(1); // Expect exactly one validation error
        expect(res.body.errors[0].msg).toEqual('Please include a valid email'); 
    }, 20000);  // Set timeout to 20 seconds

    // Test to ensure login fails if the password is missing
    it('should not login with missing password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "test@example.com"
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body.errors).toHaveLength(2); // Expect exactly one validation error
        expect(res.body.errors[0].msg).toEqual('Password is required'); // Expect a specific error message
        expect(res.body.errors[1].msg).toEqual('Password must be at least 6 characters long'); //Expect a specific error message
    }, 20000);  // Set timeout to 20 seconds

    // Test to ensure login fails if the password is incorrect
    it('should not login with incorrect password', async () => {
        // Create a user directly in the database
        await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword' // Incorrect password
            });
        expect(res.statusCode).toEqual(400); // Expect the status code to be 400
        expect(res.body).toHaveProperty('msg', 'Invalid login data'); // Expect a specific error message
    }, 20000);  // Set timeout to 20 seconds
});
