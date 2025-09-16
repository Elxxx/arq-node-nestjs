import { User } from '../../entities/user/user.entity';

/**
 * Token de inyección de dependencias para `UserRepository`.
 *
 * Se usa en los casos de uso y servicios de dominio.
 */
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

/**
 * Repositorio de dominio para `User`.
 *
 * @description
 * Define las operaciones que cualquier implementación de persistencia
 * (ej: PostgreSQL, MongoDB, memoria) debe cumplir para manejar usuarios.
 *
 * @pattern Repository (DDD)
 */
export interface UserRepository {
  /**
   * Crear un nuevo usuario.
   *
   * @param user - Entidad `User` a persistir.
   * @returns Usuario creado.
   */
  create(user: User): Promise<User>;

  /**
   * Actualizar un usuario existente.
   *
   * @param user - Entidad `User` con cambios.
   * @returns Usuario actualizado.
   */
  update(user: User): Promise<User>;

  /**
   * Eliminar un usuario por ID.
   *
   * @param id - Identificador del usuario.
   */
  delete(id: string): Promise<void>;

  /**
   * Buscar un usuario por ID.
   *
   * @param id - Identificador único.
   * @returns Usuario encontrado o `null`.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Buscar un usuario por correo electrónico.
   *
   * @param email - Email único.
   * @returns Usuario encontrado o `null`.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Listar todos los usuarios.
   *
   * @returns Lista de usuarios.
   */
  findAll(): Promise<User[]>;

  /**
   * Listar todos los usuarios de un tenant.
   *
   * @param tenantId - Identificador del tenant.
   * @returns Lista de usuarios.
   */
  findByEmailAndTenant(email: string, tenantId: string): Promise<User | null>;

  /**
   * Listar todos los usuarios de un tenant.
   * @param tenantId - Identificador del tenant.
   * @returns Lista de usuarios.
   */
  findAllByTenant(tenantId: string): Promise<User[]>;
}
