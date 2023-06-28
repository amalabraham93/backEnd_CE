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

class ConferenceController {
  private createConference: CreateConferenceUseCase;
  private getAllConfByOrg: GetAllConfByOrgUseCase;
  private getConfById: GetConfByIdUseCase;
  private getAllConf: GetAllConfUseCase;
  private resgisterConfUser: RegisterConfUserUseCase;
  private userRepository!: UserRepository;

  constructor(
    createConference: CreateConferenceUseCase,
    getAllConfByOrg: GetAllConfByOrgUseCase,
    getConfById: GetConfByIdUseCase,
    getAllConf: GetAllConfUseCase,
    resgisterConfUser: RegisterConfUserUseCase,
    userRepository: UserRepository,

  ) {
    this.createConference = createConference;
    this.getAllConfByOrg = getAllConfByOrg;
    this.getConfById = getConfById;
    this.getAllConf = getAllConf;
    this.resgisterConfUser = resgisterConfUser
    this.userRepository = userRepository
    this.CreateConferenceHandler = this.CreateConferenceHandler.bind(this);
    this.getConferencesByOrganizerIdHandler =
      this.getConferencesByOrganizerIdHandler.bind(this);
    this.getConfByIdHandler = this.getConfByIdHandler.bind(this);
    this.getAllConferenceHandler = this.getAllConferenceHandler.bind(this);
    this.registerConfUserHandler = this.registerConfUserHandler.bind(this)
  }

  async CreateConferenceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { name, startDate } = req.body;
      console.log(req.body);
      const cookie = req.cookies["jwt-organizer"];

      const claims = jwt.verify(cookie, "your-secret-key") as JwtPayload;
      const orgid = claims._id;

      const conference = await this.createConference.execute(
        name,
        startDate,
        orgid
      );
      res.status(201).json(conference);
    } catch (error) {
      console.log("Error creating", error);

      res.status(500).json(error);
    }
  }

  async getConferencesByOrganizerIdHandler(
    req: Request,
    res: Response
  ): Promise<void> {
    // const { organizerId } = req.params;

    const cookie = req.cookies["jwt-organizer"];
    const claims = jwt.verify(cookie, "your-secret-key") as JwtPayload;
    const orgid = claims._id;
    try {
      const conferences = await this.getAllConfByOrg.execute(orgid);
      res.status(200).json({ conferences });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving conferences by organizer ID" });
    }
  }

  async getConfByIdHandler(req: Request, res: Response): Promise<void> {
    const { confId } = req.params;

    console.log(confId);

    try {
      const conferences = await this.getConfById.execute(confId);
      console.log("sadasdasasdas", conferences);

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
      console.log(fullName, email);


      const { id } = req.params
      const findUser = await this.userRepository.getUserByEmail(email);

      const userId = findUser?._id

      const user = await this.resgisterConfUser.execute(userId, id)
      res.status(200).json({ user })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering user" });

    }
  }
}

export default ConferenceController;
