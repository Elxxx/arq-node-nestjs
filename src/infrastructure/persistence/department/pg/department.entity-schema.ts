// src/infrastructure/database/typeorm/entities/department/department.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { Department } from '../../../../domain/entities/department/department.entity';

export const DepartmentEntitySchema = new EntitySchema<Department>({
  name: 'Department',
  schema: 'org',
  tableName: 'departments',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    tenantId: { type: 'uuid', name: 'tenant_id' },
    name: { type: 'text' },
    code: { type: 'text', nullable: true },
    createdAt: { type: 'timestamptz', name: 'created_at', createDate: true },
    updatedAt: { type: 'timestamptz', name: 'updated_at', updateDate: true },
  },
  relations: {
    tenant: {   // 👈 debe coincidir con la propiedad de tu entidad de dominio
      type: 'many-to-one',
      target: 'Tenant',          // 👈 entidad destino
      joinColumn: { name: 'tenant_id' },
    },
  },
  indices: [
    { name: 'idx_departments_tenant', columns: ['tenantId'] },
  ],
});
