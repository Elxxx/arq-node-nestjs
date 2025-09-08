import { Injectable, Inject } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { EmailRepository } from '../../../domain/repositories/email/email.repository';

/**
 * Adaptador de infraestructura para envío de correos con SendGrid.
 *
 * @description
 * Implementa el puerto `EmailRepository` utilizando la librería oficial
 * `@sendgrid/mail`.
 */
@Injectable()
export class SendGridEmailRepository implements EmailRepository {
  constructor(
    @Inject('SENDGRID_API_KEY')
    private readonly apiKey: string,

    @Inject('SENDGRID_SENDER')
    private readonly sender: string,
  ) {
    sgMail.setApiKey(apiKey);
  }

  /**
   * Envía un correo electrónico con SendGrid.
   *
   * @param to - Dirección de correo destino.
   * @param subject - Asunto del correo.
   * @param content - Contenido en texto plano.
   */
  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    await sgMail.send({
      to,
      from: this.sender,
      subject,
      text: content,
      html: `<p>${content}</p>`,
    });
  }
}
