//Import the express modul
const express = require('express');
const { connectDB, sequelize } = require('./config/db'); //Import the database connection function

//Creat express app
const app = express();

//Define the port, where the server should run
const port = 3000;

//Connet to database
connectDB();

//Middleware
app.use(express.json({ extended: false })); //Middleware to parse JSON requsts

//Routs
app.use('/api/auth', require('./routes/auth')); //Use the authentification routes

//Create simple Route for start page
app.get('/', (req, res) => {
    res.send('Hello World!'); //Simple route to check if the server is running
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, async () => {
        console.log(`Server running at http://localhost: ${port}`);
        await sequelize.sync(); //Syncronize the database
    });
} else {
    sequelize.sync(); //Synchronize the database for tests
}

module.exports = app;