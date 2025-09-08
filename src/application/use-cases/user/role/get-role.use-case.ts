// src/application/use-cases/role/get-role.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY, RoleRepository } from '../../../../domain/repositories/user/role.repository';

@Injectable()
export class GetRoleUseCase {
  constructor(@Inject(ROLE_REPOSITORY) private readonly repo: RoleRepository) {}

  async execute(id: number) {
    const role = await this.repo.findById(id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }
}
