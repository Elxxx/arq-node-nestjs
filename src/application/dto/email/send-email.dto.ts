import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * DTO de entrada para enviar un correo electrónico.
 *
 * @remarks
 * - Define la forma de los datos que el cliente debe enviar para el envío de emails.
 * - Usa `class-validator` para validar automáticamente la request.
 * - Usa `@ApiProperty` para generar documentación Swagger.
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
export class SendEmailDto {
  /**
   * Dirección de correo del destinatario.
   *
   * - Obligatorio.
   * - Debe tener un formato válido de email.
   * - Máximo 255 caracteres.
   *
   * @example "user@example.com"
   */
  @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico destinatario' })
  @IsEmail()
  @MaxLength(255)
  to!: string;

  /**
   * Asunto del correo.
   *
   * - Obligatorio.
   * - Texto libre que se mostrará en la cabecera del correo.
   * - Máximo 150 caracteres.
   *
   * @example "Bienvenido"
   */
  @ApiProperty({ example: 'Bienvenido', description: 'Asunto del correo electrónico' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  subject!: string;

  /**
   * Contenido del correo.
   *
   * - Obligatorio.
   * - Puede contener texto plano o HTML.
   * - Máximo 2000 caracteres.
   *
   * @example "Hola, gracias por registrarte!"
   */
  @ApiProperty({
    example: 'Hola, gracias por registrarte!',
    description: 'Cuerpo del correo (texto o HTML)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content!: string;
}
