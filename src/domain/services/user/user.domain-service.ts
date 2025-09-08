// src/domain/services/user/user.domain-service.ts
import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../repositories/user/user.repository';
import { ROLE_REPOSITORY, RoleRepository } from '../../repositories/user/role.repository';

/**
 * Servicio de dominio para usuarios.
 *
 * @remarks
 * - Contiene **reglas de negocio puras** relacionadas con usuarios.
 * - No depende de frameworks de infraestructura (solo contratos de repositorios).
 * - Se enfoca en validar invariantes y restricciones de dominio.
 */
@Injectable()
export class UserDomainService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepo: RoleRepository,
  ) {}

  /**
   * Verifica que un correo electrónico no esté registrado en el sistema.
   *
   * @param email - Correo electrónico a verificar.
   * @throws {Error} Si el correo ya está en uso.
   */
  async ensureEmailIsUnique(email: string): Promise<void> {
    const exists = await this.userRepo.findByEmail(email);
    if (exists) {
      throw new Error('EMAIL_ALREADY_USED');
    }
  }

  /**
   * Verifica que el rol asignado exista en el sistema.
   *
   * @param roleId - ID del rol a verificar.
   * @throws {Error} Si el rol no existe.
   */
  async ensureRoleExists(roleId: number): Promise<void> {
    const role = await this.roleRepo.findById(roleId);
    if (!role) {
      throw new Error('ROLE_NOT_FOUND');
    }
  }

  /**
   * Reglas básicas de contraseñas.
   *
   * @param password - Contraseña en texto plano.
   * @throws {Error} Si la contraseña no cumple las reglas mínimas.
   */
  ensurePasswordIsStrong(password: string): void {
    if (password.length < 8) {
      throw new Error('PASSWORD_TOO_SHORT');
    }
    // Ejemplo de regla opcional: debe contener número y letra
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      throw new Error('PASSWORD_WEAK');
    }
  }
}
