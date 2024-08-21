// backend/models/Survey.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Survey = sequelize.define('Survey', {
    title: { //title of the survey
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: { //optional description 
        type: DataTypes.TEXT,
        allowNull: true,
    },
    questions: {
        type: DataTypes.JSON, //Assuming questions could be a JSON object
        allowNull: false,
    },
    createdBy: { //ID of the user
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: { // status active or archieved
        type: DataTypes.STRING,
        defaultValue: 'active',
    }
}, {
    timestamps: true, //automatic time stamps
});

module.exports = Survey;