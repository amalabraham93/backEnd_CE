import { Types } from "mongoose";

import Conference from "../../../domain/entities/conference";
import ConferenceRepository from "../../../domain/repositories/conferenceRepository";
import { ObjectId } from "mongodb";

class GetAllConfUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(): Promise<Conference[] > {
     
    
    const getAllConf = this.conferenceRepository.getAll();
 
    
    
    return getAllConf;
  }
}
export default GetAllConfUseCase;
