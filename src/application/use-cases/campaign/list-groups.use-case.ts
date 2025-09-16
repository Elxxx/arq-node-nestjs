// src/application/use-cases/campaign/list-groups.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { CampaignGroup } from '../../../domain/entities/campaign/campaign-group.entity';

@Injectable()
export class ListCampaignGroupsUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}
  execute(campaignId: string): Promise<CampaignGroup[]> {
    return this.repo.listGroups(campaignId);
  }
}
