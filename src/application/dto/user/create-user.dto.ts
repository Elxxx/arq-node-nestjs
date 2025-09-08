import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * DTO de entrada para crear un nuevo usuario.
 *
 * @remarks
 * - Define la forma de los datos que el cliente debe enviar.
 * - Usa `class-validator` para validar automáticamente la request.
 * - Usa `@ApiProperty` para generar documentación Swagger.
 *
 * @example
 * POST /users
 * ```json
 * {
 *   "name": "Ada Lovelace",
 *   "email": "ada@example.com"
 * }
 * ```
 */
export class CreateUserDto {
  /**
   * Nombre visible del usuario.
   *
   * - Obligatorio.
   * - Máximo 100 caracteres.
   *
   * @example "Ada Lovelace"
   */
  @ApiProperty({ example: 'Ada Lovelace', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  /**
   * Correo electrónico único del usuario.
   *
   * - Obligatorio.
   * - Formato válido de email.
   * - Máximo 255 caracteres.
   *
   * @example "ada@example.com"
   */
  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  @MaxLength(255)
  email!: string;
}
