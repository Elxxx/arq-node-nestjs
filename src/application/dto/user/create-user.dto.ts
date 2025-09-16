import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID, IsString, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'uuid-tenant', description: 'Tenant al que pertenece el usuario' })
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Ada', description: 'Nombre' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Lovelace', description: 'Apellido' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: '+56912345678', description: 'Número de teléfono', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'uuid-department', description: 'Departamento', required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiProperty({ example: 1, description: 'Rol del usuario (FK → roles.id)' })
  @IsInt()
  roleId!: number;

  @ApiProperty({ example: 'SuperSecret123!', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(8)
  password!: string;
}
