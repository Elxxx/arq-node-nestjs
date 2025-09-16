// src/infrastructure/database/typeorm/entities/user/user.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { User } from '../../../../domain/entities/user/user.entity';

export const UserEntitySchema = new EntitySchema<User>({
  name: 'User',
  schema: 'authn',
  tableName: 'users',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    tenantId: { type: 'uuid', name: 'tenant_id' },
    email: { type: 'citext' }, // ⚠️ citext debe estar creado en DB
    firstName: { type: String, name: 'first_name' },
    lastName: { type: String, name: 'last_name' },
    phone: { type: String, nullable: true },
    departmentId: { type: 'uuid', name: 'department_id', nullable: true },
    roleId: { type: Number, name: 'role_id' },
    passwordHash: { type: String, name: 'password_hash' },
    active: { type: Boolean, default: true },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
    updatedAt: { type: 'timestamptz', name: 'updated_at', updateDate: true },
  },
  relations: {
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: { name: 'role_id' },
    },
    tenant: {
      type: 'many-to-one',
      target: 'Tenant',
      joinColumn: { name: 'tenant_id' },
    },
    department: {
      type: 'many-to-one',
      target: 'Department',
      joinColumn: { name: 'department_id' },
    },
  },
  indices: [
    { name: 'idx_users_tenant', columns: ['tenantId'] },
    { name: 'idx_users_department', columns: ['departmentId'] },
  ],
});
