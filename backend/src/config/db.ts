// backend/config/db.ts
import { Sequelize } from 'sequelize'; // Sequelize import in TypeScript
import dotenv from 'dotenv'; // Imports dotenv for environment variables

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}); // Loads the environment variables depending on the environment

// Creates a connection to MariaDB with types
const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Uses utf8mb4 as character encoding for Unicode support
        },
    }
);

// Function for establishing the database connection with error handling
const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Function for synchronizing the database
const syncDB = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: false }); //force: true deletes and recreates the tables 
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

// Exports sequelize, connectDB and syncDB with TypeScript export syntax
export { sequelize, connectDB, syncDB };
