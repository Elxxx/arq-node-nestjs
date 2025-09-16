import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

/** DTO de entrada para actualizar un Tenant. */
export class UpdateTenantDto {
  @ApiPropertyOptional({ example: 'Acme Corp Chile' })
  @IsString()
  @IsOptional()
  @MaxLength(80)
  name?: string;

  @ApiPropertyOptional({ example: 'acme-corp-cl' })
  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/)
  @MaxLength(80)
  slug?: string;

  @ApiPropertyOptional({ example: 'enterprise' })
  @IsString()
  @IsOptional()
  plan?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
