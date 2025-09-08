import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';

/**
 * Caso de uso: Listar todos los usuarios.
 *
 * @remarks
 * - Pertenece a la **Application Layer**.
 * - Orquesta la consulta de todos los usuarios registrados en el sistema.
 * - Aplica **DIP (Dependency Inversion Principle)**: depende del contrato `UserRepository`,
 *   no de una implementación específica.
 *
 * @example
 * const users = await listUsersUseCase.execute();
 * console.log(users.length); // Ej: 5
 */
@Injectable()
export class ListUsersUseCase {
  /**
   * @param repo - Puerto del repositorio de usuarios (inyectado vía token `USER_REPOSITORY`).
   */
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) {}

  /**
   * Ejecuta el caso de uso de listado de usuarios.
   *
   * @returns Lista de usuarios registrados en el sistema.
   */
  execute() {
    return this.repo.findAll();
  }
}
