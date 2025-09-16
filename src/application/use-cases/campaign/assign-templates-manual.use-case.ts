// src/application/use-cases/campaign/assign-templates-manual.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { AssignTemplatesManualDto } from '../../dto/campaign/assign-templates-manual.dto';
import { CampaignTemplateAssignment } from '../../../domain/entities/campaign/campaign-template.entity';

@Injectable()
export class AssignTemplatesManualUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}

  async execute(campaignId: string, dto: AssignTemplatesManualDto): Promise<void> {
    const assignment = new CampaignTemplateAssignment({
      id: crypto.randomUUID(),
      campaignId,
      groupId: dto.groupId,
      emailTemplateId: dto.emailTemplateId,
      landingPageId: dto.landingPageId,
      assignedMode: 'manual',
    });
    await this.repo.upsertTemplateAssignments([assignment]);
  }
}
