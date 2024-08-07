//backend/config/db.js
const {Sequelize} = require('sequelize');

//Connetion to MariaDB
const sequelize = new Sequelize('playtest-tracker', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};

module.exports = {sequelize, connectDB};