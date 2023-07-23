"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodeMailerService {
    async sendVerificationEmail(email, verificationToken) {
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
        const transporter = nodemailer_1.default.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            service: 'Gmail',
            port: 587,
            secure: true,
            auth: {
                user: "amalabraham93@gmail.com",
                pass: "qqtmolpqonvxlxnn"
            },
        });
        const mailOptions = {
            from: 'amalabraham93@gmail.com',
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
          <a  >CODE:${verificationToken}</a>
    </div>`
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    async sendReviewerEmail(email, password, conferencelink) {
        const transporter = nodemailer_1.default.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            service: 'Gmail',
            port: 587,
            secure: true,
            auth: {
                user: "amalabraham93@gmail.com",
                pass: "qqtmolpqonvxlxnn"
            },
        });
        const mailOptions = {
            from: "amalabraham93@gmail.com",
            to: email,
            subject: "Conference Reviewer Invitation",
            html: `
          <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
            <h2>Conference Reviewer Invitation</h2>
            <p>You have been invited to be a reviewer for a conference. Please find the details below:</p>
            
            <p>Auto-generated Password: ${password}</p>
            <p>Click the following link to access the conference papers: <a href="${conferencelink}">Conference Papers</a></p>
          </div>
        `,
        };
        await transporter.sendMail(mailOptions);
    }
    async conferenceStartNotification(emails, conferenceLink) {
        const transporter = nodemailer_1.default.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            service: 'Gmail',
            port: 587,
            secure: true,
            auth: {
                user: "amalabraham93@gmail.com",
                pass: "qqtmolpqonvxlxnn"
            },
        });
        const mailOptions = {
            from: 'amalabraham93@gmail.com',
            to: emails.join(','),
            subject: 'Conference Start Notification',
            html: `
          <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
            <h2>Conference Start Notification</h2>
            <p>The conference has started. Here are the details:</p>
            <p>Click the following link to access the conference: <a href="${conferenceLink}">Conference Link</a></p>
          </div>
        `,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
exports.default = NodeMailerService;
