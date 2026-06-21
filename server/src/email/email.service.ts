import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { authEvents } from '../app/lib/auth';

interface EventPayloads {
  'user.welcome': { email: string };
  'user.reset-password': { email: string; link: string };
  'user.verify-email': { email: string; link: string };
}

@Injectable()
export class EmailService implements OnModuleInit {
  constructor(
    private readonly mailerService: MailerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  onModuleInit() {
    authEvents.on('reset-password', (data: { email: string; link: string }) => {
      this.eventEmitter.emit('user.reset-password', data);
    });

    authEvents.on('verify-email', (data: { email: string; link: string }) => {
      this.eventEmitter.emit('user.verify-email', data);
    });
  }

  @OnEvent('user.welcome')
  async welcomeEmail(data: EventPayloads['user.welcome']) {
    const { email } = data;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Controller Chronicles: Welcome!',
      text: `Welcome to Controller Chronicles! Your account has been created.`,
    });
  }

  @OnEvent('user.reset-password')
  async forgotPasswordEmail(data: EventPayloads['user.reset-password']) {
    const { email, link } = data;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Controller Chronicles: Reset Password',
      template: './forgot-password',
      context: {
        link,
      },
    });
  }

  @OnEvent('user.verify-email')
  async verifyEmail(data: EventPayloads['user.verify-email']) {
    const { email, link } = data;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Controller Chronicles: Verify Email',
      text: `Please verify your email by clicking: ${link}`,
    });
  }
}
