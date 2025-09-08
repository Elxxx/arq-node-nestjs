/**
 * Puerto: Contrato para envío de correos electrónicos.
 *
 * @remarks
 * - Define las operaciones necesarias para un sistema de email.
 * - Implementaciones concretas (SendGrid, SES, SMTP, etc.) deben cumplir este contrato.
 */
export const EMAIL_REPOSITORY = Symbol('EMAIL_REPOSITORY');

export interface EmailRepository {
  /**
   * Envía un correo electrónico.
   *
   * @param to - Dirección de correo del destinatario.
   * @param subject - Asunto del correo.
   * @param content - Contenido en texto plano o HTML.
   */
  sendEmail(to: string, subject: string, content: string): Promise<void>;
}
