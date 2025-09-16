export interface UserRaw {
  u_id: string;
  u_tenant_id: string;
  u_email: string;
  u_first_name: string;
  u_last_name: string;
  u_phone?: string;
  u_department_id?: string;
  u_role_id: number;
  u_password_hash: string;
  u_active: boolean;
  u_created_at: Date;
  u_updated_at: Date;
  role_name?: string;
  tenant_name?: string;
  id?: string;
  tenantId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  departmentId?: string;
  roleId?: number;
  passwordHash?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
