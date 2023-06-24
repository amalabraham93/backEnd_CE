import nodemailer from 'nodemailer';
import EmailService from 'domain/services/EmailService';

class NodeMailerService implements EmailService {
  async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
    // Configure and send the verification email using NodeMailer
    // Example code:
    // const transporter = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "9623e3ae453490",
    //       pass: "06e7218ba3f1bf"
    //     }
    // });

    
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9623e3ae453490",
          pass: "06e7218ba3f1bf"
        }
    });

    const mailOptions = {
      from: 'amalabraham93@yahoo.com',
      to: email,
      subject: 'Email Verification',
      // text :`please click link:http://localhost:5000/users/verify/${verificationToken}`
      html: ` <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Hi.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Please click on the following link to verify your email</p>
        <a href = http://localhost:5000/users/verify/${verificationToken} >LINK</a>
   </div>`
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
