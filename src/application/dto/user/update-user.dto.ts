import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Ada', description: 'Nuevo primer nombre' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Byron', description: 'Nuevo segundo nombre' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  middleName?: string;

  @ApiPropertyOptional({ example: 'Lovelace', description: 'Nuevo apellido' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ example: 'ada.l@example.com', description: 'Nuevo correo electrónico' })
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ example: '+56998765432', description: 'Nuevo teléfono' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'US', description: 'Nuevo país en código ISO' })
  @IsString()
  @IsOptional()
  @MaxLength(2)
  countryCode?: string;

  @ApiPropertyOptional({ example: 'NewPassword123!', description: 'Nueva contraseña del usuario' })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(255)
  password?: string;

  @ApiPropertyOptional({ example: 2, description: 'Nuevo rol del usuario' })
  @IsOptional()
  roleId?: number;

  @ApiPropertyOptional({ example: true, description: 'Nuevo estado de activación' })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
