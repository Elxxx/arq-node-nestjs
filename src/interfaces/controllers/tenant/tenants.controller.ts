import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTenantDto } from '../../../application/dto/tenant/create-tenant.dto';
import { UpdateTenantDto } from '../../../application/dto/tenant/update-tenant.dto';
import { TenantResponseDto } from '../../../application/dto/tenant/tenant.response.dto';

import { CreateTenantUseCase } from '../../../application/use-cases/tenant/create-tenant.use-case';
import { ListTenantsUseCase } from '../../../application/use-cases/tenant/list-tenants.use-case';
import { GetTenantUseCase } from '../../../application/use-cases/tenant/get-tenant.use-case';
import { UpdateTenantUseCase } from '../../../application/use-cases/tenant/update-tenant.use-case';
import { DeleteTenantUseCase } from '../../../application/use-cases/tenant/delete-tenant.use-case';

import { Tenant } from '../../../domain/entities/tenant/tenant.entity';

/**
 * Controlador HTTP para gestión de Tenants (Súper Admin).
 */
@ApiTags('Tenants (SaaS)')
@Controller({ path: 'tenant/tenants', version: '1' })
export class TenantsController {
  constructor(
    private readonly createTenant: CreateTenantUseCase,
    private readonly listTenants: ListTenantsUseCase,
    private readonly getTenant: GetTenantUseCase,
    private readonly updateTenant: UpdateTenantUseCase,
    private readonly deleteTenant: DeleteTenantUseCase,
  ) {}

  /** Mapea entidad → DTO de salida. */
  private toResponse(t: Tenant): TenantResponseDto {
    return {
      id: t.id,
      name: t.name,
      slug: t.slug,
      plan: t.plan,
      active: t.active,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Crear Tenant' })
  async create(@Body() dto: CreateTenantDto): Promise<TenantResponseDto> {
    const tenant = await this.createTenant.execute(dto);
    return this.toResponse(tenant);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Tenants' })
  async findAll(): Promise<TenantResponseDto[]> {
    const items = await this.listTenants.execute();
    return items.map((t) => this.toResponse(t));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Tenant por ID' })
  async findOne(@Param('id') id: string): Promise<TenantResponseDto> {
    const tenant = await this.getTenant.execute(id);
    return this.toResponse(tenant);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar Tenant' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTenantDto,
  ): Promise<TenantResponseDto> {
    const tenant = await this.updateTenant.execute(id, dto);
    return this.toResponse(tenant);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Tenant' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteTenant.execute(id);
  }
}
