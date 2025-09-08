import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '../../dto/user/create-user.dto';
import { User } from '../../../domain/entities/user/user.entity';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserDomainService } from '../../../domain/services/user/user.domain-service';

/**
 * Caso de uso: Crear usuario.
 *
 * @remarks
 * - Pertenece a la **Application Layer**.
 * - Orquesta entidades (`User`), reglas de negocio (`UserDomainService`)
 *   y persistencia (`UserRepository`).
 * - Aplica el principio **OCP (Open/Closed Principle)**:
 *   abierto a extender con nuevas reglas (ej. validaciones) sin modificar su contrato público.
 *
 * @example
 * const user = await createUserUseCase.execute({
 *   name: 'Ada Lovelace',
 *   email: 'ada@example.com'
 * });
 */
@Injectable()
export class CreateUserUseCase {
  /**
   * @param domainService - Servicio de dominio para validar reglas de negocio.
   * @param repo - Puerto del repositorio de usuarios (inyectado vía token `USER_REPOSITORY`).
   */
  constructor(
    private readonly domainService: UserDomainService,
    @Inject(USER_REPOSITORY) private readonly repo: UserRepository,
  ) {}

  /**
   * Ejecuta el caso de uso de creación de usuario.
   *
   * @param input - DTO con los datos de creación (`name`, `email`).
   * @returns Usuario creado.
   *
   * @throws {Error} Si el correo ya está en uso (validación de dominio).
   */
  async execute(input: CreateUserDto): Promise<User> {
    // Validación de dominio (email único)
    await this.domainService.ensureEmailIsUnique(input.email);

    // Construcción de entidad con UUID autogenerado
    const user = new User({
      id: uuidv4(),
      name: input.name,
      email: input.email,
    });

    // Persistencia a través del puerto de repositorio
    return this.repo.create(user);
  }
}
