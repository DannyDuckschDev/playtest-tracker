// backend/app.ts

import express, { Application, Request, Response } from 'express';
import { connectDB, syncDB } from './config/db'; // Database connection and sync functions
import cors from 'cors'; // CORS middleware
import authRoutes from './routes/authRoutes';
import surveyRoutes from './routes/surveyRoutes';

// Create an instance of an Express application
const app: Application = express();

// Define the port where the server should run
const port = process.env.PORT || 3000;

// Establish a connection to the database
connectDB();

// Use CORS middleware with specific configurations
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes for authentication and surveys
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);

// Root route to check if the server is running
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server and sync the database, except in test environments
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, async () => {
        console.log(`Server running at http://localhost:${port}`);
        await syncDB(); // Sync database schema, including all models
    });
} else {
    syncDB(); // Sync database during tests
}

// Export the app instance for testing or further usage
export default app;
