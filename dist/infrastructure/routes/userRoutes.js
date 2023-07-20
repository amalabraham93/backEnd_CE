"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const createUser_1 = __importDefault(require("../../domain/usecases/users/createUser"));
const loginUser_1 = __importDefault(require("../../domain/usecases/users/loginUser"));
const NodeMailerService_1 = __importDefault(require("../../infrastructure/services/NodeMailerService"));
const mongooseUserRepository_1 = __importDefault(require("../database/repositories/mongooseUserRepository"));
const VerifyEmailUseCase_1 = __importDefault(require("../../domain/usecases/users/VerifyEmailUseCase"));
const makePayment_1 = __importDefault(require("../../domain/usecases/users/makePayment"));
const userRouter = express_1.default.Router();
// Create an instance of the UserRepository
const userRepository = new mongooseUserRepository_1.default();
const loginUseCase = new loginUser_1.default(userRepository);
const emailService = new NodeMailerService_1.default();
// Create an instance of the CreateUserUseCase and pass the UserRepository instance
const createUserUseCase = new createUser_1.default(userRepository, emailService);
const verifyEmailUseCase = new VerifyEmailUseCase_1.default(userRepository);
const makePaymentUseCase = new makePayment_1.default(userRepository);
// Create an instance of the UserController and pass the CreateUserUseCase instance
const userController = new userController_1.default(createUserUseCase, userRepository, verifyEmailUseCase, loginUseCase, makePaymentUseCase);
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
exports.default = userRouter;
