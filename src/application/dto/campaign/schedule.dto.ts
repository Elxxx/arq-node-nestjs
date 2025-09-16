// src/application/dto/campaign/schedule.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class ScheduleDto {
  @ApiProperty({ example: 'sequential', enum: ['once', 'sequential', 'windowed'] })
  @IsIn(['once', 'sequential', 'windowed'])
  type!: 'once' | 'sequential' | 'windowed';

  @ApiPropertyOptional({ example: { cron: '0 9 * * 1' } })
  @IsOptional()
  cronJson?: Record<string, unknown>;

  @ApiPropertyOptional({ example: 'America/Santiago' })
  @IsOptional()
  @IsString()
  timezone?: string;
}
