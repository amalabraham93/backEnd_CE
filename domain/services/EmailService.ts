interface EmailService {
    sendVerificationEmail(email: string, verificationToken: string): Promise<void>;
  }
  
  export default EmailService;
  