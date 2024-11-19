// backend/models/BoardGame.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db'; // import database connection


// Interface defining the attributes of a BoardGame
interface BoardGameAttributes {
  id: number;
  name: string;
  category: string;
  releaseDate: Date;
  publisher: string;
}

// Optional fields for BoardGame creation
interface BoardGameCreationAttributes extends Optional<BoardGameAttributes, 'id'> {}

// Defining the BoardGame model class
class BoardGame extends Model<BoardGameAttributes, BoardGameCreationAttributes> 
  implements BoardGameAttributes {
  public id!: number;
  public name!: string;
  public category!: string;
  public releaseDate!: Date;
  public publisher!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initializing the BoardGame model with Sequelize
BoardGame.init(
  {
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
  },
  {
    sequelize, // pass database connection instance
    tableName: 'board_games', // table name in database
  }
);

export default BoardGame;
