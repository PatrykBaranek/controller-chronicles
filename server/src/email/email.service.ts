import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';

interface EventPayloads {
  'user.welcome': { email: string },
  'user.reset-password': { email: string, link: string },
  'user.verify-email': { email: string, otp: string },
}

@Injectable()
export class EmailService {

  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.reset-password')
  async forgotPasswordEmail(data: EventPayloads['user.reset-password']) {
    const { email, link } = data;

    const subject = `Conroller Chronicles: Reset Password`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './forgot-password',
      context: {
        link: link
      }
    });
  }

  @OnEvent('user.verify-email')
  async verifyEmail(data: EventPayloads['user.verify-email']) {
    const { email, otp } = data;

    const subject = `Company: OTP To Verify Email`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-email',
      context: {
        otp,
        name,
      },
    });
  }
}
