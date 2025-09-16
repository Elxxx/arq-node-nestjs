// src/application/use-cases/campaign/assign-templates-auto.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { CampaignTemplateAssignment } from '../../../domain/entities/campaign/campaign-template.entity';

@Injectable()
export class AssignTemplatesAutoUseCase {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repo: CampaignRepository) {}

  async execute(campaignId: string): Promise<void> {
    // Heurística: mapear difficulty -> template por defecto (IDs se obtendrían de catálogo)
    // Aquí hacemos una asignación “vacía” como placeholder.
    const assignments: CampaignTemplateAssignment[] = [
      new CampaignTemplateAssignment({
        id: 'template-assignment-placeholder-id',
        campaignId: campaignId,
        assignedMode: 'auto',
      }),
    ]; // llena según tus reglas reales
    await this.repo.upsertTemplateAssignments(assignments);
  }
}
