// src/application/use-cases/campaign/launch-campaign.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';

@Injectable()
export class LaunchCampaignUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}
  async execute(campaignId: string): Promise<void> {
    await this.repo.updateStatus(campaignId, 'running');
    // Aquí podrías emitir un evento a RabbitMQ para orquestar envíos
  }
}
