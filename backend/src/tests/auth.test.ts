// backend/test/auth.test.ts

import request from 'supertest'; // Use supertest to conduct HTTP tests
import app from '../app'; // Import the express application
import { sequelize } from '../config/db'; // Import the sequelize instance
import User from '../models/User'; // Import the User model

// Synchronize the database before running any tests
beforeAll(async () => {
    await sequelize.sync();
});

// Clean up the Users table before each test
beforeEach(async () => {
    await sequelize.sync();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0'); // Deactivates foreign key checks
    await User.destroy({ where: {}, truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // Reactivates foreign key checks

    //Debugging
    //const users = await User.findAll();
    //console.log('Amount User before each Test:', users.length); //Should be 0
});

// Close the database connection after all tests are done
afterAll(async () => {
    await sequelize.close();
});

describe('Auth Endpoints', () => {
    // Test to check if user registration is successful
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser",
                email: "test@example.com",
                password: 'password123'
            });
        //console.log("Response Body:", res.body); //Debugging Log
        //console.log("Response Status:", res.statusCode); //Debugging Log
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    }, 20000);

    // Test to ensure registration fails if required fields are missing
    it('should not register a user with missing fields', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: "test2@example.com",
                password: 'password123'
            });
        //console.log("Response Body:", res.body); //Debugging Log
        //console.log("Response Status:", res.statusCode); //Debugging Log
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toEqual('Username is required');
    }, 20000);

    // Test to ensure registration fails with an invalid email format
    it('should not register a user with invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser2",
                email: "invalid-email",
                password: 'password123'
            });
        //console.log("Response Body:", res.body); //Debugging Log
        //console.log("Response Status:", res.statusCode); //Debugging Log
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toEqual('Please include a valid email');
    }, 20000);

    // Test to ensure registration fails if the password is too short
    it('should not register a user with short password', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser3",
                email: "test3@example.com",
                password: '123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toEqual('Password must be at least 8 characters long');
    }, 20000);

    // Test to ensure registration fails if the email is already in use
    it('should not allow registering a user with an existing email', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: "username",
                email: "test@example.com",
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "testuser2",
                email: "test@example.com",
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg', 'User already exists');
    }, 20000);

    // Test to check if a user can log in successfully
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
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    }, 20000);

    // Test to ensure login fails with an invalid email format
    it('should not login with invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "not-an-email",
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toEqual('Please include a valid email');
    }, 20000);

    // Test to ensure login fails if the password is missing
    it('should not login with missing password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "test@example.com"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toHaveLength(2);
        expect(res.body.errors[0].msg).toEqual('Password is required');
        expect(res.body.errors[1].msg).toEqual('Password must be at least 8 characters long');
    }, 20000);

    // Test to ensure login fails if the password is incorrect
    it('should not login with incorrect password', async () => {
        await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg', 'Invalid login data');
    }, 20000);
});

export {}; // Ensures that TypeScript treats this file as a module
