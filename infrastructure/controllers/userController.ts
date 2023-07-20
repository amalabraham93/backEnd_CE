import { Request, Response } from "express";
import CreateUserUseCase from "../../domain/usecases/users/createUser";
import UserRepository from "../../domain/repositories/userRepository";
import LoginUseCase from "../../domain/usecases/users/loginUser";
import VerifyEmailUseCase from "../../domain/usecases/users/VerifyEmailUseCase";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import MakePaymentUseCase from "../../domain/usecases/users/makePayment";

class UserController {
  private createUserUseCase: CreateUserUseCase;
  private loginUseCase: LoginUseCase;
  private verifyEmailUseCase: VerifyEmailUseCase;
  private userRepository: UserRepository;
  private makePayment: MakePaymentUseCase;

  constructor(
    createUserUseCase: CreateUserUseCase,
    userRepository: UserRepository,
    verifyEmailUseCase: VerifyEmailUseCase,
    loginUseCase: LoginUseCase,
    makePayment: MakePaymentUseCase
  ) {
    this.loginUseCase = loginUseCase;
    this.createUserUseCase = createUserUseCase;
    this.userRepository = userRepository;
    this.verifyEmailUseCase = verifyEmailUseCase;
    this.makePayment = makePayment;
    this.createUserHandler = this.createUserHandler.bind(this);
    this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.active = this.active.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.verifyEmailHandler = this.verifyEmailHandler.bind(this);
    this.makePaymentHandler = this.makePaymentHandler.bind(this);
  }

  async createUserHandler(req: Request, res: Response): Promise<void> {
    try {
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
          // res.cookie("jwt-user", token, {
          //   httpOnly: true,
          //   maxAge: 24 * 60 * 60 * 1000,
          //   sameSite: "none", // Enable this for cross-site requests
          //   secure: true, // Enable this for secure requests (HTTPS)
          // });
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
        await this.verifyEmailUseCase.execute(user._id);
        res.status(200).json({ verified: true });
        // Send response...
      } else {
        // Invalid verification token
        res.status(401).json({ error: "token is not valid" });
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

      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      if (!user.isEmailVerified) {
        res.status(401).json({ error: "Email not verified" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, "your-secret-key");
      // res.cookie("jwt-user", token, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      //   sameSite: "none", 
      //   secure: true, 
      // });
      res.status(200).json({ token });

      // Return the token in the response
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // res.clearCookie("jwt-user");
    res.json('loggeed out successfully')
    res.send({
      message: "Logout successful",
    });
  }

  async active(req: Request, res: Response): Promise<any> {
    try {
      const cookie = req.headers.authorization;
      console.log(cookie);
      
      const claims: jwt.JwtPayload = jwt.verify(
        cookie!,
        "your-secret-key"
      ) as jwt.JwtPayload;

      const userId = claims.userId;
      console.log(userId);
      
      const user = await this.userRepository.getUserById(userId);

      if (!claims) {
        return res.json({ unauthenticated: true });
      } else {
        return res.json({ authenticated: true, user });
      }
    } catch (error) {
      return res.json({ unauthenticated: true });
    }
  }

  async getUserByIdHandler(req: Request, res: Response): Promise<any> {
    try {
      const cookie = req.headers.authorization;
      const claims: jwt.JwtPayload = jwt.verify(
        cookie!,
        "your-secret-key"
      ) as jwt.JwtPayload;
      const userId = claims.userId.toString(); // Convert the userId to string

      if (!claims) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await this.userRepository.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async makePaymentHandler(req: Request, res: Response): Promise<any> {
    try {
      const cookie = req.headers.authorization;
      const claims: jwt.JwtPayload = jwt.verify(
        cookie!,
        "your-secret-key"
      ) as jwt.JwtPayload;
      const userId = claims.userId.toString();

      if (!claims) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { paymentData } = req.body;
      const { conferenceId, paperId, amount } = paymentData;
      const user = await this.userRepository.getUserById(userId);
      const paymentType = user!.role;

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.role === "author") {
        if (!paperId) {
          return res
            .status(400)
            .json({ error: "Paper ID is required for author payment" });
        }
        await this.makePayment.execute(
          userId,
          paymentType,
          undefined,
          paperId,
          amount
        );
      } else if (user.role === "attendee") {
        if (!conferenceId) {
          return res
            .status(400)
            .json({ error: "Conference ID is required for attendee payment" });
        }
        await this.makePayment.execute(
          userId,
          paymentType,
          conferenceId,
          undefined,
          amount
        );
      } else {
        return res.status(400).json({ error: "Invalid user role" });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("Error making payment:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;
