// src/application/dto/auth/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'ada@example.com', description: 'Correo del usuario' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SuperSecure123!', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
