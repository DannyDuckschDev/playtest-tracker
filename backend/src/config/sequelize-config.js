//backend/src/config/sequelize.config.js

// This file acts as a bridge between Sequelize CLI (which expects JS)
// and the actual config file written in TypeScript.
// It enables runtime TypeScript transpilation so it keeps the config type-safe.
require('ts-node/register'); // Allows Node to interpret .ts files via ts-node
const config = require('./sequelize.config.ts').default; // Import default export from TS config
module.exports = config; // Export it so the CLI can use it
