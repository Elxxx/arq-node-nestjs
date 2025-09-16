import { ApiProperty } from '@nestjs/swagger';

/** DTO de salida para exponer Tenants en la API. */
export class TenantResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Acme Corp' })
  name!: string;

  @ApiProperty({ example: 'acme-corp' })
  slug!: string;

  @ApiProperty({ example: 'pro' })
  plan!: string;

  @ApiProperty({ example: true })
  active!: boolean;

  @ApiProperty({ example: '2025-01-01T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-01-02T12:00:00.000Z' })
  updatedAt!: Date;
}

