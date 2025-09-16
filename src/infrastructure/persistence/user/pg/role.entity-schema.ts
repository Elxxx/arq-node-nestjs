// src/infrastructure/database/typeorm/entities/role/role.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { Role } from '../../../../domain/entities/role/role.entity';

/**
 * EntitySchema de `Role` → authn.roles
 */
export const RoleEntitySchema = new EntitySchema<Role>({
  name: 'Role',
  schema: 'authn',
  tableName: 'roles',
  columns: {
    id: { type: Number, primary: true, generated: 'increment' },
    // Mapea a public.role_kind (enum ya existente en la BD)
    name: {
      type: 'enum',
      enumName: 'role_kind',             // nombre del tipo enum en Postgres
      enum: ['PLATFORM_SUPER_ADMIN', 'TENANT_ADMIN', 'TENANT_OPERATOR'], // valores esperados
    },
    tenantScoped: { type: Boolean, name: 'tenant_scoped', default: true },
  },
  indices: [
    // El unique (name, tenant_scoped) ya existe en DB: roles_name_tenant_scoped_key
  ],
});
