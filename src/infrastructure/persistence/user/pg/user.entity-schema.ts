// src/infrastructure/persistence/typeorm/user.entity-schema.ts
import { EntitySchema } from 'typeorm';
import { User } from '../../../../domain/entities/user/user.entity';

/**
 * UserEntitySchema
 *
 * @description
 * Mapeo de la entidad de dominio `User` a la tabla SQL `users`
 * usando TypeORM y `EntitySchema`.
 *
 * @remarks
 * - Mantiene la entidad de dominio libre de decoradores.
 * - Traduce atributos del dominio a columnas en BD.
 */
export const UserEntitySchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  schema: 'usuarios',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    firstName: {
      type: String,
      name: 'first_name',
      length: 100,
    },
    middleName: {
      type: String,
      name: 'middle_name',
      length: 100,
      nullable: true,
    },
    lastName: {
      type: String,
      name: 'last_name',
      length: 100,
    },
    email: {
      type: String,
      unique: true,
      length: 255,
    },
    phone: {
      type: String,
      length: 20,
      nullable: true,
    },
    countryCode: {
      type: String,
      name: 'country_code',
      length: 2,
      nullable: true,
    },
    passwordHash: {
      type: String,
      name: 'password',
      length: 255,
    },
    active: {
      type: Boolean,
      default: false,
    },
    roleId: {
      type: Number,
      name: 'role_id',
    },
    createdAt: {
      type: 'timestamptz',
      name: 'created_at',
      createDate: true,
      default: () => 'now()',
    },
    updatedAt: {
      type: 'timestamptz',
      name: 'updated_at',
      updateDate: true,
      default: () => 'now()',
    },
  },
});
