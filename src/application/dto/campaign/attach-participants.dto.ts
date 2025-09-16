// src/application/dto/campaign/attach-participants.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty } from 'class-validator';

export class AttachParticipantsDto {
  @ApiProperty({ type: [String], example: ['uuid-user-1', 'uuid-user-2'] })
  @IsArray()
  @ArrayNotEmpty()
  userIds!: string[];

  @ApiProperty({ type: [String], example: ['uuid-tenant-1', 'uuid-tenant-2'] })
  @IsArray()
  @ArrayNotEmpty()
  tenantsId!: string[];
}
