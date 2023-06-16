import { Request, Response } from "express";
import CreateUserUseCase from "../../domain/usecases/createUser";
import UserRepository from "domain/repositories/userRepository";
import LoginUseCase from "../../domain/usecases/loginUser";
import VerifyEmailUseCase from "../../domain/usecases/VerifyEmailUseCase";
import jwt from "jsonwebtoken";


class UserController {
  private createUserUseCase: CreateUserUseCase;
  private loginUseCase: LoginUseCase;
  private verifyEmailUseCase: VerifyEmailUseCase;
  private userRepository: UserRepository;

  constructor(
    createUserUseCase: CreateUserUseCase,
    userRepository: UserRepository,
    verifyEmailUseCase: VerifyEmailUseCase,
    loginUseCase: LoginUseCase
  ) {
    this.loginUseCase = loginUseCase;
    this.createUserUseCase = createUserUseCase;
    this.userRepository = userRepository;
    this.verifyEmailUseCase = verifyEmailUseCase;
    this.createUserHandler = this.createUserHandler.bind(this);
    this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  async createUserHandler(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const { name, email, password, role } = req.body;
      // Validate the input data here if needed




      const findUser = await this.userRepository.getUserByEmail(email)

      if (findUser) {
        res.status(400).send({error: "Email already registered"})
      } else {

       
        const user = await this.createUserUseCase.execute(name, email, password, role);
        
        if (user) {
          // Generate a JWT token
          const token = jwt.sign({ userId: user.id }, "your-secret-key");
          res.cookie("jwt-user", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          // Return the token in the response
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      }







      // res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async verifyEmailHandler(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;

      const user = await this.userRepository.findUserByVerificationToken(token);

      if (user) {
        await this.verifyEmailUseCase.execute(user.id);
        // Email verified successfully
        // Send response...
      } else {
        // Invalid verification token
        // Send response...
      }
    } catch (error) {
      // Handle error...
    }
  }

  async getAllUsersHandler(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async loginHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Perform login using the LoginUseCase
      const user = await this.loginUseCase.execute(email, password);

      if (user) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, "your-secret-key");
        res.cookie("jwt-user", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        // Return the token in the response
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Implement other user-related route handlers such as getUserHandler, updateUserHandler, and deleteUserHandler here
}

export default UserController;
