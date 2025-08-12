import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
  async sendVerificationMail(to: string, token: string) {
    const verificationLink = `http://localhost:3000/verify/${token}`;
    await this.transporter.sendMail({
      from: `"MyApp" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Email Verification',
      html: `
        <h2>Salom!</h2>
        <p>Hisobingizni tasdiqlash uchun quyidagi linkga bosing:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    });
  }
}
