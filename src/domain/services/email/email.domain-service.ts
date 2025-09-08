import { Injectable } from '@nestjs/common';

/**
 * Servicio de dominio para reglas de negocio sobre correos.
 *
 * @remarks
 * - Aquí se validan invariantes y restricciones de negocio
 *   relacionadas con envío de emails (no técnicas).
 * - Ejemplo: validar formato de email, evitar dominios bloqueados.
 */
@Injectable()
export class EmailDomainService {
  /**
   * Verifica que el correo tenga un formato válido.
   *
   * @param email - Dirección de correo a validar.
   * @throws {Error} Si el email no es válido.
   */
  ensureValidEmailFormat(email: string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error(`El correo ${email} no tiene un formato válido`);
    }
  }

  /**
   * Verifica que el dominio del correo no esté bloqueado.
   *
   * @param email - Dirección de correo a validar.
   * @param blockedDomains - Lista de dominios no permitidos.
   * @throws {Error} Si el dominio está bloqueado.
   */
  ensureDomainNotBlocked(email: string, blockedDomains: string[]): void {
    const domain = email.split('@')[1];
    if (blockedDomains.includes(domain)) {
      throw new Error(`El dominio ${domain} está bloqueado para envío de correos`);
    }
  }
}
