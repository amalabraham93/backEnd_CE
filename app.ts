import express from 'express';
import  userRouter from './infrastructure/routes/userRoutes';
import  organizerRouter from './infrastructure/routes/organizerRoutes';
import adminRouter from './infrastructure/routes/adminRoutes';
import DatabaseConnection from './infrastructure/database/connection';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);
const databaseConnection = new DatabaseConnection();


const port = process.env.PORT|| 3000;



//connect database
databaseConnection.connect()
  .then(() => {
    console.log('Database connected successfully');

    // Set up routes
    app.use('/users', userRouter);

    // Organizer Routes
    app.use('/organizers', organizerRouter);

    // Admin Routes
    app.use('/admins', adminRouter);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the application if the database connection fails
  });