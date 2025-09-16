// src/application/dto/campaign/create-campaign.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ example: 'uuid-tenant' })
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ example: 'Phishing Enero' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Campaña de sensibilización' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'auto', enum: ['auto', 'manual'] })
  @IsOptional()
  @IsIn(['auto', 'manual'])
  strategy?: 'auto' | 'manual';

  @ApiPropertyOptional({ example: 'uuid-user' }) // 👈 visible en Swagger
  @IsOptional()
  @IsUUID()
  creatorUserId?: string;
}

