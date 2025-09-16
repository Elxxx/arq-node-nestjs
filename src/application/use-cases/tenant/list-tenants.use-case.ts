import { Inject, Injectable } from '@nestjs/common';
import { TENANT_REPOSITORY, TenantRepository } from '../../../domain/repositories/tenant/tenant.repository';
import { Tenant } from '../../../domain/entities/tenant/tenant.entity';

/**
 * Caso de uso: Listar Tenants.
 */
@Injectable()
export class ListTenantsUseCase {
  constructor(@Inject(TENANT_REPOSITORY) private readonly repo: TenantRepository) {}
  execute(): Promise<Tenant[]> {
    return this.repo.findAll();
  }
}
