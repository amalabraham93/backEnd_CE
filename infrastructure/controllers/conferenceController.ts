import { Request, Response } from "express";
import CreateConferenceUseCase from "../../domain/usecases/conference/createConference";
import jwt, { JwtPayload } from "jsonwebtoken";
import GetAllConfByOrgUseCase from "../../domain/usecases/conference/getConfByOrg";
import GetConfByIdUseCase from "../../domain/usecases/conference/getConfById";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import GetAllConfUseCase from "../../domain/usecases/conference/getAllConferences";
import RegisterConfUserUseCase from "../../domain/usecases/conference/registerConfUser";
import UserRepository from "../../domain/repositories/userRepository";
import AddReviewerUseCase from "../../domain/usecases/conference/addReviewer";
import ReviewerLoginUseCase from "../../domain/usecases/conference/reviewerLogin";
import GetConfByUserUseCase from "../../domain/usecases/conference/getByUserId";
import UpdateConferenceUseCase from "../../domain/usecases/conference/updateConference";
import AddSessionUseCase from "../../domain/usecases/conference/addSession";

class ConferenceController {
  private createConference: CreateConferenceUseCase;
  private getAllConfByOrg: GetAllConfByOrgUseCase;
  private getConfById: GetConfByIdUseCase;
  private getAllConf: GetAllConfUseCase;
  private resgisterConfUser: RegisterConfUserUseCase;
  private userRepository!: UserRepository;
  private addReviewer: AddReviewerUseCase;
  private reviewerLogin: ReviewerLoginUseCase;
  private getConfByUserId: GetConfByUserUseCase;
  private updateConference: UpdateConferenceUseCase;
  private addSession: AddSessionUseCase;
  constructor(
    createConference: CreateConferenceUseCase,
    getAllConfByOrg: GetAllConfByOrgUseCase,
    getConfById: GetConfByIdUseCase,
    getAllConf: GetAllConfUseCase,
    resgisterConfUser: RegisterConfUserUseCase,
    userRepository: UserRepository,
    addReviewer: AddReviewerUseCase,
    reviewerLogin: ReviewerLoginUseCase,
    getConfByUserId: GetConfByUserUseCase,
    updateConference: UpdateConferenceUseCase,
    addSession: AddSessionUseCase
  ) {
    this.createConference = createConference;
    this.getAllConfByOrg = getAllConfByOrg;
    this.getConfById = getConfById;
    this.getAllConf = getAllConf;
    this.resgisterConfUser = resgisterConfUser;
    this.addReviewer = addReviewer;
    this.userRepository = userRepository;
    this.reviewerLogin = reviewerLogin;
    this.getConfByUserId = getConfByUserId;
    this.updateConference = updateConference;
    this.addSession = addSession;
    this.CreateConferenceHandler = this.CreateConferenceHandler.bind(this);
    this.getConferencesByOrganizerIdHandler =
      this.getConferencesByOrganizerIdHandler.bind(this);
    this.getConfByIdHandler = this.getConfByIdHandler.bind(this);
    this.getAllConferenceHandler = this.getAllConferenceHandler.bind(this);
    this.registerConfUserHandler = this.registerConfUserHandler.bind(this);
    this.addReviewerHandler = this.addReviewerHandler.bind(this);
    this.reviewerLoginHandler = this.reviewerLoginHandler.bind(this);
    this.getConferencesByUserIdHandler =
      this.getConferencesByUserIdHandler.bind(this);
    this.updateConferenceHandler = this.updateConferenceHandler.bind(this);
    this.addSessionHandler = this.addSessionHandler.bind(this);
  }

  async CreateConferenceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { name, startDate } = req.body;
      const token = req.headers.authorization;

      if (!token || !token.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const tokenWithoutBearer = token.slice(7);
      let claims: jwt.JwtPayload;

      try {
        claims = jwt.verify(tokenWithoutBearer, "your-secret-key") as jwt.JwtPayload;
      } catch (error) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const orgid = claims._id;

      const conference = await this.createConference.execute(
        name,
        startDate,
        orgid
      );

      res.status(201).json(conference);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }



  async getConferencesByOrganizerIdHandler(
    req: Request,
    res: Response
  ): Promise<void> {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tokenWithoutBearer = token.slice(7); // Remove the "Bearer " prefix
    let claims: jwt.JwtPayload;

    try {
      claims = jwt.verify(tokenWithoutBearer, "your-secret-key") as jwt.JwtPayload;
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const orgid = claims._id;

    try {
      const conferences = await this.getAllConfByOrg.execute(orgid);
      res.status(200).json({ conferences });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving conferences by organizer ID" });
    }
  }



  async getConferencesByUserIdHandler(
    req: Request,
    res: Response
  ): Promise<void> {
    const token = req.headers.authorization;
      console.log(token);
      
    if (!token || !token.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tokenWithoutBearer = token.slice(7); // Remove the "Bearer " prefix
    let claims: jwt.JwtPayload;

    try {
      claims = jwt.verify(tokenWithoutBearer, "your-secret-key") as jwt.JwtPayload;
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const userId = claims.userId;

    try {
      const conferences = await this.getConfByUserId.execute(userId);
      res.status(200).json({ conferences });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving conferences by organizer ID" });
    }
  }



  async getConfByIdHandler(req: Request, res: Response): Promise<void> {
    const paramId = req.params.confId;

    const confId = new Types.ObjectId(paramId);

    try {
      const conferences = await this.getConfById.execute(confId);

      res.status(200).json({ conferences });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error retrieving conferences by  ID" });
    }
  }

  async getAllConferenceHandler(req: Request, res: Response) {
    try {
      const conferences = await this.getAllConf.execute();

      res.status(200).json({ conferences });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error retrieving conferences by  ID" });
    }
  }

  async registerConfUserHandler(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email } = req.body;

      const id = new Types.ObjectId(req.params.id);
      const findUser = await this.userRepository.getUserByEmail(email);

      const userId = findUser?._id;

      const user = await this.resgisterConfUser.execute(userId!, id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  }

  async addReviewerHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const confId = new Types.ObjectId(req.body.confId);
      function generateRandomPassword(length: number = 8): string {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let password = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters.charAt(randomIndex);
        }

        return password;
      }

      const password = generateRandomPassword();

      const addReviewer = await this.addReviewer.execute(
        email,
        confId,
        password
      );

      res.status(200).json({ message: "Reviewer added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding reviewer" });
    }
  }

  async reviewerLoginHandler(req: Request, res: Response): Promise<void> {
    try {
      const { rEmail, rPassword } = req.body;
      const confId = new Types.ObjectId(req.body.confId);
      // Call the reviewer login use case or repository method
      await this.reviewerLogin.execute(rEmail, confId, rPassword);

      // Reviewer login successful
      // Perform necessary actions (e.g., generate authentication token, set cookies, etc.)
      res.status(200).json({ message: "Reviewer login successful" });
    } catch (error) {
      // Reviewer login failed
      // Perform necessary error handling
      res.status(500).json({ message: "Reviewer login failed" });
    }
  }

  async updateConferenceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { name, startDate, endDate } = req.body;
      const id = new Types.ObjectId(req.params.id);
      const conference = await this.updateConference.execute(
        id,
        name,
        startDate,
        endDate
      );
      res.status(201).json(conference);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async addSessionHandler(req: Request, res: Response): Promise<void> {
    try {
      // Extract data from request body
      const { sessionDate, session } = req.body;
      const confId = new Types.ObjectId(req.body.confId);
      // Add the session to the conference using the AddSessionUseCase
      await this.addSession.execute(confId, sessionDate, session);

      res.status(200).json({ message: "Session added successfully" });
    } catch (error) {
      console.error("Error adding session to conference:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ConferenceController;
