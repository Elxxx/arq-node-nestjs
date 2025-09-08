import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EMAIL_REPOSITORY } from '../../../domain/repositories/email/email.repository';
import { SendGridEmailRepository } from './sendgrid-email.repository';

/**
 * SendGridModule
 *
 * @description
 * Configura e inyecta la implementación de `EmailRepository` usando SendGrid.
 */
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SENDGRID_API_KEY',
      useFactory: (config: ConfigService) => config.get<string>('sendgrid.apiKey'),
      inject: [ConfigService],
    },
    {
      provide: 'SENDGRID_SENDER',
      useFactory: (config: ConfigService) => config.get<string>('sendgrid.sender'),
      inject: [ConfigService],
    },
    {
      provide: EMAIL_REPOSITORY,
      useClass: SendGridEmailRepository,
    },
  ],
  exports: [EMAIL_REPOSITORY],
})
export class SendGridModule {}
