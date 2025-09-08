import { AuthUser } from '../../entities/auth/auth-user.entity';

/**
 * Puerto: Contrato para autenticación.
 *
 * @remarks
 * - Define cómo se valida un usuario.
 * - Implementaciones concretas (JWT, OAuth, LDAP, etc.) deben cumplir este contrato.
 */
export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface AuthRepository {
  /**
   * Valida las credenciales del usuario contra el sistema configurado.
   *
   * @param userName - Nombre de usuario.
   * @param password - Contraseña en texto plano.
   * @param nombreSistema - Nombre del sistema desde el que se intenta autenticar.
   * @returns Entidad AuthUser si es válido, o null si las credenciales no coinciden.
   */
  validateUser(
    userName: string,
    password: string,
    nombreSistema: string,
  ): Promise<AuthUser | null>;
}
