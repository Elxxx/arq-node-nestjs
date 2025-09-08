import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { UpdateUserDto } from '../../dto/user/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) {}

  async execute(id: string, input: UpdateUserDto) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (input.firstName) user.firstName = input.firstName;
    if (input.middleName !== undefined) user.middleName = input.middleName;
    if (input.lastName) user.lastName = input.lastName;
    if (input.email) user.email = input.email;
    if (input.phone) user.phone = input.phone;
    if (input.countryCode) user.countryCode = input.countryCode;
    if (input.roleId) user.roleId = input.roleId;
    if (input.active !== undefined) user.active = input.active;

    if (input.password) {
      user.passwordHash = await bcrypt.hash(input.password, 10);
    }

    user.updatedAt = new Date();

    return this.repo.update(user);
  }
}
