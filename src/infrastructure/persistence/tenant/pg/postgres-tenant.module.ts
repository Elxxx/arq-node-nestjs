import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantEntitySchema } from './tenant.entity-schema';
import { TENANT_REPOSITORY } from '../../../../domain/repositories/tenant/tenant.repository';
import { TypeOrmTenantRepository } from '../pg/tenant.repository.typeorm';

/**
 * Módulo de persistencia para `Tenant` usando PostgreSQL + TypeORM.
 */
@Module({
  imports: [TypeOrmModule.forFeature([TenantEntitySchema])],
  providers: [
    { provide: TENANT_REPOSITORY, useClass: TypeOrmTenantRepository },
  ],
  exports: [TENANT_REPOSITORY],
})
export class PostgresTenantModule {}
