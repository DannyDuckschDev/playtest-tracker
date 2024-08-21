// backend/routes/surveyRoutes.js

//Import the express module and create a router instance
const express = require('express');
const router = express.Router();

//Import the Survey model to interact with the Surveys table
const Survey = require('../models/Survey'); 

//Route to create a new survey
router.post('/create', async (req, res) => {
    try {
        console.log('Received data:', req.body); //log received data
        const { title, description, questions, createdBy } = req.body;

        //Create a new survey using the data from the request
        const newSurvey = await Survey.create({ title, description, questions, createdBy });

        //Respond with the created survey
        res.status(201).json(newSurvey);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//Route to retrieve all surveys
router.get('/', async (req, res) => {
    try {
        //Fetch all surveys from the database
        const surveys = await  Survey.findAll();
        //Respond with the list of all surveys
        res.status(200).json(surveys);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Route to retrieve a single survey by ID
router.get('/:id', async (req, res) => {
    try {
        //Fetch a specific survey by its ID
        const survey = await Survey.findByPk(req.params.id);

        if (!survey) {
            return res.status(404).json({ msg: 'Survey not found'}); 
        } 
        //Respond with the retrieved survey
        res.status(200).json(survey);
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Route to update an existing survey
router.put('/:id', async (req, res) => {
    try {

        const { title, description, questions } = req.body;

        //Find the survey to update
        const survey = await Survey.findByPk(req.params.id);


        if (!survey) {
            return res.status(404).json({ msg: 'Survey not found'});

        } 
        
        //Update the survey with the new data
        survey.title = title;
        survey.description = description;
        survey.questions = questions;
        await survey.save();

        //Respond with the updated survey
        res.status(200).json(survey);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

//Route to delete a survey
router.delete('/:id', async (req, res) => {
    try {
        //Find the survey to delete
        const survey = await Survey.findByPk(req.params.id);

        if (!survey) {
            return res.status(404).json({ msg: 'Survey not found'});
        } 
        
        //Delete the survey from the database
        await survey.destroy();
        
        //Respond with a success message
        res.status(200).json({ message: 'Survey deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Export the router to be used in the main app
module.exports = router;