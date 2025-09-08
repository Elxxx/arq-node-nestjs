import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { USER_REPOSITORY } from '../../../../domain/repositories/user/user.repository';
import { UserEntitySchema } from './user.entity-schema';
import { TypeOrmUserRepository } from './user.repository.typeorm';

/**
 * PostgresUserModule
 *
 * @description
 * Configura y expone el adaptador de persistencia de `UserRepository`
 * usando PostgreSQL + TypeORM.
 *
 * @features
 * - Registro de entidad `UserEntitySchema`.
 * - Configuración inyectada desde `ConfigService`.
 * - Exporta el token `USER_REPOSITORY` enlazado a `TypeOrmUserRepository`.
 *
 * @pattern Module + Adapter (Hexagonal Architecture)
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntitySchema]),
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
