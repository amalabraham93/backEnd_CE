import { Types } from "mongoose";

import Conference from "../../entities/conference";
import ConferenceRepository from "../../repositories/conferenceRepository";
import { ObjectId } from "mongoose";

class UpdateConferenceUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(id: Types.ObjectId, name:string,startDate:Date,endDate:Date): Promise<Conference> {
    const updateConf = await this.conferenceRepository.update(id, name,startDate,endDate);
    return updateConf;
  }
}

export default UpdateConferenceUseCase;
