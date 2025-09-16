// src/application/use-cases/campaign/create-campaign.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { CreateCampaignDto } from '../../dto/campaign/create-campaign.dto';
import { Campaign } from '../../../domain/entities/campaign/campaign.entity';

@Injectable()
export class CreateCampaignUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}

  async execute(dto: CreateCampaignDto, creatorUserId: string): Promise<Campaign> {
    const campaign = new Campaign({
      id: crypto.randomUUID(),
      tenantId: dto.tenantId,
      name: dto.name,
      description: dto.description,
      strategy: dto.strategy ?? 'auto',
      createdBy: creatorUserId,
    });
    return this.repo.create(campaign);
  }
}
