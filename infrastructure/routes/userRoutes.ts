import express from 'express';
import UserController from '../controllers/userController';
import CreateUserUseCase from '../../domain/usecases/createUser';
import LoginUseCase from '../../domain/usecases/loginUser';

import MongooseUserRepository from '../database/repositories/mongooseUserRepository';
import UserRepository from 'domain/repositories/userRepository';

const userRouter = express.Router();

// Create an instance of the UserRepository
const userRepository = new MongooseUserRepository();

const loginUseCase = new LoginUseCase(userRepository);

// Create an instance of the CreateUserUseCase and pass the UserRepository instance
const createUserUseCase = new CreateUserUseCase(userRepository);

// Create an instance of the UserController and pass the CreateUserUseCase instance
const userController = new UserController(createUserUseCase,userRepository,loginUseCase);

// POST /users
userRouter.post('/new', userController.createUserHandler);

userRouter.post('/login', userController.loginHandler);

// GET /users/:id
// userRouter.get('/:id', userController.getUserHandler);

userRouter.get('/getusers', userController.getAllUsersHandler);
// PUT /users/:id
// userRouter.put('/:id', userController.updateUserHandler);

// DELETE /users/:id
// userRouter.delete('/:id', userController.deleteUserHandler);

export default userRouter;
