// src/infrastructure/database/typeorm/entities/campaign/campaign-template.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { CampaignTemplateAssignment } from '../../../../domain/entities/campaign/campaign-template.entity';

export const CampaignTemplateEntitySchema = new EntitySchema<CampaignTemplateAssignment>({
  name: 'CampaignTemplateAssignment',
  schema: 'campaigns',
  tableName: 'campaign_templates',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    campaignId: { type: 'uuid', name: 'campaign_id' },
    groupId: { type: 'uuid', name: 'group_id', nullable: true },
    emailTemplateId: { type: 'uuid', name: 'email_template_id', nullable: true },
    landingPageId: { type: 'uuid', name: 'landing_page_id', nullable: true },
    assignedMode: { type: 'text', name: 'assigned_mode', default: 'auto' },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
  },
});
