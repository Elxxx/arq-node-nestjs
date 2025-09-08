// src/application/use-cases/role/update-role.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UpdateRoleDto } from '../../../dto/user/role/update-role.dto';
import {
  ROLE_REPOSITORY,
  RoleRepository,
} from '../../../../domain/repositories/user/role.repository';

@Injectable()
export class UpdateRoleUseCase {
  constructor(@Inject(ROLE_REPOSITORY) private readonly repo: RoleRepository) {}

  async execute(id: number, input: UpdateRoleDto) {
    const role = await this.repo.findById(id);
    if (!role) throw new NotFoundException('Role not found');

    if (input.name) role.name = input.name;
    if (input.description !== undefined) role.description = input.description;

    return this.repo.update(role);
  }
}
