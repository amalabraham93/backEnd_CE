import { Request, Response } from "express";
import CreatePaperUseCase from "../../domain/usecases/paper/createPaper";
import PaperRepository from "../../domain/repositories/paperRepository";
import UserRepository from "../../domain/repositories/userRepository";
import { Types,ObjectId } from "mongoose";
import GetByIdUseCase from "../../domain/usecases/paper/getByConfId";
import jwt from "jsonwebtoken";
import GetByUserIdUseCase from "'../../domain/usecases/paper/getByUserId";

class PaperController {
  private createPaper: CreatePaperUseCase;
  private paperRepository: PaperRepository;
  private userRepository: UserRepository;
  private getPaperByConfId:GetByIdUseCase
  private getPaperByUserId:GetByUserIdUseCase

  constructor(
    createPaper: CreatePaperUseCase,
    paperRepository: PaperRepository,
    userRepository: UserRepository,
    getPaperByConfId:GetByIdUseCase,
    getPaperByUserId:GetByUserIdUseCase

  ) {
    this.createPaper = createPaper;
    this.paperRepository = paperRepository;
    this.userRepository = userRepository;
    this.getPaperByConfId = getPaperByConfId
     this.getPaperByUserId = getPaperByUserId
    this.createPaperHandler = this.createPaperHandler.bind(this);
    this.getPaperByConfIdHandler = this.getPaperByConfIdHandler.bind(this);
    this.getPaperByUserIdHandler = this.getPaperByUserIdHandler.bind(this);
  }

  async createPaperHandler(req: Request, res: Response): Promise<void> {
    try {
      const { name,submissionTitle, abstract, author, affiliation, userId ,date} = req.body;
      console.log(req.body);
      
     


      const confId = new Types.ObjectId(req.params.confId);
      // Retrieve the user by email or any other identifier
      const user = await this.userRepository.getUserByEmail(userId);
      console.log(user);
      
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const users = [user._id]
      // Create the paper
      const newPaper = await this.createPaper.execute(
        name,
        submissionTitle,
        users,
        userId,
        affiliation,
        confId,
        date,
        abstract
      );

      res.status(201).json(newPaper);
    } catch (error) {
      console.log("Error creating paper", error);
      res.status(500).json(error);
    }
  }


  async getPaperByConfIdHandler(req: Request, res: Response): Promise<void> {
    try {
      const confId =  new Types.ObjectId(req.params.confId);
      const paper = await this.getPaperByConfId.execute(confId)
      console.log(paper);
      
      res.status(200).json({paper})
    } catch (error) {
      res.status(500).json({ message: "Error retrieving conferences by  ID" })
    }
  }
  async getPaperByUserIdHandler(req: Request, res: Response): Promise<void> {
    try {
      const cookie = req.cookies["jwt-user"];
      const claims: jwt.JwtPayload = jwt.verify(
        cookie,
        "your-secret-key"
      ) as jwt.JwtPayload;
      
      const userId = (claims.userId);
      const user = await this.userRepository.getUserById(userId)
      
      const paper = await this.getPaperByUserId.execute(user!.email)
      console.log(paper);
      
      res.status(200).json({paper})
    } catch (error) {
      res.status(500).json({ message: "Error retrieving conferences by  ID" })
    }
  }


}

export default PaperController;
