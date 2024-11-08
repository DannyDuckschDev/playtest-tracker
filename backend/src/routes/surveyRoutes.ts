// backend/routes/surveyRoutes.ts

import express, { Request, Response } from 'express';
import Survey from '../models/Survey';

const router = express.Router();

// Interface for Survey request body to ensure type safety
interface SurveyRequestBody {
    title: string;
    description?: string;
    questions: Record<string, any>;
    createdBy: number;
}

// Route to create a new survey
router.post('/create', async (req: Request<{}, {}, SurveyRequestBody>, res: Response) => {
    try {
        const { title, description, questions, createdBy } = req.body;

        // Create a new survey using the data from the request
        const newSurvey = await Survey.create({ title, description, questions, createdBy });

        // Respond with the created survey
        res.status(201).json(newSurvey);
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route to retrieve all surveys
router.get('/', async (_req: Request, res: Response) => {
    try {
        // Fetch all surveys from the database
        const surveys = await Survey.findAll();
        // Respond with the list of all surveys
        res.status(200).json(surveys);
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route to retrieve a single survey by ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Fetch a specific survey by its ID
        const survey = await Survey.findByPk(req.params.id);

        if (!survey) {
            return res.status(404).json({ msg: 'Survey not found' });
        }
        // Respond with the retrieved survey
        res.status(200).json(survey);
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route to update an existing survey
router.put('/:id', async (req: Request<{ id: string }, {}, SurveyRequestBody>, res: Response) => {
    try {
        const { title, description, questions } = req.body;

        // Find the survey to update
        const survey = await Survey.findByPk(req.params.id);

        if (!survey) {
            return res.status(404).json({ msg: 'Survey not found' });
        }

        // Update the survey with the new data
        survey.title = title;
        survey.description = description ?? '';
        survey.questions = questions;
        await survey.save();

        // Respond with the updated survey
        res.status(200).json(survey);
    } catch (err) {
        const error = err as Error;
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// Route to delete a survey
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Find the survey to delete
        const survey = await Survey.findByPk(req.params.id);

        if (!survey) {
            return res.status(404).json({ msg: 'Survey not found' });
        }

        // Delete the survey from the database
        await survey.destroy();

        // Respond with a success message
        res.status(200).json({ message: 'Survey deleted' });
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default router;
