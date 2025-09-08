// src/application/dto/auth/login-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'jwt.token.aqui', description: 'Token JWT válido' })
  accessToken!: string;

  @ApiProperty({ example: 'uuid-123', description: 'ID del usuario autenticado' })
  userId!: string;

  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico del usuario' })
  email!: string;

  @ApiProperty({ example: 'ADMIN', description: 'Rol del usuario' })
  roleName!: string;
}
