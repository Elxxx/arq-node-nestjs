import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentEntitySchema } from '../../department/pg/department.entity-schema';
import { TenantEntitySchema } from '../../tenant/pg/tenant.entity-schema';
import { RoleEntitySchema } from './role.entity-schema';
import { UserEntitySchema } from './user.entity-schema';
import { TypeOrmUserRepository } from './user.repository.typeorm';

import { USER_REPOSITORY } from '../../../../domain/repositories/user/user.repository';

/**
 * Módulo de infraestructura para la entidad `User`.
 *
 * - Registra el repositorio TypeORM.
 * - Expone el puerto `UserRepository` al resto de la app.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntitySchema,
      RoleEntitySchema,
      TenantEntitySchema,
      DepartmentEntitySchema,
    ]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class PostgresUserModule {}
