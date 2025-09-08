import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepository } from '../../../../domain/repositories/user/user.repository';
import { User } from '../../../../domain/entities/user/user.entity';
import { UserEntitySchema } from './user.entity-schema';

/**
 * Adaptador PostgreSQL con TypeORM para `UserRepository`.
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
    const entity = await this.ormRepo
      .createQueryBuilder('user')
      .leftJoin('roles', 'role', 'role.id = user.role_id')
      .addSelect(['role.name'])
      .where('user.id = :id', { id })
      .getRawOne();

    if (!entity) return null;

    return new User({
      id: entity.user_id,
      firstName: entity.user_first_name,
      middleName: entity.user_middle_name,
      lastName: entity.user_last_name,
      email: entity.user_email,
      phone: entity.user_phone,
      countryCode: entity.user_country_code,
      passwordHash: entity.user_password,
      active: entity.user_active,
      roleId: entity.user_role_id,
      roleName: entity.role_name, // ✅ aquí traemos el nombre del rol
      createdAt: entity.user_created_at,
      updatedAt: entity.user_updated_at,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.ormRepo
      .createQueryBuilder('user')
      .leftJoin('roles', 'role', 'role.id = user.role_id')
      .addSelect(['role.name'])
      .where('user.email = :email', { email })
      .getRawOne();

    if (!entity) return null;

    return new User({
      id: entity.user_id,
      firstName: entity.user_first_name,
      middleName: entity.user_middle_name,
      lastName: entity.user_last_name,
      email: entity.user_email,
      phone: entity.user_phone,
      countryCode: entity.user_country_code,
      passwordHash: entity.user_password,
      active: entity.user_active,
      roleId: entity.user_role_id,
      roleName: entity.role_name,
      createdAt: entity.user_created_at,
      updatedAt: entity.user_updated_at,
    });
  }

  async findAll(): Promise<User[]> {
    const entities = await this.ormRepo
      .createQueryBuilder('user')
      .leftJoin('roles', 'role', 'role.id = user.role_id')
      .addSelect(['role.name'])
      .getRawMany();

    return entities.map(
      (entity) =>
        new User({
          id: entity.user_id,
          firstName: entity.user_first_name,
          middleName: entity.user_middle_name,
          lastName: entity.user_last_name,
          email: entity.user_email,
          phone: entity.user_phone,
          countryCode: entity.user_country_code,
          passwordHash: entity.user_password,
          active: entity.user_active,
          roleId: entity.user_role_id,
          roleName: entity.role_name,
          createdAt: entity.user_created_at,
          updatedAt: entity.user_updated_at,
        }),
    );
  }

  async update(user: User): Promise<User> {
    await this.ormRepo.update(user.id, user);
    return (await this.findById(user.id))!;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
