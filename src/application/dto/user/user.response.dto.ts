import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de salida para un usuario.
 *
 * Refleja la tabla `users` con datos relevantes para la API.
 */
export class UserResponseDto {
  @ApiProperty({ example: 'uuid-123', description: 'ID único del usuario' })
  id!: string;

  @ApiProperty({ example: 'uuid-tenant', description: 'ID del tenant al que pertenece el usuario' })
  tenantId!: string;

  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico único del usuario' })
  email!: string;

  @ApiProperty({ example: 'Ada', description: 'Primer nombre' })
  firstName!: string;

  @ApiProperty({ example: 'Lovelace', description: 'Apellido' })
  lastName!: string;

  @ApiProperty({ example: '+56912345678', description: 'Número telefónico', required: false })
  phone?: string;

  @ApiProperty({ example: 'uuid-department', description: 'Departamento al que pertenece', required: false })
  departmentId?: string;

  @ApiProperty({ example: 1, description: 'ID del rol asignado' })
  roleId!: number;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo' })
  active!: boolean;

  @ApiProperty({ example: '2025-08-20T20:30:00.000Z', description: 'Fecha de creación' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-08-20T20:35:00.000Z', description: 'Última actualización' })
  updatedAt!: Date;
}
