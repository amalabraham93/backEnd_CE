import Conference from "domain/entities/conference";
import ConferenceRepository from "domain/repositories/conferenceRepository";
import EmailService from "domain/services/EmailService";

class AddReviewerUseCase{
    private conferenceRepository: ConferenceRepository;
    private emailService: EmailService;
    constructor(conferenceRepository: ConferenceRepository,emailService: EmailService) {
      this.conferenceRepository = conferenceRepository;
      this.emailService = emailService;
    }
   async execute(email:string,confId:string,password:string):Promise<void>{
   const addReviewer = this.conferenceRepository.addReviewer(email,confId,password)
    


   const conferenceLink = `http://example.com/conference/${confId}`;
    await this.emailService.sendReviewerEmail(email, password, conferenceLink);
   }


}

export default AddReviewerUseCase