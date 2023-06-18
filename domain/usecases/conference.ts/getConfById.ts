import { Types } from "mongoose";

import Conference from "../../../domain/entities/conference";
import ConferenceRepository from "../../../domain/repositories/conferenceRepository";
import { ObjectId } from "mongodb";

class GetConfByIdUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(_id:Types.ObjectId): Promise<Conference | null > {
     
    
    const getConfById = this.conferenceRepository.getById(_id);
    
    return getConfById;
  }
}
export default GetConfByIdUseCase;
