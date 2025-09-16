// src/domain/entities/user/user.entity.ts
import { Department } from '../department/department.entity';
import { Role } from '../role/role.entity';
import { Tenant } from '../tenant/tenant.entity';

/**
 * Entidad de dominio `User`
 *
 * - Representa un usuario dentro del sistema.
 * - No depende de TypeORM ni NestJS.
 */
export class User {
  readonly id: string;
  tenantId: string;
  roleId: number;
  departmentId?: string;

  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  passwordHash: string;
  active: boolean;

  readonly createdAt: Date;
  updatedAt: Date;

  // Campos enriquecidos (JOINs, no siempre presentes)
  roleName?: string;
  tenantName?: string;
  departmentName?: string;

  // Relaciones (cargadas bajo demanda)
  role?: Role;
  tenant?: Tenant;
  department?: Department;

  constructor(props: {
    id: string;
    tenantId: string;
    roleId: number;
    departmentId?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    passwordHash: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    roleName?: string;
    tenantName?: string;
    departmentName?: string;
    role?: Role;
    tenant?: Tenant;
    department?: Department;
  }) {
    this.id = props.id;
    this.tenantId = props.tenantId;
    this.roleId = props.roleId;
    this.departmentId = props.departmentId;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.phone = props.phone;
    this.passwordHash = props.passwordHash;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.roleName = props.roleName;
    this.tenantName = props.tenantName;
    this.departmentName = props.departmentName;
    this.role = props.role;
    this.tenant = props.tenant;
    this.department = props.department;
  }

  activate(): void {
    this.active = true;
    this.touch();
  }

  deactivate(): void {
    this.active = false;
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
