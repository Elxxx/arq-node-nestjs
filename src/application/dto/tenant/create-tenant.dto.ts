import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

/** DTO de entrada para crear un Tenant. */
export class CreateTenantDto {
  @ApiProperty({ example: 'Acme Corp', description: 'Nombre del tenant' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @ApiProperty({
    example: 'acme-corp',
    description: 'Slug único (solo minúsculas, números y guiones)',
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  @MaxLength(80)
  slug!: string;

  @ApiPropertyOptional({ example: 'pro', description: 'Plan contratado' })
  @IsString()
  @IsOptional()
  plan?: string;

  @ApiPropertyOptional({ example: true, description: 'Estado activo' })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
