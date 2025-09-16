import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { User } from '../../../domain/entities/user/user.entity';
import * as bcrypt from 'bcrypt';

/**
 * Caso de uso: Actualizar un usuario existente.
 */
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (dto.firstName) user.firstName = dto.firstName;
    if (dto.lastName) user.lastName = dto.lastName;
    if (dto.phone) user.phone = dto.phone;
    if (dto.departmentId) user.departmentId = dto.departmentId;
    if (dto.roleId) user.roleId = dto.roleId;
    if (dto.email) user.email = dto.email;
    if (dto.active !== undefined) user.active = dto.active;

    // Si viene password, actualizar hash
    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    return this.userRepo.update(user);
  }
}
