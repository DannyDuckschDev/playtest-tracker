// backend/src/config/sequelize.config.ts
import { Dialect, Options } from 'sequelize';

//Database configuration for different environments
const config: { [key: string]: Options } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    database: 'playtest_tracker_dev',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307, // Note: used the port 3307 to avoid conflicts with
    dialect: 'mysql' as Dialect,
    logging: false, //Disable logging for development
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    database: 'playtest_tracker_test',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307, // Note: used the port 3307 to avoid conflicts with
    dialect: 'mysql' as Dialect,
    logging: false, //Disable logging for tests
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    database: 'playtest_tracker_prod',
    host: process.env.DB_HOST || 'localhost',
    // No explicit port set – assumes default port 3306 for production
    dialect: 'mysql' as Dialect,
    logging: false, //Disable logging for production
  },
};

export default config; //Use standard expression
