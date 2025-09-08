// src/domain/services/user.domain-service.ts
import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../repositories/user/user.repository';

/**
 * Servicio de dominio para usuarios.
 *
 * @remarks
 * - Contiene **reglas de negocio puras** relacionadas con usuarios.
 * - No depende de NestJS (excepto para la inyección de dependencias).
 * - Aquí se validan **invariantes** y restricciones propias del dominio.
 *
 * @example
 * // Uso en un caso de uso:
 * await this.userDomainService.ensureEmailIsUnique('ada@example.com');
 */
@Injectable()
export class UserDomainService {
  /**
   * @param repo - Puerto del repositorio de usuarios.
   *   Se inyecta usando el token `USER_REPOSITORY`.
   */
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repo: UserRepository,
  ) {}

  /**
   * Verifica que un correo electrónico no esté registrado en el sistema.
   *
   * @param email - Correo electrónico a verificar.
   * @throws {Error} Si el correo ya está en uso.
   */
  async ensureEmailIsUnique(email: string): Promise<void> {
    const exists = await this.repo.findByEmail(email);
    if (exists) {
      throw new Error('Email already in use');
    }
  }
}
