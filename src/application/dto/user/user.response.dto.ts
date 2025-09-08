import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-123', description: 'Identificador único del usuario' })
  id!: string;

  @ApiProperty({ example: 'Ada', description: 'Primer nombre del usuario' })
  firstName!: string;

  @ApiProperty({ example: 'Byron', description: 'Segundo nombre del usuario', required: false })
  middleName?: string;

  @ApiProperty({ example: 'Lovelace', description: 'Apellido del usuario' })
  lastName!: string;

  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico único' })
  email!: string;

  @ApiProperty({ example: '+56912345678', description: 'Teléfono de contacto', required: false })
  phone?: string;

  @ApiProperty({ example: 'CL', description: 'Código ISO del país (ej. CL, US, ES)', required: false })
  countryCode?: string;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo' })
  active!: boolean;

  @ApiProperty({ example: 1, description: 'ID del rol asignado' })
  roleId!: number;

  @ApiProperty({ example: 'Administrador', description: 'Nombre del rol asignado' })
  roleName!: string;

  @ApiProperty({ example: '2025-08-20T20:30:00.000Z', description: 'Fecha de creación' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-08-20T20:35:00.000Z', description: 'Última actualización' })
  updatedAt!: Date;
}
