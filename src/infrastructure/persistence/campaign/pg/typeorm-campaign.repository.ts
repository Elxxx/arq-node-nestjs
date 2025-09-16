// src/infrastructure/persistence/campaign/pg/typeorm-campaign.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Campaign } from '../../../../domain/entities/campaign/campaign.entity';
import { CampaignGroup } from '../../../../domain/entities/campaign/campaign-group.entity';
import { CampaignGroupMember } from '../../../../domain/entities/campaign/campaign-group-member.entity';
import { CampaignTemplateAssignment } from '../../../../domain/entities/campaign/campaign-template.entity';
import { CampaignSchedule } from '../../../../domain/entities/campaign/campaign-schedule.entity';
import { CampaignRepository } from '../../../../domain/repositories/campaign/campaign.repository';

import { CampaignEntitySchema } from './campaign.entity-schema';
import { CampaignGroupEntitySchema } from './campaign-group.entity-schema';
import { CampaignGroupMemberEntitySchema } from './campaign-group-member.entity-schema';
import { CampaignTemplateEntitySchema } from './campaign-template.entity-schema';
import { CampaignScheduleEntitySchema } from './campaign-schedule.entity-schema';

@Injectable()
export class TypeOrmCampaignRepository implements CampaignRepository {
  constructor(
    @InjectRepository(CampaignEntitySchema) private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(CampaignGroupEntitySchema) private readonly groupRepo: Repository<CampaignGroup>,
    @InjectRepository(CampaignGroupMemberEntitySchema) private readonly memberRepo: Repository<CampaignGroupMember>,
    @InjectRepository(CampaignTemplateEntitySchema) private readonly tmplRepo: Repository<CampaignTemplateAssignment>,
    @InjectRepository(CampaignScheduleEntitySchema) private readonly schedRepo: Repository<CampaignSchedule>,
  ) {}

  create(campaign: Campaign): Promise<Campaign> {
    return this.campaignRepo.save(campaign);
  }

  findById(id: string): Promise<Campaign | null> {
    return this.campaignRepo.findOne({ where: { id } });
  }

  findAllByTenant(tenantId: string): Promise<Campaign[]> {
    return this.campaignRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } });
  }

  update(campaign: Campaign): Promise<Campaign> {
    return this.campaignRepo.save(campaign);
  }

  async updateStatus(id: string, status: Campaign['status']): Promise<void> {
    await this.campaignRepo.update({ id }, { status });
  }

  async addGroups(groups: CampaignGroup[]): Promise<void> {
    await this.groupRepo.save(groups);
  }

  listGroups(campaignId: string): Promise<CampaignGroup[]> {
    return this.groupRepo.find({ where: { campaignId }, order: { createdAt: 'ASC' } });
  }

  async addGroupMembers(members: CampaignGroupMember[]): Promise<void> {
    await this.memberRepo.save(members);
  }

  async upsertTemplateAssignments(assignments: CampaignTemplateAssignment[]): Promise<void> {
    if (assignments.length === 0) return;
    await this.tmplRepo.save(assignments);
  }

  async upsertSchedule(schedule: CampaignSchedule): Promise<void> {
    // si existe para campaignId, reemplazar
    const existing = await this.schedRepo.findOne({ where: { campaignId: schedule.campaignId } });
    if (existing) {
      existing.type = schedule.type;
      existing.cronJson = schedule.cronJson;
      existing.timezone = schedule.timezone;
      await this.schedRepo.save(existing);
      return;
    }
    await this.schedRepo.save(schedule);
  }

  getSchedule(campaignId: string): Promise<CampaignSchedule | null> {
    return this.schedRepo.findOne({ where: { campaignId } });
  }
}
