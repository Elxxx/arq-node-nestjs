// src/infrastructure/database/typeorm/entities/tenant/tenant.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { Tenant } from '../../../../domain/entities/tenant/tenant.entity';

/**
 * EntitySchema de `Tenant` → core.tenants
 */
export const TenantEntitySchema = new EntitySchema<Tenant>({
  name: 'Tenant',
  schema: 'core',
  tableName: 'tenants',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      // La tabla ya define DEFAULT gen_random_uuid(); no generamos desde ORM
    },
    name: { type: 'text' },
    slug: { type: 'text', unique: true },
    plan: { type: 'text', default: 'free' },
    active: { type: Boolean, default: true },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
    updatedAt: { type: 'timestamptz', name: 'updated_at', updateDate: true },
  },
  indices: [
    // El unique de slug ya existe en DB (core.tenants_slug_key), no se replica aquí
  ],
});
