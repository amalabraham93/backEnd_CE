import Conference from "../../../domain/entities/conference";
import ConferenceRepository from "../../../domain/repositories/conferenceRepository";

import dotenv from 'dotenv';
import { Types } from "mongoose";
class ReviewerLoginUseCase{
    private conferenceRepository: ConferenceRepository;
    
    constructor(conferenceRepository: ConferenceRepository) {
      this.conferenceRepository = conferenceRepository;
      
    }
   async execute(email:string,confId:Types.ObjectId,password:string):Promise<void>{

   const addReviewer = this.conferenceRepository.reviewerLogin(email,confId,password)
    
   }


}

export default ReviewerLoginUseCase