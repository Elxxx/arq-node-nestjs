// src/infrastructure/database/typeorm/entities/campaign/campaign-group-member.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { CampaignGroupMember } from '../../../../domain/entities/campaign/campaign-group-member.entity';

export const CampaignGroupMemberEntitySchema = new EntitySchema<CampaignGroupMember>({
  name: 'CampaignGroupMember',
  schema: 'campaigns',
  tableName: 'campaign_group_members',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    groupId: { type: 'uuid', name: 'group_id' },
    userId: { type: 'uuid', name: 'user_id' },
    departmentId: { type: 'uuid', name: 'department_id', nullable: true },
  },
});
