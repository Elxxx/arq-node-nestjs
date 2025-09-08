// src/application/dto/role/create-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Nombre único del rol' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @ApiProperty({
    example: 'Administrador con acceso completo',
    description: 'Descripción del rol',
    required: false,
  })
  @IsString()
  @MaxLength(255)
  description?: string;
}
