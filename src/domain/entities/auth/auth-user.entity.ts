/**
 * Entidad de usuario autenticado.
 *
 * @remarks
 * Representa los datos mínimos de un usuario que puede autenticarse.
 */
export class AuthUser {
  constructor(
    public readonly id: string,
    public readonly userName: string,
    public readonly nombreSistema: string,
    public readonly passwordHash: string,
  ) {}
}
