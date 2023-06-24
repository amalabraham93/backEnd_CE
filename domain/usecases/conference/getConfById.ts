import { Types } from "mongoose";

import Conference from "../../entities/conference";
import ConferenceRepository from "../../repositories/conferenceRepository";
import { ObjectId } from "mongodb";

class GetConfByIdUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(id:string): Promise<Conference | null > {
     
    
    const getConfById = this.conferenceRepository.getById(id);
    
    return getConfById;
  }
}
export default GetConfByIdUseCase;
