import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TENANT_REPOSITORY, TenantRepository } from '../../../domain/repositories/tenant/tenant.repository';
import { UpdateTenantDto } from '../../dto/tenant/update-tenant.dto';
import { Tenant } from '../../../domain/entities/tenant/tenant.entity';
import { TenantDomainService } from '../../../domain/services/tenant/tenant.domain-service';

/**
 * Caso de uso: Actualizar Tenant.
 */
@Injectable()
export class UpdateTenantUseCase {
  constructor(
    @Inject(TENANT_REPOSITORY) private readonly repo: TenantRepository,
    private readonly domain: TenantDomainService,
  ) {}

  async execute(id: string, input: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.repo.findById(id);
    if (!tenant) throw new NotFoundException('Tenant no encontrado');

    // Si cambia el slug, validar unicidad
    if (input.slug && input.slug !== tenant.slug) {
      await this.domain.ensureSlugIsUnique(input.slug);
      tenant.slug = input.slug;
    }

    if (typeof input.name === 'string') tenant.name = input.name;
    if (typeof input.plan === 'string') tenant.plan = input.plan;
    if (typeof input.active === 'boolean') tenant.active = input.active;

    tenant.updatedAt = new Date();
    return this.repo.update(tenant);
  }
}
