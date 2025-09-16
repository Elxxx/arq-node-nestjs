// src/application/use-cases/campaign/list-campaigns.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { Campaign } from '../../../domain/entities/campaign/campaign.entity';

@Injectable()
export class ListCampaignsUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}
  execute(tenantId: string): Promise<Campaign[]> {
    return this.repo.findAllByTenant(tenantId);
  }
}
