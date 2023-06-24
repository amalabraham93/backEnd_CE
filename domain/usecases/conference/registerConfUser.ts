import ConferenceRepository from "../../repositories/conferenceRepository";

class RegisterConfUserUseCase {
  private conferenceRepository: ConferenceRepository;
  constructor(conferenceRepository: ConferenceRepository) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(userId: string, confId: string): Promise<void |null> {
    const registeredConfUser = this.conferenceRepository.registerConfUser(
      userId,
      confId
    );

    return registeredConfUser;
  }
}
export default RegisterConfUserUseCase;
