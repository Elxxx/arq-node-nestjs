// src/domain/entities/role/role.entity.ts

/**
 * Entidad de dominio `Role`.
 *
 * @remarks
 * - Representa un rol de usuario dentro del sistema (ej. Admin, User, etc.).
 * - Es un POJO sin dependencias externas.
 */
export class Role {
  /** Identificador único del rol (autoincremental en DB). */
  readonly id: number;

  /** Nombre corto del rol (ej: "ADMIN", "USER"). */
  name: string;

  /** Descripción opcional del rol. */
  description?: string;

  constructor(props: { id: number; name: string; description?: string }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
  }
}
