// src/domain/services/role/role.domain-service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY, RoleRepository } from '../../../repositories/user/role.repository';

/**
 * Servicio de dominio para roles.
 *
 * @remarks
 * - Contiene reglas de negocio puras relacionadas con roles.
 * - No depende de frameworks de infraestructura.
 */
@Injectable()
export class RoleDomainService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly repo: RoleRepository,
  ) {}

  /**
   * Verifica que el nombre de rol sea único en el sistema.
   *
   * @param name - Nombre del rol a verificar.
   * @throws {Error} Si ya existe un rol con ese nombre.
   */
  async ensureRoleNameIsUnique(name: string): Promise<void> {
    const exists = await this.repo.findByName(name);
    if (exists) {
      throw new Error('ROLE_NAME_ALREADY_EXISTS');
    }
  }

  /**
   * Verifica que el rol exista por su ID.
   *
   * @param id - ID del rol.
   * @throws {Error} Si el rol no existe.
   */
  async ensureRoleExists(id: number): Promise<void> {
    const role = await this.repo.findById(id);
    if (!role) {
      throw new Error('ROLE_NOT_FOUND');
    }
  }
}
