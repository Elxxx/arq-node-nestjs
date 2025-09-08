import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de salida para exponer información de un usuario.
 *
 * @remarks
 * - Define la forma en que se devuelven los usuarios en la API.
 * - Se usa en las respuestas de los endpoints de `UsersController`.
 * - Incluye metadatos de auditoría (`createdAt`, `updatedAt`).
 *
 * @example
 * {
 *   "id": "uuid-123",
 *   "name": "Ada Lovelace",
 *   "email": "ada@example.com",
 *   "createdAt": "2025-08-20T20:30:00.000Z",
 *   "updatedAt": "2025-08-20T20:35:00.000Z"
 * }
 */
export class UserResponseDto {
  /** Identificador único del usuario (UUID). */
  @ApiProperty({ example: 'uuid-123', description: 'Identificador único del usuario' })
  id!: string;

  /** Nombre visible del usuario. */
  @ApiProperty({ example: 'Ada Lovelace', description: 'Nombre del usuario' })
  name!: string;

  /** Correo electrónico único del usuario. */
  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico del usuario' })
  email!: string;

  /** Fecha de creación del usuario. */
  @ApiProperty({ example: '2025-08-20T20:30:00.000Z', description: 'Fecha de creación' })
  createdAt!: Date;

  /** Fecha de última actualización del usuario. */
  @ApiProperty({
    example: '2025-08-20T20:35:00.000Z',
    description: 'Última fecha de actualización',
  })
  updatedAt!: Date;
}
