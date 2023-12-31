import { ObjectId, Types } from "mongoose";
import ConferenceRepository from "../../repositories/conferenceRepository";

class RegisterConfUserUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(userId: ObjectId, confId: Types.ObjectId): Promise<void > {
    const registeredConfUser = this.conferenceRepository.registerConfUser(
      userId,
      confId
    );

    return registeredConfUser;
  }
}
export default RegisterConfUserUseCase;
