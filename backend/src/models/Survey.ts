// backend/models/Survey.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// Interface for the properties of the survey model
interface SurveyAttributes {
    id?: number; // Primary key is generated automatically
    title: string; // Title of the survey 
    description?: string; // Optional description field 
    questions: object; // Questions saved as JSON object 
    createdBy: number; // ID of the creator 
    status?: string; // Status, “active” by default 
    createdAt?: Date; // Automatically added timestamp field 
    updatedAt?: Date; // Automatically added timestamp field
}

// Interface for optional input values when creating a new survey  
interface SurveyCreationAttributes extends Optional<SurveyAttributes, 'id' | 'description' | 'status'> {}

// Defines the Survey model as a class that inherits from Sequelize Model 
class Survey extends Model<SurveyAttributes, SurveyCreationAttributes> implements SurveyAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public questions!: object;
    public createdBy!: number;
    public status!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initializes the survey model with its attributes and types
Survey.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    questions: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
}, {
    sequelize,
    modelName: 'Survey',
    timestamps: true,
});

export default Survey;
