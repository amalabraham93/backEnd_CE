import { Types } from "mongoose";

import Conference from "../../entities/conference";
import ConferenceRepository from "../../repositories/conferenceRepository";

class GetAllConfByOrgUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(organizations:Types.ObjectId): Promise<Conference[]> {

    const getAllConfByOrg = this.conferenceRepository.getByOrganizerId(organizations);

    return getAllConfByOrg;
  }
}
export default GetAllConfByOrgUseCase;
