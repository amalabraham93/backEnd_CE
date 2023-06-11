import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class DatabaseConnection {
  private uri: string;

  constructor() {
    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;

    if (!dbHost || !dbName) {
      throw new Error('DB_HOST or DB_NAME is not defined in the environment variables.');
    }

    this.uri = `${dbHost}/${dbName}`;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri,
       
        );
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }
}

export default DatabaseConnection;