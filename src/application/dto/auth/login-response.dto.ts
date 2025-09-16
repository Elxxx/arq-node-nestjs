import { ApiProperty } from '@nestjs/swagger';

/**
 * Respuesta al login.
 */
export class LoginResponseDto {
  @ApiProperty({ example: 'jwt.token.aqui', description: 'Token JWT válido' })
  accessToken!: string;

  @ApiProperty({ example: 'uuid-123', description: 'ID del usuario autenticado' })
  userId!: string;

  @ApiProperty({ example: 'uuid-tenant-123', description: 'ID del tenant' })
  tenantId!: string;

  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico del usuario' })
  email!: string;

  @ApiProperty({ example: 'ADMIN', description: 'Rol del usuario' })
  roleName!: string;

  @ApiProperty({ example: 1, description: 'ID del rol del usuario' })
  roleId!: number;

}
