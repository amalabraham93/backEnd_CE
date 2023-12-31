
import { Types } from "mongoose";

import Conference from "../../entities/conference";
import ConferenceRepository from "../../repositories/conferenceRepository";

class CreateConferenceUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(name: string, startdate: Date,organizations:Types.ObjectId): Promise<Conference> {
    const newConference = new Conference( name, startdate,organizations);

    const createConference = this.conferenceRepository.create(newConference);

    return createConference;
  }
}
export default CreateConferenceUseCase;
