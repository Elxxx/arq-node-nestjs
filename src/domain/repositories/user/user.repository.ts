import { User } from '../../entities/user/user.entity';

/**
 * Token usado para inyección de dependencias.
 *
 * @remarks
 * - Se utiliza como identificador único para enlazar la interfaz
 *   `UserRepository` con su implementación concreta (ej: InMemory, TypeORM, Prisma).
 * - Garantiza el principio de **Inversión de Dependencias (D en SOLID)**.
 *
 * @example
 * // AppModule
 * {
 *   provide: USER_REPOSITORY,
 *   useClass: InMemoryUserRepository
 * }
 */
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

/**
 * Puerto del dominio: contrato del repositorio de usuarios.
 *
 * @remarks
 * - Define las operaciones necesarias para persistencia de usuarios.
 * - No tiene dependencias técnicas (base de datos, frameworks, etc.).
 * - Cada implementación concreta (adaptador) debe cumplir este contrato.
 *
 * @interface UserRepository
 */
export interface UserRepository {
  /**
   * Crea un nuevo usuario.
   * @param user - Entidad de usuario a persistir.
   * @returns Usuario creado.
   */
  create(user: User): Promise<User>;

  /**
   * Busca un usuario por ID.
   * @param id - Identificador único del usuario.
   * @returns Usuario encontrado o `null` si no existe.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Busca un usuario por correo electrónico.
   * @param email - Correo del usuario.
   * @returns Usuario encontrado o `null` si no existe.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Devuelve todos los usuarios registrados.
   * @returns Lista de usuarios.
   */
  findAll(): Promise<User[]>;

  /**
   * Actualiza un usuario existente.
   * @param user - Usuario con datos modificados.
   * @returns Usuario actualizado.
   */
  update(user: User): Promise<User>;

  /**
   * Elimina un usuario por su ID.
   * @param id - Identificador único del usuario.
   */
  delete(id: string): Promise<void>;
}
