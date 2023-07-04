import Conference from "domain/entities/conference";
import ConferenceRepository from "domain/repositories/conferenceRepository";
import EmailService from "domain/services/EmailService";
import dotenv from 'dotenv';
import { Types } from "mongoose";
class AddReviewerUseCase{
    private conferenceRepository: ConferenceRepository;
    private emailService: EmailService;
    constructor(conferenceRepository: ConferenceRepository,emailService: EmailService) {
      this.conferenceRepository = conferenceRepository;
      this.emailService = emailService;
    }
   async execute(email:string,confId:Types.ObjectId,password:string):Promise<void>{

    console.log(email,confId,password);
    
   const addReviewer = this.conferenceRepository.addReviewer(email,confId,password)
    


   const conferenceLink = `${process.env.ORIGIN}/organization/review-login/${confId}`;
    await this.emailService.sendReviewerEmail(email, password, conferenceLink);
   }


}

export default AddReviewerUseCase