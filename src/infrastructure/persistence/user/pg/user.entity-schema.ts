import { EntitySchema } from 'typeorm';
import { User } from '../../../../domain/entities/user/user.entity';

/**
 * UserEntitySchema
 *
 * @description
 * Mapeo de la entidad de dominio `User` a la tabla SQL `users`
 * usando TypeORM y su `EntitySchema`.
 *
 * @remarks
 * - Permite mantener la entidad de dominio libre de decoradores de TypeORM.
 * - Traduce los atributos del dominio a columnas de BD.
 */
export const UserEntitySchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
      name: 'created_at',
      createDate: true,
    },
    updatedAt: {
      type: Date,
      name: 'updated_at',
      updateDate: true,
    },
  },
});
