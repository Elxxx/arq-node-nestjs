import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { User } from '../../../domain/entities/user/user.entity';
import * as bcrypt from 'bcrypt';

/**
 * Caso de uso: Crear un nuevo usuario.
 *
 * @description
 * - Valida unicidad de email por tenant.
 * - Hashea la contraseña antes de persistir.
 * - Devuelve la entidad `User`.
 */
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // Validar unicidad por tenant
    const existing = await this.userRepo.findByEmailAndTenant(dto.email, dto.tenantId);
    if (existing) throw new BadRequestException('El correo ya está registrado en este tenant');

    // Hash de contraseña
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = new User({
      id: crypto.randomUUID(),
      tenantId: dto.tenantId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
      roleId: dto.roleId,
      departmentId: dto.departmentId,
      phone: dto.phone,
      active: true,
    });

    return this.userRepo.create(user);
  }
}
