// src/infrastructure/persistence/role/pg/role.repository.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleRepository } from '../../../../../domain/repositories/user/role.repository';
import { Role } from '../../../../../domain/entities/user/role/role.entity';
import { RoleEntitySchema } from './role.entity-schema';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntitySchema)
    private readonly ormRepo: Repository<Role>,
  ) {}

  async create(role: Role): Promise<Role> {
    return await this.ormRepo.save(role);
  }

  async findById(id: number): Promise<Role | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.ormRepo.findOne({ where: { name } });
  }

  async findAll(): Promise<Role[]> {
    return await this.ormRepo.find();
  }

  async update(role: Role): Promise<Role> {
    await this.ormRepo.update(role.id, role);
    return (await this.findById(role.id))!;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepo.delete({ id });
  }
}
