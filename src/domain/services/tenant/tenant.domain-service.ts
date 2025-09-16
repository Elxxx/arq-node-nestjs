import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { TENANT_REPOSITORY, TenantRepository } from '../../repositories/tenant/tenant.repository';

/**
 * Servicio de dominio para `Tenant`.
 *
 * @remarks
 * - Reglas de negocio puras (invariantes).
 * - Ej: unicidad de `slug`.
 */
@Injectable()
export class TenantDomainService {
  constructor(
    @Inject(TENANT_REPOSITORY) private readonly repo: TenantRepository,
  ) {}

  /**
   * Verifica que el slug no esté repetido.
   * @throws {BadRequestException} si el slug ya existe.
   */
  async ensureSlugIsUnique(slug: string): Promise<void> {
    const exists = await this.repo.findBySlug(slug);
    if (exists) {
      throw new BadRequestException('El slug ya está en uso');
    }
  }
}
