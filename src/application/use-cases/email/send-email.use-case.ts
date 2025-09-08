import { Injectable, Inject } from '@nestjs/common';
import { EMAIL_REPOSITORY, EmailRepository } from '../../../domain/repositories/email/email.repository';
import { EmailDomainService } from '../../../domain/services/email/email.domain-service';

/**
 * Caso de uso: Enviar correo electrónico.
 *
 * @description
 * Orquesta la validación de negocio con `EmailDomainService`
 * y delega el envío técnico al puerto `EmailRepository`.
 */
@Injectable()
export class SendEmailUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepository: EmailRepository,
    private readonly domainService: EmailDomainService,
  ) {}

  /**
   * Ejecuta el caso de uso de envío de correo.
   *
   * @param to - Dirección de correo destino.
   * @param subject - Asunto del correo.
   * @param content - Contenido del correo.
   *
   * @throws {Error} Si el correo no es válido o está bloqueado.
   */
  async execute(to: string, subject: string, content: string): Promise<void> {
    this.domainService.ensureValidEmailFormat(to);
    this.domainService.ensureDomainNotBlocked(to, ['spam.com', 'fake.com']);

    await this.emailRepository.sendEmail(to, subject, content);
  }
}
