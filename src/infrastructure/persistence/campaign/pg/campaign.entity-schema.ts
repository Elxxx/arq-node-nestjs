// src/infrastructure/database/typeorm/entities/campaign/campaign.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { Campaign } from '../../../../domain/entities/campaign/campaign.entity';

export const CampaignEntitySchema = new EntitySchema<Campaign>({
  name: 'Campaign',
  schema: 'campaigns',
  tableName: 'campaigns',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    tenantId: { type: 'uuid', name: 'tenant_id' },
    name: { type: 'text' },
    description: { type: 'text', nullable: true },
    status: { type: 'enum', enum: ['draft','scheduled','running','paused','finished','cancelled'], default: 'draft' },
    strategy: { type: 'text', default: 'auto' },
    startAt: { type: 'timestamptz', name: 'start_at', nullable: true },
    endAt: { type: 'timestamptz', name: 'end_at', nullable: true },
    createdBy: { type: 'uuid', name: 'created_by' },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
    updatedAt: { type: 'timestamptz', name: 'updated_at', updateDate: true },
  },
});
