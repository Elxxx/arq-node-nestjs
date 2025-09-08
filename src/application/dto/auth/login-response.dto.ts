import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de salida para la respuesta de autenticación.
 *
 * @remarks
 * - Define la estructura de la respuesta cuando un usuario inicia sesión correctamente.
 * - Devuelve información básica del usuario autenticado.
 * - No expone directamente la entidad de dominio (`AuthUser`), respetando la separación de capas.
 *
 * @example
 * ```json
 * {
 *   "id": "123",
 *   "userName": "usuario1",
 *   "system": "Mi Sistema"
 * }
 * ```
 */
export class LoginResponseDto {
  @ApiProperty({
    example: '123',
    description: 'Identificador único del usuario',
  })
  id!: string;

  @ApiProperty({
    example: 'usuario1',
    description: 'Nombre de usuario autenticado',
  })
  userName!: string;

  @ApiProperty({
    example: 'Mi Sistema',
    description: 'Sistema desde el cual se autenticó el usuario',
  })
  system!: string;
}
