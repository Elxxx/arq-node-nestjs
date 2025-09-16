import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

/**
 * DTO para login.
 *
 * @description
 * - Requiere tenantId para diferenciar usuarios en diferentes tenants.
 */
export class LoginDto {
  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SuperSecret123!', description: 'Contraseña en texto plano' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    example: 'uuid-tenant-123',
    description: 'Identificador único del tenant al que pertenece el usuario',
  })
  @IsUUID()
  tenantId!: string;
}
