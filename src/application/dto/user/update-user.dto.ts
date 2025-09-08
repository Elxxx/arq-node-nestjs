import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO de entrada para actualizar un usuario existente.
 *
 * @remarks
 * - Define los campos opcionales que el cliente puede enviar.
 * - Usa `class-validator` para validar automáticamente la request.
 * - Usa `@ApiPropertyOptional` para indicar en Swagger que los campos son opcionales.
 *
 * @example
 * PUT /users/:id
 * ```json
 * {
 *   "name": "Ada L.",
 *   "email": "ada.l@example.com"
 * }
 * ```
 */
export class UpdateUserDto {
  /**
   * Nuevo nombre visible del usuario.
   *
   * - Opcional.
   * - Máximo 100 caracteres.
   *
   * @example "Ada L."
   */
  @ApiPropertyOptional({ example: 'Ada L.', description: 'Nuevo nombre del usuario' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  /**
   * Nuevo correo electrónico del usuario.
   *
   * - Opcional.
   * - Debe tener formato válido de email.
   * - Máximo 255 caracteres.
   *
   * @example "ada.l@example.com"
   */
  @ApiPropertyOptional({
    example: 'ada.l@example.com',
    description: 'Nuevo correo electrónico del usuario',
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email?: string;
}
