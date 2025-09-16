// src/application/dto/campaign/assign-templates-manual.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';

export class AssignTemplatesManualDto {
  @ApiProperty({ example: 'uuid-group' })
  @IsUUID()
  groupId!: string;

  @ApiProperty({ example: 'uuid-email-template', required: false })
  @IsOptional()
  @IsUUID()
  emailTemplateId?: string;

  @ApiProperty({ example: 'uuid-landing-page', required: false })
  @IsOptional()
  @IsUUID()
  landingPageId?: string;
}
