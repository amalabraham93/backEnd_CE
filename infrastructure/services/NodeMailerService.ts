import nodemailer from 'nodemailer';
import EmailService from 'domain/services/EmailService';

class NodeMailerService implements EmailService {
  async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
    // Configure and send the verification email using NodeMailer
    // Example code:
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "amalabraham93@gmail.com",
          pass: "7JpvynT9jSmLVGW2"
        }
    });

    const mailOptions = {
      from: 'amalabraham93@gmail.com',
      to: email,
      subject: 'Email Verification',
    //   text :`please click link:http://localhost:5000/users/verify/${verificationToken}`
      html: ` <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Hi.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Please click on the following link to verify your email</p>
        <a href="http://localhost:5000/users/verify/${verificationToken}"><h1 style="font-size: 15px; letter-spacing: 2px; text-align:center;">Link</h1><a>
   </div>`
    };

    await transporter.sendMail(mailOptions);
  }
}

export default NodeMailerService;
