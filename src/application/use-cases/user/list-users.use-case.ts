import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { User } from '../../../domain/entities/user/user.entity';

/**
 * Caso de uso: Listar usuarios de un tenant.
 */
@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  async execute(tenantId?: string): Promise<User[]> {
    if (tenantId) {
      return this.userRepo.findAllByTenant(tenantId);
    }
    return this.userRepo.findAll();
  }
}
