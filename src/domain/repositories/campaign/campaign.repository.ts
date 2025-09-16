// src/domain/repositories/campaign/campaign.repository.ts
import { Campaign } from '../../entities/campaign/campaign.entity';
import { CampaignGroup } from '../../entities/campaign/campaign-group.entity';
import { CampaignGroupMember } from '../../entities/campaign/campaign-group-member.entity';
import { CampaignTemplateAssignment } from '../../entities/campaign/campaign-template.entity';
import { CampaignSchedule } from '../../entities/campaign/campaign-schedule.entity';

export const CAMPAIGN_REPOSITORY = Symbol('CAMPAIGN_REPOSITORY');

export interface CampaignRepository {
  create(campaign: Campaign): Promise<Campaign>;
  findById(id: string): Promise<Campaign | null>;
  findAllByTenant(tenantId: string): Promise<Campaign[]>;
  update(campaign: Campaign): Promise<Campaign>;
  updateStatus(id: string, status: Campaign['status']): Promise<void>;

  // groups
  addGroups(groups: CampaignGroup[]): Promise<void>;
  listGroups(campaignId: string): Promise<CampaignGroup[]>;
  addGroupMembers(members: CampaignGroupMember[]): Promise<void>;

  // templates
  upsertTemplateAssignments(assignments: CampaignTemplateAssignment[]): Promise<void>;

  // schedule
  upsertSchedule(schedule: CampaignSchedule): Promise<void>;
  getSchedule(campaignId: string): Promise<CampaignSchedule | null>;
}
