import { Request, Response } from 'express';
import CreateUserUseCase from '../../domain/usecases/createUser';
import UserRepository from 'domain/repositories/userRepository';
import LoginUseCase from '../../domain/usecases/loginUser';
import jwt from 'jsonwebtoken';





class UserController {
  private createUserUseCase: CreateUserUseCase;
  private loginUseCase: LoginUseCase;
  private userRepository: UserRepository;
 


  constructor(createUserUseCase: CreateUserUseCase,
     userRepository: UserRepository,
     loginUseCase: LoginUseCase,) {
    this.loginUseCase = loginUseCase;
    this.createUserUseCase = createUserUseCase;
    this.userRepository = userRepository;
    this.createUserHandler = this.createUserHandler.bind(this);
    this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  async createUserHandler(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body)
      
      const { name, email, password } = req.body;
        console.log(name) 
      // Validate the input data here if needed

      const user = await this.createUserUseCase.execute(name, email, password);

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllUsersHandler(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  async loginHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate the input data here if needed

      // Perform login using the LoginUseCase
      const user = await this.loginUseCase.execute(email, password);

      if (user) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, 'your-secret-key');

        // Return the token in the response
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Implement other user-related route handlers such as getUserHandler, updateUserHandler, and deleteUserHandler here
}

export default UserController;
