//backend/config/db.js
const {Sequelize} = require('sequelize');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}); //Load environment variable

//Create connetion to MariaDB
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4', // Use utf8mb4 as encoding
    },
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