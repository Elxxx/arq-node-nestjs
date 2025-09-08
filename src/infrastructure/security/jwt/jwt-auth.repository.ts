import { Injectable, Inject } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { AuthRepository } from '../../../domain/repositories/auth/auth.repository';
import { AuthUser } from '../../../domain/entities/auth/auth-user.entity';

/**
 * Adaptador de infraestructura para autenticación con **JWT (JSON Web Token)**.
 *
 * @description
 * Implementa el contrato `AuthRepository` utilizando la librería `jsonwebtoken`.
 * Se encarga de validar credenciales (mock en este ejemplo) y generar tokens JWT firmados
 * con la clave secreta inyectada desde `JwtModule`.
 *
 * @implements {AuthRepository}
 */
@Injectable()
export class JwtAuthRepository implements AuthRepository {
  /**
   * @param jwtSecret - Clave secreta usada para firmar los JWT.
   *   Se inyecta dinámicamente desde las variables de entorno a través de `JwtModule`.
   */
  constructor(@Inject('JWT_SECRET') private readonly jwtSecret: string) {}

  /**
   * Valida las credenciales de un usuario.
   *
   * @remarks
   * - Actualmente implementa una validación **hardcodeada** como ejemplo.
   * - En un entorno real, se debería validar contra una base de datos
   *   o un proveedor de identidad externo.
   *
   * @param userName - Nombre de usuario.
   * @param password - Contraseña del usuario.
   * @param nombreSistema - Identificador del sistema solicitante.
   * @returns Una instancia de `AuthUser` si las credenciales son válidas, o `null` en caso contrario.
   *
   * @example
   * ```ts
   * const user = await jwtAuthRepo.validateUser('userName', 'secreto123', 'Nombre Sistema');
   * console.log(user?.id); // "1"
   * ```
   */
  async validateUser(
    userName: string,
    password: string,
    nombreSistema: string,
  ): Promise<AuthUser | null> {
    if (
      userName === 'userName' &&
      password === 'secreto123' &&
      nombreSistema === 'Nombre Sistema'
    ) {
      return new AuthUser('1', userName, nombreSistema, 'hashed-password');
    }
    return null;
  }

  /**
   * Genera un token JWT firmado para un usuario autenticado.
   *
   * @param user - Entidad de dominio `AuthUser` con la información del usuario.
   * @returns Token JWT firmado como `string`.
   *
   * @example
   * ```ts
   * const token = await jwtAuthRepo.generateToken(authUser);
   * console.log(token); // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   * ```
   */
  async generateToken(user: AuthUser): Promise<string> {
    const payload = {
      sub: user.id,
      userName: user.userName,
      nombreSistema: user.nombreSistema,
    };

    const options: SignOptions = { expiresIn: '1h' };

    return sign(payload, this.jwtSecret, options);
  }
}
