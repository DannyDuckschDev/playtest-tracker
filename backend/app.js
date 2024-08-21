// backend/app.js

//Import the express modul to create a server
const express = require('express');
const { connectDB, syncDB } = require('./config/db'); //Import the database connection function and the Sequelize instance


//Creat an instance of an Express application
const app = express();

//Define the port, where the server should run
const port = 3000;

//Establish a connection to the database
connectDB();

//Middleware to parse income JSON requests
app.use(express.json({ extended: false })); 

//Define the route for authentification-related API entpoints
app.use('/api/surveys', require('./routes/surveyRoutes')); //Ensure this route is set up for your surveys

//Define a simple route for the root URL to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello World!'); 
});

//Start the server and sync the database
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, async () => {
        console.log(`Server running at http://localhost: ${port}`);
        await syncDB(); //Synchronize the entire database schema, including all models
    });
} else {
    syncDB(); //Synchronize the database when running tests
}

//Export the app instance for testing or further usage
module.exports = app;