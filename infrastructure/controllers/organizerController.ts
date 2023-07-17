import { Request, Response } from "express";
import CreateOrganizerUseCase from "domain/usecases/organizer/createOrganizer";
import OrganizerRepository from "domain/repositories/organizerRepository";
import LoginOrganizerUseCase from "domain/usecases/organizer/loginOrganizer";
import jwt from "jsonwebtoken";

class OrganizerController {
  private createOrganizerUseCase: CreateOrganizerUseCase;
  private loginOrganizerUseCase: LoginOrganizerUseCase;

  constructor(
    createOrganizerUseCase: CreateOrganizerUseCase,
    loginOrganizerUseCase: LoginOrganizerUseCase
  ) {
    this.createOrganizerUseCase = createOrganizerUseCase;
    this.loginOrganizerUseCase = loginOrganizerUseCase;
    this.createOrganizerHandler = this.createOrganizerHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  async createOrganizerHandler(req: Request, res: Response): Promise<void> {
    try {
      const { organizername, email, password } = req.body;

      // Create the organizer using the CreateOrganizerUseCase
      const organizer = await this.createOrganizerUseCase.execute(
        organizername,
        email,
        password
      );

      // Check if the organizer was created successfully
      if (organizer) {
        // Generate a JWT token
        const token = jwt.sign({ _id: organizer.getId() }, "your-secret-key");

        // Set the JWT token as a cookie
        res.cookie("jwt-organizer", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        // Return the token in the response
        res.status(200).json({ token });
      } else {
        // Return an error if the organizer creation failed
        res.status(401).json({ error: "Failed to create organizer" });
      }
    } catch (error) {
      console.error("Error creating organizer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async loginHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Perform login using the LoginOrganizerUseCase
      const organizer = await this.loginOrganizerUseCase.execute(
        email,
        password
      );

      // Check if the login was successful
      if (organizer) {
        // Generate a JWT token
        const token = jwt.sign({ _id: organizer.id }, "your-secret-key");

        // Set the JWT token as a cookie
        res.cookie("jwt-organizer", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        // Return the token in the response
        res.status(200).json({ token });
      } else {
        // Return an error if the login failed
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("jwt-organizer");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default OrganizerController;
