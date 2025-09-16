// src/interfaces/controllers/campaign/campaigns.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCampaignUseCase } from '../../../application/use-cases/campaign/create-campaign.use-case';
import { AttachParticipantsUseCase } from '../../../application/use-cases/campaign/attach-participants.use-case';
import { AutoGroupUseCase } from '../../../application/use-cases/campaign/auto-group.use-case';
import { ListCampaignGroupsUseCase } from '../../../application/use-cases/campaign/list-groups.use-case';
import { AssignTemplatesAutoUseCase } from '../../../application/use-cases/campaign/assign-templates-auto.use-case';
import { AssignTemplatesManualUseCase } from '../../../application/use-cases/campaign/assign-templates-manual.use-case';
import { DefineScheduleUseCase } from '../../../application/use-cases/campaign/define-schedule.use-case';
import { LaunchCampaignUseCase } from '../../../application/use-cases/campaign/launch-campaign.use-case';
import { ListCampaignsUseCase } from '../../../application/use-cases/campaign/list-campaigns.use-case';
import { GetCampaignUseCase } from '../../../application/use-cases/campaign/get-campaign.use-case';

import { CreateCampaignDto } from '../../../application/dto/campaign/create-campaign.dto';
import { AttachParticipantsDto } from '../../../application/dto/campaign/attach-participants.dto';
import { AutoGroupDto } from '../../../application/dto/campaign/auto-group.dto';
import { ListCampaignsDto } from '../../../application/dto/campaign/list-campaign.dto';
import { ScheduleDto } from '../../../application/dto/campaign/schedule.dto';
import { AssignTemplatesManualDto } from '../../../application/dto/campaign/assign-templates-manual.dto';

// ✅ DTO para req.user extraído del JWT
export class AuthenticatedRequest {
  user!: {
    id: string;       // id del usuario
    tenantId: string; // tenant del usuario
    email: string;    // opcional: correo
    role: string;     // opcional: rol
  };
}

@ApiTags('Campañas')
@Controller({ path: 'campaigns', version: '1' })
export class CampaignsController {
  constructor(
    private readonly createCampaignUseCase: CreateCampaignUseCase,
    private readonly attachParticipantsUseCase: AttachParticipantsUseCase,
    private readonly autoGroupUseCase: AutoGroupUseCase,
    private readonly listGroupsUseCase: ListCampaignGroupsUseCase,
    private readonly assignTemplatesAutoUseCase: AssignTemplatesAutoUseCase,
    private readonly assignTemplatesManualUseCase: AssignTemplatesManualUseCase,
    private readonly defineScheduleUseCase: DefineScheduleUseCase,
    private readonly launchCampaignUseCase: LaunchCampaignUseCase,
    private readonly listCampaignsUseCase: ListCampaignsUseCase,
    private readonly getCampaignUseCase: GetCampaignUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear campaña' })
  async create(@Body() dto: CreateCampaignDto, @Req() req: AuthenticatedRequest) {
    const userId = dto.creatorUserId ?? req.user?.id ?? 'SYSTEM';
    const created = await this.createCampaignUseCase.execute(dto, userId);
    return { success: true, data: created };
  }

  @Post(':id/participants')
  @ApiOperation({ summary: 'Adjuntar participantes por userId' })
  async attachParticipants(
    @Param('id') id: string,
    @Body() dto: AttachParticipantsDto , @Req() req: AuthenticatedRequest ) {
    const tenantId = (dto.tenantsId && dto.tenantsId[0]) ?? req.user?.tenantId ?? 'c7b7e5b0-3b0b-4f2a-9f42-abc123456789';
    await this.attachParticipantsUseCase.execute(id, dto, tenantId);
    return { success: true, message: 'Participantes validados (se usarán en agrupación)' };
  }

  @Post(':id/auto-group')
  @ApiOperation({ summary: 'Generar agrupación automática con regla 20%' })
  async autoGrouping(@Param('id') id: string, @Body() dto: AutoGroupDto) {
    await this.autoGroupUseCase.execute(id, dto);
    return { success: true, message: 'Grupos generados' };
  }

  @Get(':id/groups')
  @ApiOperation({ summary: 'Listar grupos de una campaña' })
  async getGroups(@Param('id') id: string) {
    const groups = await this.listGroupsUseCase.execute(id);
    return { success: true, data: groups };
  }

  @Post(':id/templates/auto')
  @ApiOperation({ summary: 'Asignación automática de plantillas' })
  async assignAuto(@Param('id') id: string) {
    await this.assignTemplatesAutoUseCase.execute(id);
    return { success: true, message: 'Plantillas asignadas automáticamente' };
  }

  @Post(':id/templates/manual')
  @ApiOperation({ summary: 'Asignación manual de plantillas por grupo' })
  async assignManual(@Param('id') id: string, @Body() dto: AssignTemplatesManualDto) {
    await this.assignTemplatesManualUseCase.execute(id, dto);
    return { success: true, message: 'Plantillas asignadas manualmente' };
  }

  @Post(':id/schedule')
  @ApiOperation({ summary: 'Definir cronograma' })
  async schedule(@Param('id') id: string, @Body() dto: ScheduleDto) {
    await this.defineScheduleUseCase.execute(id, dto);
    return { success: true, message: 'Cronograma definido y campaña programada' };
  }

  @Post(':id/launch')
  @ApiOperation({ summary: 'Lanzar campaña' })
  async launch(@Param('id') id: string) {
    await this.launchCampaignUseCase.execute(id);
    return { success: true, message: 'Campaña lanzada' };
  }

  @Get()
  @ApiOperation({ summary: 'Listar campañas por tenant' })
  async list(@Query() query: ListCampaignsDto) {
    const data = await this.listCampaignsUseCase.execute(query.tenantId);
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener campaña' })
  @ApiResponse({ status: 404, description: 'No encontrada' })
  async getOne(@Param('id') id: string) {
    const c = await this.getCampaignUseCase.execute(id);
    return { success: true, data: c };
  }
}
