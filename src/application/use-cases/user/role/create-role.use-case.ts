// src/application/use-cases/role/create-role.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Role } from '../../../../domain/entities/user/role/role.entity';
import { CreateRoleDto } from '../../../dto/user/role/create-role.dto';
import { RoleDomainService } from '../../../../domain/services/user/role/role.domain-service';
import {
  ROLE_REPOSITORY,
  RoleRepository,
} from '../../../../domain/repositories/user/role.repository';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private readonly domainService: RoleDomainService,
    @Inject(ROLE_REPOSITORY) private readonly repo: RoleRepository,
  ) {}

  async execute(input: CreateRoleDto): Promise<Role> {
    await this.domainService.ensureRoleNameIsUnique(input.name);
    const role = new Role({ id: 0, name: input.name, description: input.description });
    return this.repo.create(role);
  }
}
