//backend src/scripts/runMigration.ts

// Note: The runMigration.ts script was set up to apply Sequelize migrations programmatically. 
// However, due to a database error during initial testing and limited backend debugging time, 
// the migration step was not completed. Table creation was done manually for development.


import { Sequelize } from 'sequelize'; // Import Sequelize for database connection
import { execSync } from 'child_process'; // To execute commands
import path from 'path'; // For path handling
import config from '../config/sequelize.config'; // Import the configuration file for environments

// Determine the current environment, defaulting to 'development' if not set
const env = process.env.NODE_ENV || 'development';

// Get the specific Sequelize configuration for the current environment
const sequelizeConfig = config[env];

(async () => {
  // Initialize a Sequelize instance using the selected configuration
  const sequelize = new Sequelize(sequelizeConfig);

  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    // Resolve the path to the migrations folder
    const migrationsPath = path.resolve(__dirname, '../migrations');

    // Run the migrations using the sequelize-cli
    execSync(
      `npx ts-node ./node_modules/sequelize-cli/lib/sequelize db:migrate --config src/config/sequelize.config.ts --migrations-path src/migrations`,
      { stdio: 'inherit' } // This makes the logs of the command appear in the terminal
    );

    console.log('Migrations executed successfully.');
  } catch (error) {
    // Handle any errors during the connection or migration process
    console.error('Unable to connect to the database or run migrations:', error);
  } finally {
    // Ensure the connection is properly closed
    await sequelize.close();
  }
})();
