import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../../dto/user/create-user.dto';
import { User } from '../../../domain/entities/user/user.entity';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserDomainService } from '../../../domain/services/user/user.domain-service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly domainService: UserDomainService,
    @Inject(USER_REPOSITORY) private readonly repo: UserRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<User> {
    await this.domainService.ensureEmailIsUnique(input.email);

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = new User({
      id: uuidv4(),
      firstName: input.firstName,
      middleName: input.middleName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      countryCode: input.countryCode,
      passwordHash,
      active: input.active ?? false,
      roleId: input.roleId,
    });

    return this.repo.create(user);
  }
}
