// src/application/use-cases/campaign/get-campaign.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { Campaign } from '../../../domain/entities/campaign/campaign.entity';

@Injectable()
export class GetCampaignUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}
  async execute(id: string): Promise<Campaign> {
    const c = await this.repo.findById(id);
    if (!c) throw new NotFoundException('Campaña no encontrada');
    return c;
  }
}
