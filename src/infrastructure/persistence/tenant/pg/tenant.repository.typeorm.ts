import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TenantRepository } from '../../../../domain/repositories/tenant/tenant.repository';
import { Tenant } from '../../../../domain/entities/tenant/tenant.entity';
import { TenantEntitySchema } from './tenant.entity-schema';

/**
 * Adaptador TypeORM (PostgreSQL) para `TenantRepository`.
 */
@Injectable()
export class TypeOrmTenantRepository implements TenantRepository {
  constructor(
    @InjectRepository(TenantEntitySchema)
    private readonly ormRepo: Repository<Tenant>,
  ) {}

  create(tenant: Tenant): Promise<Tenant> {
    return this.ormRepo.save(tenant);
  }

  update(tenant: Tenant): Promise<Tenant> {
    return this.ormRepo.save(tenant);
  }

  findById(id: string): Promise<Tenant | null> {
    return this.ormRepo.findOne({ where: { id } });
  }

  findBySlug(slug: string): Promise<Tenant | null> {
    return this.ormRepo.findOne({ where: { slug } });
  }

  findAll(): Promise<Tenant[]> {
    return this.ormRepo.find();
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
