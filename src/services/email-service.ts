import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();
export const sendEmail = (to: string, subject: string, body: string): Promise<boolean> => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: body,
    }).then(() => true).catch((error) => {
      console.log("Error sending email", error);
      return false;
    });
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });