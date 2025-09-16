import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TENANT_REPOSITORY, TenantRepository } from '../../../domain/repositories/tenant/tenant.repository';
import { Tenant } from '../../../domain/entities/tenant/tenant.entity';

/**
 * Caso de uso: Obtener Tenant por ID.
 */
@Injectable()
export class GetTenantUseCase {
  constructor(@Inject(TENANT_REPOSITORY) private readonly repo: TenantRepository) {}

  async execute(id: string): Promise<Tenant> {
    const tenant = await this.repo.findById(id);
    if (!tenant) throw new NotFoundException('Tenant no encontrado');
    return tenant;
  }
}
