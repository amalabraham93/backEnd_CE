import { Types } from "mongoose";
import ConferenceRepository from "../../../domain/repositories/conferenceRepository";
import Conference,{Session} from "../../../domain/entities/conference";


interface AddSessionUseCaseProps {
  conferenceRepository: ConferenceRepository;
}

class AddSessionUseCase {
  private conferenceRepository: ConferenceRepository;

  constructor({ conferenceRepository }: AddSessionUseCaseProps) {
    this.conferenceRepository = conferenceRepository;
  }

  async execute(
    confId: Types.ObjectId,
    sessionDate: Date,
    session: Session
  ): Promise<void> {
    const conference = await this.conferenceRepository.getById(confId);
    
    if (!conference) {
      throw new Error("Conference not found");
    }
     await this.conferenceRepository.addSessionToSchedule(confId,sessionDate, session)
    // conference.addSessionToSchedule(sessionDate, session);
    // await this.conferenceRepository.update(
    //   confId,
    //   conference.getName(),
    //   conference.getStartDate(),
    //   conference.getEndDate()
    // );
  }
}

export default AddSessionUseCase;
