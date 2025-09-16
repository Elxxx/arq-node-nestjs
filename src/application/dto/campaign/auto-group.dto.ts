// src/application/dto/campaign/auto-group.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, IsOptional, IsNumber } from 'class-validator';

export class AutoGroupDto {
  @ApiProperty({ example: 4, description: 'Cantidad deseada de grupos' })
  @IsInt()
  @Min(1)
  groups!: number;

  @ApiPropertyOptional({ example: 0.2, description: 'Máximo % por departamento (0.2 = 20%)' })
  @IsOptional()
  @IsNumber()
  maxSharePerDept?: number; // default 0.2
}
