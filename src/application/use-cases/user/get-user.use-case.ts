import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';

/**
 * Caso de uso: Obtener un usuario por su ID.
 *
 * @remarks
 * - Pertenece a la **Application Layer**.
 * - Encapsula la lógica para buscar un usuario en el sistema.
 * - Si el usuario no existe, lanza una excepción `NotFoundException` (propia de NestJS).
 * - Aplica **DIP (Dependency Inversion Principle)**: depende del contrato `UserRepository`.
 *
 * @example
 * try {
 *   const user = await getUserUseCase.execute('uuid-123');
 *   console.log(user.name);
 * } catch (e) {
 *   if (e instanceof NotFoundException) {
 *     console.error('Usuario no encontrado');
 *   }
 * }
 */
@Injectable()
export class GetUserUseCase {
  /**
   * @param repo - Puerto del repositorio de usuarios (inyectado vía token `USER_REPOSITORY`).
   */
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) {}

  /**
   * Ejecuta el caso de uso para obtener un usuario por ID.
   *
   * @param id - Identificador único del usuario.
   * @returns El usuario correspondiente al ID.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async execute(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
