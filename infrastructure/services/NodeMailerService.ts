import nodemailer from 'nodemailer';
import EmailService from 'domain/services/EmailService';

class NodeMailerService implements EmailService {
  async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
    // Configure and send the verification email using NodeMailer
    // Example code:
    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
          user: "amalabraham93@yahoo.com",
          pass: "7F54E65025C420868188AE0F2C7FB9DC10D9"
        }
    });

    const mailOptions = {
      from: 'amalabraham93@yahoo.com',
      to: email,
      subject: 'Email Verification',
      text :`please click link:http://localhost:5000/users/verify/${verificationToken}`
  //     html: ` <div
  //       class="container"
  //       style="max-width: 90%; margin: auto; padding-top: 20px"
  //     >
  //       <h2>Hi.</h2>
  //       <h4>You are officially In ✔</h4>
  //       <p style="margin-bottom: 30px;">Please click on the following link to verify your email</p>
        
  //  </div>`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  }
      )
  }
}

export default NodeMailerService;
