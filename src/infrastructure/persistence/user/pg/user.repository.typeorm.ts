import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepository } from '../../../../domain/repositories/user/user.repository';
import { User } from '../../../../domain/entities/user/user.entity';
import { UserEntitySchema } from './user.entity-schema';

/**
 * Adaptador PostgreSQL con TypeORM para `UserRepository`.
 *
 * @description
 * Implementación del puerto `UserRepository` usando `typeorm` sobre PostgreSQL.
 * 
 * @pattern Adapter (Hexagonal Architecture)
 * Traduce operaciones del dominio a queries SQL.
 */
@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntitySchema)
    private readonly ormRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.ormRepo.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.ormRepo.find();
  }

  async update(user: User): Promise<User> {
    await this.ormRepo.update(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
