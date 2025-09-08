// src/infrastructure/persistence/role/pg/role.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { Role } from '../../../../../domain/entities/user/role/role.entity';

export const RoleEntitySchema = new EntitySchema<Role>({
  name: 'Role',
  tableName: 'roles',
  schema: 'usuarios',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    name: {
      type: String,
      unique: true,
      length: 50,
    },
    description: {
      type: String,
      nullable: true,
    },
  },
});
