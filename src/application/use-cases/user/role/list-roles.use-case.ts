// src/application/use-cases/role/list-roles.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY, RoleRepository } from '../../../../domain/repositories/user/role.repository';

@Injectable()
export class ListRolesUseCase {
  constructor(@Inject(ROLE_REPOSITORY) private readonly repo: RoleRepository) {}
  execute() {
    return this.repo.findAll();
  }
}
