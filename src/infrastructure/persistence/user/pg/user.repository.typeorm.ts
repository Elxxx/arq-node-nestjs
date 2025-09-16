import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { UserRepository } from '../../../../domain/repositories/user/user.repository';
import { User } from '../../../../domain/entities/user/user.entity';
import { UserEntitySchema } from './user.entity-schema';
import { RoleEntitySchema } from './role.entity-schema';
import { TenantEntitySchema } from '../../tenant/pg/tenant.entity-schema';

import { UserRaw } from './types/user-raw.interface';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntitySchema)
    private readonly ormRepo: Repository<User>,
  ) {}

  /** Mapea el resultado crudo a entidad de dominio */
  private toDomain(raw: UserRaw): User {
    return new User({
      id: raw.u_id ?? raw.id,
      tenantId: raw.u_tenant_id ?? raw.tenantId,
      email: raw.u_email ?? raw.email,
      firstName: raw.u_first_name ?? raw.firstName,
      lastName: raw.u_last_name ?? raw.lastName,
      phone: raw.u_phone ?? raw.phone,
      departmentId: raw.u_department_id ?? raw.departmentId,
      roleId: raw.u_role_id ?? raw.roleId,
      passwordHash: raw.u_password_hash ?? raw.passwordHash,
      active: raw.u_active ?? raw.active,
      createdAt: raw.u_created_at ?? raw.createdAt,
      updatedAt: raw.u_updated_at ?? raw.updatedAt,
      roleName: raw.role_name ?? undefined,
      tenantName: raw.tenant_name ?? undefined,
    });
  }

  private baseQB(alias = 'u'): SelectQueryBuilder<User> {
    return this.ormRepo.createQueryBuilder(alias);
  }

  /** JOIN roles + tenants usando esquema explícito */
  private withNames(qb: SelectQueryBuilder<User>, alias = 'u') {
    return qb
      .leftJoin(RoleEntitySchema.options.name, 'r', `r.id = ${alias}.roleId`)
      .leftJoin(TenantEntitySchema.options.name, 't', `t.id = ${alias}.tenantId`)
      .addSelect(['r.name AS role_name', 't.name AS tenant_name']);
  }

  async create(user: User): Promise<User> {
    const saved = await this.ormRepo.save(user);
    const qb = this.withNames(this.baseQB().where('u.id = :id', { id: saved.id }));
    const raw = await qb.getRawOne();
    return this.toDomain({ ...saved, ...raw });
  }

  async findById(id: string): Promise<User | null> {
    const qb = this.withNames(this.baseQB().where('u.id = :id', { id }));
    const raw = await qb.getRawOne();
    return raw ? this.toDomain(raw) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const qb = this.withNames(this.baseQB().where('u.email = :email', { email }));
    const raw = await qb.getRawOne();
    return raw ? this.toDomain(raw) : null;
  }

  async findByEmailAndTenant(email: string, tenantId: string): Promise<User | null> {
    const qb = this.withNames(
      this.baseQB().where('u.email = :email AND u.tenant_id = :tenantId', {
        email,
        tenantId,
      }),
    ).addSelect('u.passwordHash');
    const raw = await qb.getRawOne();
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<User[]> {
    const qb = this.withNames(this.baseQB());
    const raws = await qb.getRawMany();
    return raws.map((r) => this.toDomain(r));
  }

  async findAllByTenant(tenantId: string): Promise<User[]> {
    const qb = this.withNames(this.baseQB().where('u.tenant_id = :tenantId', { tenantId }));
    const raws = await qb.getRawMany();
    return raws.map((r) => this.toDomain(r));
  }

  async update(user: User): Promise<User> {
    await this.ormRepo.update(user.id, {
      tenantId: user.tenantId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      departmentId: user.departmentId,
      roleId: user.roleId,
      passwordHash: user.passwordHash,
      active: user.active,
      updatedAt: user.updatedAt,
    });

    const qb = this.withNames(this.baseQB().where('u.id = :id', { id: user.id }));
    const raw = await qb.getRawOne<UserRaw>();
    if (!raw) throw new Error('Usuario no encontrado después de actualizar');
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
