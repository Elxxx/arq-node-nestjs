// src/application/dto/role/role.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: 1, description: 'Identificador único del rol' })
  id!: number;

  @ApiProperty({ example: 'ADMIN', description: 'Nombre único del rol' })
  name!: string;

  @ApiProperty({ example: 'Administrador con acceso completo', description: 'Descripción del rol' })
  description?: string;
}
