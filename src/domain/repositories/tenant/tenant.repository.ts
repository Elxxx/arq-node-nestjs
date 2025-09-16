import { Tenant } from '../../entities/tenant/tenant.entity';

/** Token DI para enlazar puerto ↔ adaptador. */
export const TENANT_REPOSITORY = Symbol('TENANT_REPOSITORY');

/**
 * Puerto del dominio: contrato del repositorio de `Tenant`.
 *
 * @remarks
 * - Define las operaciones necesarias para persistir Tenants.
 * - No incluye detalles técnicos (DB/ORM).
 */
export interface TenantRepository {
  create(tenant: Tenant): Promise<Tenant>;
  update(tenant: Tenant): Promise<Tenant>;
  findById(id: string): Promise<Tenant | null>;
  findBySlug(slug: string): Promise<Tenant | null>;
  findAll(): Promise<Tenant[]>;
  delete(id: string): Promise<void>;
}
