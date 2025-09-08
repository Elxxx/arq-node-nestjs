import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { UpdateUserDto } from '../../dto/user/update-user.dto';

/**
 * Caso de uso: Actualizar un usuario.
 *
 * @remarks
 * - Pertenece a la **Application Layer**.
 * - Encapsula la lógica para modificar datos de un usuario existente.
 * - Aplica **DIP (Dependency Inversion Principle)**: depende de la abstracción `UserRepository`.
 * - Maneja reglas básicas de actualización como timestamps (`updatedAt`).
 *
 * @example
 * const updated = await updateUserUseCase.execute('uuid-123', { name: 'Ada L.' });
 * console.log(updated.name); // "Ada L."
 */
@Injectable()
export class UpdateUserUseCase {
  /**
   * @param repo - Puerto del repositorio de usuarios (inyectado vía token `USER_REPOSITORY`).
   */
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) {}

  /**
   * Ejecuta el caso de uso de actualización de usuario.
   *
   * @param id - Identificador único del usuario a actualizar.
   * @param input - DTO con los campos opcionales a modificar.
   * @returns Usuario actualizado.
   *
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async execute(id: string, input: UpdateUserDto) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Actualización condicional de propiedades
    if (input.name) user.name = input.name;
    if (input.email) user.email = input.email;

    // Refrescar fecha de última modificación
    user.updatedAt = new Date();

    return this.repo.update(user);
  }
}
