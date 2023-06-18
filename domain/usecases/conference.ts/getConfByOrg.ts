import { Types } from "mongoose";

import Conference from "../../../domain/entities/conference";
import ConferenceRepository from "../../../domain/repositories/conferenceRepository";

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
