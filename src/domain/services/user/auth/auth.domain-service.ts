import { Injectable } from '@nestjs/common';

/**
 * Servicio de dominio para reglas de negocio sobre autenticación.
 *
 * @remarks
 * - Aquí se validan invariantes y restricciones de negocio.
 * - Ejemplo: verificar políticas de contraseñas, validar acceso por sistema.
 */
@Injectable()
export class AuthDomainService {
  /**
   * Valida que la contraseña no sea vacía ni demasiado corta.
   *
   * @param password - Contraseña en texto plano.
   * @throws {Error} Si la contraseña no cumple las reglas.
   */
  ensureValidPassword(password: string): void {
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }
}
