import PresentationRepository from '../../repositories/presentationRepository';
import Presentation from '../../entities/presentation';
import { ObjectId, Types } from 'mongoose';
import EmailService from '../../../domain/services/EmailService';
import ConferenceRepository from 'domain/repositories/conferenceRepository';
import User from 'domain/entities/user';
import UserRepository from 'domain/repositories/userRepository';

class CreatePresentationUseCase {
  private presentationRepository: PresentationRepository;
  private emailService: EmailService;
  private conferenceRepository: ConferenceRepository;
  private userRepository!: UserRepository;

  constructor(presentationRepository: PresentationRepository,emailService: EmailService,conferenceRepository: ConferenceRepository) {
    this.presentationRepository = presentationRepository;
    this.emailService = emailService;
    this.conferenceRepository = conferenceRepository
  }

  async execute(
    stream_key: string,
  
    conference: Types.ObjectId,
   
  ): Promise<Presentation> {
    // Create a new presentation entity
    const newPresentation = new Presentation(stream_key,conference);

    // Save the presentation to the database
    const createdPresentation = await this.presentationRepository.createPresentation(
      newPresentation
    );

     const conferences =  await this.conferenceRepository.getById(conference);
     
     
    const user = conferences!.users
    

    if (!conference) {
      throw new Error('Conference not found');
    }
    const userEmails: string[] = conferences!.users.map(user => user.email);
    const link = `http://localhost:4200/conference/${conference}/presentation`

    await this.emailService.conferenceStartNotification(userEmails, link);
    
    return createdPresentation;
  }
}

export default CreatePresentationUseCase;