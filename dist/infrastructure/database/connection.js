"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConnection {
    uri;
    constructor() {
        const dbHost = process.env.DB_HOST;
        const dbName = process.env.DB_NAME;
        if (!dbHost || !dbName) {
            throw new Error('DB_HOST or DB_NAME is not defined in the environment variables.');
        }
        this.uri = `${dbHost}/${dbName}`;
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.uri);
            console.log('Connected to the database');
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }
}
exports.default = DatabaseConnection;
