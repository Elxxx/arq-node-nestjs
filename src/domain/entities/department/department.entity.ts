import { Tenant } from '../tenant/tenant.entity';

// src/domain/entities/department/department.entity.ts
/**
 * Entidad de dominio `Department`.
 *
 * - Pertenece a un `Tenant` (multi-tenant).
 * - Relaciona usuarios con una unidad organizacional.
 */
export class Department {
  readonly id: string;
  readonly tenantId: string;

  name: string;
  code?: string;

  tenant?: Tenant;

  readonly createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: string;
    tenantId: string;
    name: string;
    code?: string;
    createdAt?: Date;
    updatedAt?: Date;
    tenant?: Tenant;
  }) {
    this.id = props.id;
    this.tenantId = props.tenantId;
    this.name = props.name;
    this.code = props.code;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.tenant = props.tenant;
  }
}
