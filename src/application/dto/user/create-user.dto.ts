import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ada', description: 'Primer nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ example: 'Byron', description: 'Segundo nombre del usuario', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  middleName?: string;

  @ApiProperty({ example: 'Lovelace', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({ example: 'ada@example.com', description: 'Correo electrónico único del usuario' })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: '+56912345678', description: 'Teléfono de contacto del usuario', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ example: 'CL', description: 'Código ISO del país del usuario (ej. CL, US, ES)', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(2)
  countryCode?: string;

  @ApiProperty({ example: 'SuperSecret123!', description: 'Contraseña del usuario (mínimo 8 caracteres)' })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password!: string;

  @ApiProperty({ example: 1, description: 'Identificador del rol asignado al usuario' })
  @IsNotEmpty()
  roleId!: number;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean = false;
}
