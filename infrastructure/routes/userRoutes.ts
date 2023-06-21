import express from 'express';
import UserController from '../controllers/userController';
import CreateUserUseCase from '../../domain/usecases/createUser';
import LoginUseCase from '../../domain/usecases/loginUser';
import NodeMailerService from '../../infrastructure/services/NodeMailerService';
import MongooseUserRepository from '../database/repositories/mongooseUserRepository';
import UserRepository from 'domain/repositories/userRepository';
import VerifyEmailUseCase from '../../domain/usecases/VerifyEmailUseCase';

const userRouter = express.Router();

// Create an instance of the UserRepository
const userRepository = new MongooseUserRepository();
const loginUseCase = new LoginUseCase(userRepository);

const emailService =  new NodeMailerService()
// Create an instance of the CreateUserUseCase and pass the UserRepository instance
const createUserUseCase = new CreateUserUseCase(userRepository,emailService);
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository);

// Create an instance of the UserController and pass the CreateUserUseCase instance
const userController = new UserController(createUserUseCase,userRepository,verifyEmailUseCase,loginUseCase);

userRouter.post('/signup', userController.createUserHandler);

userRouter.post('/login', userController.loginHandler);
userRouter.post('/logout', userController.logout);


userRouter.get('/getusers', userController.getAllUsersHandler);
userRouter.get('/verify/:token', userController.verifyEmailHandler);


export default userRouter;
