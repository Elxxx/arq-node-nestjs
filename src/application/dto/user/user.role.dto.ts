import { ApiProperty } from '@nestjs/swagger';

export class UserRoleResponseDto {
  @ApiProperty({ example: 'uuid-123', description: 'ID único del usuario' })
  user_id!: string;
  @ApiProperty({ example: 'uuid-tenant', description: 'ID del tenant al que pertenece el usuario' })
  user_tenant_id!: string;
  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico único del usuario' })
  user_email!: string;
  @ApiProperty({ example: 'Ada', description: 'Primer nombre' })
  user_first_name!: string;
  @ApiProperty({ example: 'Lovelace', description: 'Apellido' })
  user_last_name!: string;
  @ApiProperty({ example: '+56912345678', description: 'Número telefónico', required: false })
  user_phone?: string;
  @ApiProperty({ example: 'Psdf4234f', description: 'Contraseña del usuario'})
  user_password_hash!: string;
  @ApiProperty({ example: 'uuid-department', description: 'Departamento al que pertenece', required: false })
  user_department_id?: string;
  @ApiProperty({ example: 1, description: 'ID del rol asignado' })
  user_role_id!: number;
  @ApiProperty({ example: true, description: 'Indica si el usuario está activo' })
  user_active!: boolean;
  @ApiProperty({ example: '2025-08-20T20:30:00.000Z', description: 'Fecha de creación' })
  user_created_at!: Date;
  @ApiProperty({ example: '2025-08-20T20:35:00.000Z', description: 'Última actualización' })
  user_updated_at!: Date;
  @ApiProperty({ example: 'Admin', description: 'Nombre del rol asignado' })
  role_name?: string;
  @ApiProperty({ example: 'Tenant XYZ', description: 'Nombre del tenant al que pertenece el usuario' })
  tenant_name?: string;
}
