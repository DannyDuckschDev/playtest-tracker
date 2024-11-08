// backend/models/User.ts
import { DataTypes, Model } from 'sequelize'; // Ensures types and values for Sequelize
import { sequelize } from '../config/db'; // Ensures correct sequelize instance import
import bcrypt from 'bcryptjs';

// Interface defining the properties of the User model
interface UserAttributes {
    id?: number; // Primary key will be auto-generated
    username: string;
    email: string;
    password: string;
    createdAt?: Date; // Auto-generated timestamp
    updatedAt?: Date; // Auto-generated timestamp
}

// Use Partial for optional properties when creating a User instance
type UserCreationAttributes = Partial<UserAttributes>;

// Define the User model class extending Sequelize's Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Instance method to compare passwords
    public async comparePassword(enteredPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, this.password);
    }
}

// Initialize the User model and define its fields
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
    }
);

// Hash the password before saving the User instance
User.beforeCreate(async (user: User) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

export default User;
