import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { EmailService } from './email.service';

import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          }
        },
        defaults: {
          from: `Controller Chronicles <${configService.get<string>('MAIL_HOST')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      })
    })
  ],
  providers: [EmailService],
})
export class EmailModule {}
