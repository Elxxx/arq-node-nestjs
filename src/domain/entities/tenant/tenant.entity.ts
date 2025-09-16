/**
 * Entidad de dominio `Tenant`.
 *
 * @remarks
 * - POJO sin dependencias de NestJS ni de frameworks.
 * - Representa un cliente/empresa en el contexto multi-tenant.
 * - Solo contiene estado y reglas mínimas de inicialización.
 */
export class Tenant {
  /** Identificador único (UUID). */
  readonly id: string;

  /** Nombre visible del Tenant. */
  name: string;

  /** Identificador URL-safe único (ej: "acme-corp"). */
  slug: string;

  /** Plan contratado (ej: free, pro, enterprise). */
  plan: string;

  /** Estado activo/inactivo. */
  active: boolean;

  /** Fecha de creación (inmutable). */
  readonly createdAt: Date;

  /** Fecha de última actualización. */
  updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    slug: string;
    plan?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.plan = props.plan ?? 'free';
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
