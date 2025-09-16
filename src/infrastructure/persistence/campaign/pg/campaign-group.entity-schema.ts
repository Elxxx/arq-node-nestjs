// src/infrastructure/database/typeorm/entities/campaign/campaign-group.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { CampaignGroup } from '../../../../domain/entities/campaign/campaign-group.entity';

export const CampaignGroupEntitySchema = new EntitySchema<CampaignGroup>({
  name: 'CampaignGroup',
  schema: 'campaigns',
  tableName: 'campaign_groups',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    campaignId: { type: 'uuid', name: 'campaign_id' },
    name: { type: 'text' },
    difficulty: { type: 'enum', enum: ['low','medium','high'] },
    aiScore: { type: 'numeric', name: 'ai_score', precision: 5, scale: 2, default: 0 },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
    updatedAt: { type: 'timestamptz', name: 'updated_at', updateDate: true },
  },
});
