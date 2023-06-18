import { Request, Response } from "express";
import CreateConferenceUseCase from "../../domain/usecases/conference.ts/createConference";
import jwt, { JwtPayload } from "jsonwebtoken";
import GetAllConfByOrgUseCase from "../../domain/usecases/conference.ts/getConfByOrg";
import GetConfByIdUseCase from "../../domain/usecases/conference.ts/getConfById";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

class ConferenceController {
  private createConference: CreateConferenceUseCase;
  private getAllConfByOrg: GetAllConfByOrgUseCase;
  private getConfById:GetConfByIdUseCase 
  constructor(createConference: CreateConferenceUseCase,getAllConfByOrg:GetAllConfByOrgUseCase,getConfById:GetConfByIdUseCase ) {
    this.createConference = createConference;
    this.getAllConfByOrg =  getAllConfByOrg;
    this.getConfById = getConfById
    this.CreateConferenceHandler = this.CreateConferenceHandler.bind(this);
    this.getConferencesByOrganizerIdHandler = this.getConferencesByOrganizerIdHandler.bind(this)
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

   async  getConferencesByOrganizerIdHandler (req: Request, res: Response) :Promise<void>{
    // const { organizerId } = req.params;

    const cookie = req.cookies["jwt-organizer"];
    const claims = jwt.verify(cookie, "your-secret-key") as JwtPayload;
      const orgid = claims._id;   
    try {
      const conferences = await this.getAllConfByOrg.execute(orgid);
      res.status(200).json({ conferences });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving conferences by organizer ID' });
    }
  };
  
  async  getConfByIdHandler (req: Request, res: Response) :Promise<void>{
    const { confId } = req.params;
   
     
  //  const cookie = req.cookies["jwt-organizer"];
  //  const claims = jwt.verify(cookie, "your-secret-key") as JwtPayload;
  //    const orgid = claims._id;   
  const test =  new Types.ObjectId(confId)
  console.log(test);
  
   try {
     const conferences = await this.getConfById.execute(test);
     console.log('sadasdasasdas',conferences);
     
     res.status(200).json({ conferences });
   } catch (error) {
     res.status(500).json({ message: 'Error retrieving conferences by organizer ID' });
   }
 };

}

export default ConferenceController;
