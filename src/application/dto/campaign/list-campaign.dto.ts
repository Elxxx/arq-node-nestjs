import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ListCampaignsDto {
  @ApiProperty({ example: 'c7b7e5b0-3b0b-4f2a-9f42-abc123456789', description: 'Tenant ID' })
  @IsUUID()
  tenantId!: string;
}
