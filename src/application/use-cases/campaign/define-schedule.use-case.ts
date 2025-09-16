// src/application/use-cases/campaign/define-schedule.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { ScheduleDto } from '../../dto/campaign/schedule.dto';
import { CampaignSchedule } from '../../../domain/entities/campaign/campaign-schedule.entity';

@Injectable()
export class DefineScheduleUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}

  async execute(campaignId: string, dto: ScheduleDto): Promise<void> {
    const schedule = new CampaignSchedule({
      id: crypto.randomUUID(),
      campaignId,
      type: dto.type,
      cronJson: dto.cronJson,
      timezone: dto.timezone,
    });
    await this.repo.upsertSchedule(schedule);
    await this.repo.updateStatus(campaignId, 'scheduled');
  }
}
