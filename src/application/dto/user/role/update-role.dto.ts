// src/application/dto/role/update-role.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({ example: 'USER', description: 'Nuevo nombre del rol' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ example: 'Usuario estándar', description: 'Nueva descripción del rol' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
