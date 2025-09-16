// src/application/use-cases/campaign/attach-participants.use-case.ts
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { AttachParticipantsDto } from '../../dto/campaign/attach-participants.dto';

@Injectable()
export class AttachParticipantsUseCase {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY) private readonly campaignRepo: CampaignRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  async execute(campaignId: string, dto: AttachParticipantsDto, tenantId: string): Promise<void> {
    const campaign = await this.campaignRepo.findById(campaignId);
    if (!campaign || campaign.tenantId !== tenantId) {
      throw new BadRequestException('Campaña no encontrada o inválida');
    }
    // Validar que los usuarios pertenezcan al tenant
    const users = await this.userRepo.findAllByTenant(tenantId);
    const validIds = new Set(users.map(u => u.id));
    const allOk = dto.userIds.every(id => validIds.has(id));
    if (!allOk) throw new BadRequestException('Hay usuarios que no pertenecen al tenant');

    // Persistencia diferida: no insertamos aún en campaign_group_members
    // Los miembros se agregan cuando se formen los grupos.
    // Aquí solo guardamos una “cola” temporal si quisieras (omito por brevedad).
  }
}
