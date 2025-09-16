import { Injectable } from '@nestjs/common';

/**
 * Caso de uso: Logout de usuario.
 *
 * @description
 * - Para JWT stateless no se "invalida" el token.
 * - Se puede implementar un blacklist en Redis/DB.
 */
@Injectable()
export class LogoutUseCase {
  async execute(token: string): Promise<{ success: boolean }> {
    // 👇 Aquí deberías guardar el token en un blacklist (ej. Redis) hasta que expire.
    // await redisClient.set(`blacklist:${token}`, 'true', 'EX', tokenExp);

    // Example usage to avoid unused variable error
    console.log(`Logging out token: ${token}`);

    return { success: true };
  }
}
