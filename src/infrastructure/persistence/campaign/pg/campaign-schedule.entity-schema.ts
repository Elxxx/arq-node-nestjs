// src/infrastructure/database/typeorm/entities/campaign/campaign-schedule.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { CampaignSchedule } from '../../../../domain/entities/campaign/campaign-schedule.entity';

export const CampaignScheduleEntitySchema = new EntitySchema<CampaignSchedule>({
  name: 'CampaignSchedule',
  schema: 'campaigns',
  tableName: 'campaign_schedule',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    campaignId: { type: 'uuid', name: 'campaign_id' },
    type: { type: 'enum', enum: ['once','sequential','windowed'] },
    cronJson: { type: 'jsonb', name: 'cron_json', default: () => `'{}'::jsonb` },
    timezone: { type: 'text', default: 'UTC' },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
    updatedAt: { type: 'timestamptz', name: 'updated_at', updateDate: true },
  },
});
