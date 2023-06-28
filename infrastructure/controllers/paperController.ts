import { Request, Response } from "express";
import CreatePaperUseCase from "../../domain/usecases/paper/createPaper";
import PaperRepository from "../../domain/repositories/paperRepository";
import UserRepository from "../../domain/repositories/userRepository";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import GetByIdUseCase from "../../domain/usecases/paper/getByConfId";

class PaperController {
  private createPaper: CreatePaperUseCase;
  private paperRepository: PaperRepository;
  private userRepository: UserRepository;
  private getPaperByConfId:GetByIdUseCase

  constructor(
    createPaper: CreatePaperUseCase,
    paperRepository: PaperRepository,
    userRepository: UserRepository,
    getPaperByConfId:GetByIdUseCase

  ) {
    this.createPaper = createPaper;
    this.paperRepository = paperRepository;
    this.userRepository = userRepository;
    this.getPaperByConfId = getPaperByConfId

    this.createPaperHandler = this.createPaperHandler.bind(this);
    this.getPaperByConfIdHandler = this.getPaperByConfIdHandler.bind(this);
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

      // Create the paper
      const newPaper = await this.createPaper.execute(
        name,
        submissionTitle,
        user._id,
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
}

export default PaperController;
