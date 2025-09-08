// src/infrastructure/persistence/role/pg/postgres-role.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ROLE_REPOSITORY } from '../../../../../domain/repositories/user/role.repository';
import { RoleEntitySchema } from './role.entity-schema';
import { TypeOrmRoleRepository } from './role.repository.typeorm';

/**
 * PostgresRoleModule
 *
 * Configura y expone el adaptador de persistencia de `RoleRepository`
 * usando PostgreSQL + TypeORM.
 */
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([RoleEntitySchema])],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: TypeOrmRoleRepository,
    },
  ],
  exports: [ROLE_REPOSITORY],
})
export class PostgresRoleModule {}
