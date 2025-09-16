import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../repositories/user/user.repository';

/**
 * Servicio de dominio para `User`.
 *
 * @description
 * - Encapsula reglas de negocio puras relacionadas con usuarios.
 * - Valida invariantes como unicidad de email.
 * - No depende de NestJS excepto para la inyección de dependencias.
 *
 * @pattern Domain Service (DDD)
 */
@Injectable()
export class UserDomainService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repo: UserRepository,
  ) {}

  /**
   * Garantiza que el email sea único en el sistema.
   *
   * @param email - Correo a validar.
   * @throws {BadRequestException} Si ya existe un usuario con ese correo.
   */
  async ensureEmailIsUnique(email: string): Promise<void> {
    const exists = await this.repo.findByEmail(email);
    if (exists) {
      throw new BadRequestException('El correo ya está en uso');
    }
  }
}
