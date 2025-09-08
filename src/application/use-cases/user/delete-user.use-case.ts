import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';

/**
 * Caso de uso: Eliminar un usuario.
 *
 * @remarks
 * - Pertenece a la **Application Layer**.
 * - Orquesta la eliminación de un usuario delegando la persistencia al puerto `UserRepository`.
 * - Aplica el principio de **Inversión de Dependencias (DIP)**:
 *   depende de la abstracción (`UserRepository`), no de una implementación concreta.
 *
 * @example
 * await deleteUserUseCase.execute('uuid-123');
 */
@Injectable()
export class DeleteUserUseCase {
  /**
   * @param repo - Puerto del repositorio de usuarios (inyectado vía token `USER_REPOSITORY`).
   */
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) {}

  /**
   * Ejecuta el caso de uso de eliminación de un usuario.
   *
   * @param id - Identificador único del usuario.
   * @returns Promesa que se resuelve cuando el usuario ha sido eliminado.
   */
  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
