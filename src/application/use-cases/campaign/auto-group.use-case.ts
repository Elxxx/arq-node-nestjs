// src/application/use-cases/campaign/auto-group.use-case.ts
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, CampaignRepository } from '../../../domain/repositories/campaign/campaign.repository';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { AutoGroupDto } from '../../dto/campaign/auto-group.dto';
import { CampaignGroupingDomainService } from '../../../domain/services/campaign/campaign-grouping.domain-service';
import { CampaignGroup } from '../../../domain/entities/campaign/campaign-group.entity';
import { CampaignGroupMember } from '../../../domain/entities/campaign/campaign-group-member.entity';

@Injectable()
export class AutoGroupUseCase {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY) private readonly campaignRepo: CampaignRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly grouping: CampaignGroupingDomainService,
  ) {}

  async execute(campaignId: string, dto: AutoGroupDto): Promise<void> {
    const campaign = await this.campaignRepo.findById(campaignId);
    if (!campaign) throw new BadRequestException('Campaña no existe');

    // Traer usuarios del tenant
    const users = await this.userRepo.findAllByTenant(campaign.tenantId);
    if (users.length === 0) throw new BadRequestException('No hay usuarios para agrupar');

    const input = {
      users: users.map(u => ({ userId: u.id, departmentId: u.departmentId })),
      maxSharePerDept: dto.maxSharePerDept ?? 0.2,
      desiredGroups: dto.groups,
    };
    const result = this.grouping.group(input);

    // Persistir grupos y miembros
    const groups: CampaignGroup[] = [];
    const members: CampaignGroupMember[] = [];

    for (const g of result.groups) {
      const groupId = crypto.randomUUID();
      groups.push(new CampaignGroup({
        id: groupId,
        campaignId,
        name: g.name,
        difficulty: g.difficulty,
        aiScore: g.aiScore,
      }));
      for (const m of g.members) {
        members.push(new CampaignGroupMember({
          id: crypto.randomUUID(),
          groupId,
          userId: m.userId,
          departmentId: m.departmentId,
        }));
      }
    }

    await this.campaignRepo.addGroups(groups);
    await this.campaignRepo.addGroupMembers(members);
  }
}
