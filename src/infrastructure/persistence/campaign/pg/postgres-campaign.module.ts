// src/infrastructure/persistence/campaign/pg/postgres-campaign.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CAMPAIGN_REPOSITORY } from '../../../../domain/repositories/campaign/campaign.repository';
import { TypeOrmCampaignRepository } from './typeorm-campaign.repository';

import { CampaignEntitySchema } from './campaign.entity-schema';
import { CampaignGroupEntitySchema } from './campaign-group.entity-schema';
import { CampaignGroupMemberEntitySchema } from './campaign-group-member.entity-schema';
import { CampaignTemplateEntitySchema } from './campaign-template.entity-schema';
import { CampaignScheduleEntitySchema } from './campaign-schedule.entity-schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CampaignEntitySchema,
      CampaignGroupEntitySchema,
      CampaignGroupMemberEntitySchema,
      CampaignTemplateEntitySchema,
      CampaignScheduleEntitySchema,
    ]),
  ],
  providers: [
    { provide: CAMPAIGN_REPOSITORY, useClass: TypeOrmCampaignRepository },
  ],
  exports: [CAMPAIGN_REPOSITORY],
})
export class PostgresCampaignModule {}
