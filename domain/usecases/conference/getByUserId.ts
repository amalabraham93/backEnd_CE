import { ObjectId, Types } from "mongoose";

import Conference from "../../entities/conference";
import ConferenceRepository from "../../repositories/conferenceRepository";

class GetConfByUserUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(userId:ObjectId): Promise<Conference[]> {

    const getAllConfByOrg = this.conferenceRepository.getByUserId(userId);

    return getAllConfByOrg;
  }
}
export default GetConfByUserUseCase;
