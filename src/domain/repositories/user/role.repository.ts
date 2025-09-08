// src/domain/repositories/role/role.repository.ts
import { Role } from '../../entities/user/role/role.entity';

/**
 * Token para inyección de dependencias.
 */
export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

/**
 * Contrato del repositorio de roles.
 *
 * @remarks
 * - Define operaciones que cualquier implementación (TypeORM, Prisma, etc.) debe cumplir.
 */
export interface RoleRepository {
  /**
   * Crea un nuevo rol.
   * @param role - Rol a persistir.
   * @returns Rol creado.
   */
  create(role: Role): Promise<Role>;

  /**
   * Busca un rol por su ID.
   * @param id - Identificador único.
   * @returns Rol encontrado o `null` si no existe.
   */
  findById(id: number): Promise<Role | null>;

  /**
   * Busca un rol por su nombre.
   * @param name - Nombre del rol.
   * @returns Rol encontrado o `null` si no existe.
   */
  findByName(name: string): Promise<Role | null>;

  /**
   * Lista todos los roles disponibles.
   * @returns Lista de roles.
   */
  findAll(): Promise<Role[]>;

  /**
   * Actualiza un rol existente.
   * @param role - Rol con datos actualizados.
   * @returns Rol actualizado.
   */
  update(role: Role): Promise<Role>;

  /**
   * Elimina un rol por ID.
   * @param id - Identificador único.
   */
  delete(id: number): Promise<void>;
}
