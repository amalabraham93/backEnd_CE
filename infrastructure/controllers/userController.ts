import { Request, Response } from "express";
import CreateUserUseCase from "../../domain/usecases/users/createUser";
import UserRepository from "../../domain/repositories/userRepository";
import LoginUseCase from "../../domain/usecases/users/loginUser";
import VerifyEmailUseCase from "../../domain/usecases/users/VerifyEmailUseCase";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

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

      const findUser = await this.userRepository.getUserByEmail(email);

      if (findUser) {
        res.status(400).send({ error: "Email already registered" });
      } else {
        const user = await this.createUserUseCase.execute(
          name,
          email,
          password,
          role
        );

        if (user) {
          // Generate a JWT token
          const token = jwt.sign({ userId: user._id }, "your-secret-key");
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
      console.log(token,'ghjsdgbdagsdba');
      
      const user = await this.userRepository.findUserByVerificationToken(token);
     console.log(user);
     
       
      if (user) {
        await this.verifyEmailUseCase.execute(user._id);
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
        const token = jwt.sign({ userId: user._id }, "your-secret-key");
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

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("jwt-user"); // Replace with the actual name of your JWT cookie
    res.send({
      message: "Logout successful",
    });
  }

  async active (req: Request, res: Response): Promise<any>{
    try {
      const cookie = req.cookies['jwt-user']
      console.log(cookie);
      
    const claims = jwt.verify(cookie,"your-secret-key")
    if (!claims) {
      return res.json({unauthenticated:true})
    }else{
      return res.json({authenticated:true})
    }
    } catch (error) {
      return res.json({unauthenticated:true})
    }
   
  }

  // Implement other user-related route handlers such as getUserHandler, updateUserHandler, and deleteUserHandler here
}

export default UserController;
