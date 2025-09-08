import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, AuthRepository } from '../../../domain/repositories/auth/auth.repository';
import { AuthDomainService } from '../../../domain/services/user/auth/auth.domain-service';
import { LoginDto } from '../../dto/auth/login.dto';
import { AuthUser } from '../../../domain/entities/auth/auth-user.entity';

/**
 * Caso de uso: Autenticación de usuario (sin emisión de token).
 *
 * @description
 * Orquesta el proceso de login siguiendo la Arquitectura Hexagonal:
 * 1. Valida reglas de negocio mediante `AuthDomainService`.
 * 2. Delegar la validación de credenciales al puerto `AuthRepository`
 *    (implementado por adaptadores externos como API externa, LDAP, etc.).
 * 3. Retorna la entidad `AuthUser` autenticada. **No emite ni devuelve token**.
 *
 * @usecase LoginUseCase
 *
 * @example
 * ```ts
 * const user = await loginUseCase.execute({
 *   userName: 'usuario1',
 *   password: 'secreto123',
 *   nombreSistema: 'Mi Sistema',
 * });
 * console.log(user); // instancia de AuthUser
 * ```
 */
@Injectable()
export class LoginUseCase {
  /**
   * @param authRepository - Puerto de autenticación (inyectado con `AUTH_REPOSITORY`).
   * @param domainService - Servicio de dominio con reglas de negocio relacionadas a autenticación.
   */
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
    private readonly domainService: AuthDomainService,
  ) {}

  /**
   * Ejecuta el caso de uso de autenticación (sin generación de token).
   *
   * @param input - DTO con las credenciales de autenticación (`LoginDto`).
   * @returns La entidad `AuthUser` autenticada si las credenciales son válidas.
   *
   * @throws {Error} Si las credenciales no cumplen las reglas de negocio
   *                 o si no son reconocidas por el proveedor de autenticación.
   */
  async execute(input: LoginDto): Promise<AuthUser> {
    // ✅ Validaciones de dominio (ej: longitud mínima de password)
    this.domainService.ensureValidPassword(input.password);

    // ✅ Validación contra el repositorio de autenticación (no se genera token)
    const user = await this.authRepository.validateUser(
      input.userName,
      input.password,
      input.nombreSistema,
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }
}
