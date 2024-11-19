//backend/src/config/sequelize.config.js

// This bridges Sequelize CLI to the TypeScript configuration file.
require('ts-node/register'); //Enable Typescript transpilation at runtime
const config = require('./sequelize.config.ts').default; //Use the default export
module.exports = config;
