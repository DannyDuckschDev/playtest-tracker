// backend/migrations/202411111545-create-boardgame.ts
import { DataTypes } from 'sequelize';
import { QueryInterface } from 'sequelize';

// Migration to create the board_games table
module.exports = {
  // This function is executed when the migration is applied (`npx sequelize-cli db:migrate`)
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('board_games', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  // This function reverts the migration (`npx sequelize-cli db:migrate:undo`)
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('board_games');
  },
};
