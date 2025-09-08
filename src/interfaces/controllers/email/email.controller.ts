import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendEmailUseCase } from '../../../application/use-cases/email/send-email.use-case';
import { SendEmailDto } from '../../../application/dto/email/send-email.dto';

/**
 * Controlador REST para gestión de correos.
 *
 * Exposición de endpoint:
 * - POST `/emails/send` → Enviar correo electrónico.
 */
@ApiTags('Emails')
@Controller({ path: 'emails', version: '1' })
export class EmailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  /**
   * Enviar un correo electrónico.
   *
   * @param dto - Datos del correo (validados y documentados con DTO).
   * @returns Confirmación de envío.
   *
   * @example
   * POST /emails/send
   * ```json
   * {
   *   "to": "user@example.com",
   *   "subject": "Bienvenido",
   *   "content": "Hola, gracias por registrarte!"
   * }
   * ```
   */
  @Post('send')
  @ApiOperation({ summary: 'Enviar un correo electrónico' })
  @ApiResponse({ status: 201, description: 'Correo enviado correctamente' })
  async send(@Body() dto: SendEmailDto): Promise<{ message: string }> {
    await this.sendEmailUseCase.execute(dto.to, dto.subject, dto.content);
    return { message: 'Correo enviado correctamente' };
  }
}
