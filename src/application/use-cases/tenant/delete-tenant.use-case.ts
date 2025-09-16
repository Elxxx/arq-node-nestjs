import { Inject, Injectable } from '@nestjs/common';
import { TENANT_REPOSITORY, TenantRepository } from '../../../domain/repositories/tenant/tenant.repository';

/**
 * Caso de uso: Eliminar Tenant.
 */
@Injectable()
export class DeleteTenantUseCase {
  constructor(@Inject(TENANT_REPOSITORY) private readonly repo: TenantRepository) {}
  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
