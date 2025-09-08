import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/entities/user/user.entity';
import { UserRepository } from '../../../../domain/repositories/user/user.repository';

/**
 * Implementación en memoria del repositorio de usuarios.
 *
 * @remarks
 * - Es un **adaptador** concreto para el puerto `UserRepository`.
 * - Se usa principalmente para **testing**, desarrollo local o ejemplos.
 * - Los datos se almacenan en un `Map` en memoria, por lo que se pierden al reiniciar la app.
 *
 * @example
 * // En AppModule:
 * { provide: USER_REPOSITORY, useClass: InMemoryUserRepository }
 */
@Injectable()
export class InMemoryUserRepository implements UserRepository {
  /** Almacenamiento en memoria (clave = id de usuario). */
  private store = new Map<string, User>();

  /**
   * Crea un nuevo usuario y lo guarda en memoria.
   *
   * @param user - Entidad de usuario a guardar.
   * @returns Usuario creado.
   */
  async create(user: User): Promise<User> {
    this.store.set(user.id, user);
    return user;
  }

  /**
   * Busca un usuario por su ID.
   *
   * @param id - Identificador único del usuario.
   * @returns Usuario encontrado o `null` si no existe.
   */
  async findById(id: string): Promise<User | null> {
    return this.store.get(id) || null;
  }

  /**
   * Busca un usuario por su correo electrónico.
   *
   * @param email - Correo del usuario.
   * @returns Usuario encontrado o `null` si no existe.
   */
  async findByEmail(email: string): Promise<User | null> {
    for (const u of this.store.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  /**
   * Devuelve todos los usuarios registrados en memoria.
   *
   * @returns Lista de usuarios.
   */
  async findAll(): Promise<User[]> {
    return Array.from(this.store.values());
  }

  /**
   * Actualiza un usuario existente.
   *
   * @param user - Usuario con datos modificados.
   * @returns Usuario actualizado.
   */
  async update(user: User): Promise<User> {
    this.store.set(user.id, user);
    return user;
  }

  /**
   * Elimina un usuario por su ID.
   *
   * @param id - Identificador único del usuario.
   */
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
