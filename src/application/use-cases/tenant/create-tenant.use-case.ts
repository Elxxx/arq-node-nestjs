import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from '../../../domain/entities/tenant/tenant.entity';
import { TENANT_REPOSITORY, TenantRepository } from '../../../domain/repositories/tenant/tenant.repository';
import { TenantDomainService } from '../../../domain/services/tenant/tenant.domain-service';
import { CreateTenantDto } from '../../dto/tenant/create-tenant.dto';

/**
 * Caso de uso: Crear Tenant.
 */
@Injectable()
export class CreateTenantUseCase {
  constructor(
    private readonly domain: TenantDomainService,
    @Inject(TENANT_REPOSITORY) private readonly repo: TenantRepository,
  ) {}

  async execute(input: CreateTenantDto): Promise<Tenant> {
    await this.domain.ensureSlugIsUnique(input.slug);

    const tenant = new Tenant({
      id: uuidv4(),
      name: input.name,
      slug: input.slug,
      plan: input.plan,
      active: input.active,
    });

    return this.repo.create(tenant);
  }
}
