// src/application/use-cases/role/delete-role.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import {
  ROLE_REPOSITORY,
  RoleRepository,
} from '../../../../domain/repositories/user/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(@Inject(ROLE_REPOSITORY) private readonly repo: RoleRepository) {}
  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
