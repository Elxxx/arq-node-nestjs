import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * DTO de entrada para autenticación de usuarios.
 *
 * @remarks
 * - Define la forma de los datos que el cliente debe enviar para autenticarse.
 * - Usa `class-validator` para validar automáticamente la request.
 * - Usa `@ApiProperty` para generar documentación Swagger.
 *
 * @example
 * POST /auth/login
 * ```json
 * {
 *   "userName": "usuario1",
 *   "password": "secreto123",
 *   "nombreSistema": "Mi Sistema"
 * }
 * ```
 */
export class LoginDto {
  /**
   * Nombre de usuario para iniciar sesión.
   *
   * - Obligatorio.
   * - Texto alfanumérico.
   * - Máximo 100 caracteres.
   *
   * @example "usuario1"
   */
  @ApiProperty({ example: 'usuario1', description: 'Nombre de usuario para autenticación' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  userName!: string;

  /**
   * Contraseña del usuario.
   *
   * - Obligatoria.
   * - Debe tener al menos 6 caracteres.
   * - Puede incluir letras, números y símbolos.
   *
   * @example "secreto123"
   */
  @ApiProperty({ example: 'secreto123', description: 'Contraseña del usuario (mínimo 6 caracteres)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  password!: string;

  /**
   * Nombre del sistema desde el cual se realiza la autenticación.
   *
   * - Obligatorio.
   * - Identifica la aplicación o servicio solicitante.
   * - Máximo 150 caracteres.
   *
   * @example "Mi Sistema"
   */
  @ApiProperty({ example: 'Mi Sistema', description: 'Nombre del sistema cliente que solicita autenticación' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombreSistema!: string;
}
