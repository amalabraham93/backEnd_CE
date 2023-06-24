import { Request, Response } from 'express';
import CreateOrganizer from 'domain/usecases/organizer/createOrganizer';
import OrganizerRepository from 'domain/repositories/organizerRepository';
import LoginOrganizerUseCase from 'domain/usecases/organizer/loginOrganizer';
import jwt, { JwtPayload } from "jsonwebtoken";


class organizerController {
  private createOrganizer: CreateOrganizer;
  private loginOrganizerUseCase: LoginOrganizerUseCase;
  // private organizerRepository: OrganizerRepository;

  constructor(createOrganizer: CreateOrganizer,
    loginOrganizerUseCase: LoginOrganizerUseCase  ) {
      this.loginOrganizerUseCase = loginOrganizerUseCase
    this.createOrganizer = createOrganizer;
    this.createOrganizerHandler = this.createOrganizerHandler.bind(this)
    this.loginHandler = this.loginHandler.bind(this);
  }

  async createOrganizerHandler(req: Request, res: Response): Promise<void> {
    try {
      const { organizername, email, password } = req.body;
      // Validate the input data here if needed

      const organizer = await this.createOrganizer.execute( organizername, email, password );
       
       
      if (organizer) {
        // Generate a JWT token
        const token = jwt.sign({ _id: organizer.id }, "your-secret-key") 
        res.cookie("jwt-organizer", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        // Return the token in the response
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }

     
    } catch (error) {
      console.error('Error creating organizer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async loginHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Perform login using the LoginUseCase
      const organizer = await this.loginOrganizerUseCase.execute(email, password);
     
      if (organizer) {
        // Generate a JWT token
        const token = jwt.sign({  _id: organizer.id }, "your-secret-key");
        res.cookie("jwt-organizer", token, {
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

  async logout(req: Request, res: Response):  Promise<void> {
    res.clearCookie("jwt-organizer"); // Replace with the actual name of your JWT cookie
    res.send({
      message: "Logout successful",
    });
  }
}

export default organizerController;
