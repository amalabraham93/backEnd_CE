interface EmailService {
    sendVerificationEmail(email: string, verificationToken: string): Promise<void>;
    sendReviewerEmail(email: string, password: string, conferencelink: string): Promise<void>;

  }
  
  export default EmailService;
  