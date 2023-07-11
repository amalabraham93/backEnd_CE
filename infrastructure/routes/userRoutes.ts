import express from 'express';
import UserController from '../controllers/userController';
import CreateUserUseCase from '../../domain/usecases/users/createUser';
import LoginUseCase from '../../domain/usecases/users/loginUser';
import NodeMailerService from '../../infrastructure/services/NodeMailerService';
import MongooseUserRepository from '../database/repositories/mongooseUserRepository';
import VerifyEmailUseCase from '../../domain/usecases/users/VerifyEmailUseCase';
import MakePaymentUseCase from '../../domain/usecases/users/makePayment';
const userRouter = express.Router();




// Create an instance of the UserRepository
const userRepository = new MongooseUserRepository();
const loginUseCase = new LoginUseCase(userRepository);

const emailService =  new NodeMailerService()
// Create an instance of the CreateUserUseCase and pass the UserRepository instance
const createUserUseCase = new CreateUserUseCase(userRepository,emailService);
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository);
const makePaymentUseCase = new MakePaymentUseCase(userRepository);
// Create an instance of the UserController and pass the CreateUserUseCase instance
const userController = new UserController(createUserUseCase,userRepository,verifyEmailUseCase,loginUseCase,makePaymentUseCase);

//Auth services api
userRouter.post('/signup', userController.createUserHandler);
userRouter.post('/login', userController.loginHandler);
userRouter.post('/logout', userController.logout);
userRouter.get('/active', userController.active);


userRouter.get('/get-user-by-id', userController.getUserByIdHandler);
userRouter.get('/getusers', userController.getAllUsersHandler);
userRouter.post('/verify/:token', userController.verifyEmailHandler);

//PAYMENT
userRouter.post('/payment', userController.makePaymentHandler);




export default userRouter;
