import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthRepository } from '../../../domain/repositories/auth/auth.repository';
import { AuthUser } from '../../../domain/entities/auth/auth-user.entity';

/**
 * Adaptador de infraestructura para autenticación contra API externa.
 *
 * @description
 * Llama al endpoint externo `/v1/singleSignOn/signOn` para validar credenciales
 * y retorna el token entregado por dicho servicio.
 */
@Injectable()
export class ExternalAuthRepository implements AuthRepository {
  private lastToken: string | null = null; // Guarda el último token emitido por la API externa

  constructor(
    private readonly http: HttpService,

    @Inject('AUTH_API_URL')
    private readonly authApiUrl: string, // 👈 URL inyectada desde configuración
  ) {}

  /**
   * Valida credenciales contra el servicio externo.
   *
   * @param userName - Nombre de usuario
   * @param password - Contraseña
   * @param nombreSistema - Sistema desde el cual se solicita login
   * @returns Una entidad `AuthUser` si el login es exitoso, o `null` si falla
   */
  async validateUser(
    userName: string,
    password: string,
    nombreSistema: string,
  ): Promise<AuthUser | null> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.authApiUrl}/v1/singleSignOn/signOn`, {
          userName,
          password,
          nombreSistema,
        }),
      );

      const result = response.data?.result;
      if (result && result.user && result.token) {
        // ✅ Guardamos el token recibido
        this.lastToken = result.token;

        // ✅ Adaptamos usuario para respetar contrato
        return new AuthUser(
          String(result.user.id),
          result.user.userName,
          result.system?.name ?? nombreSistema,
          'external-auth-hash',
        );
      }

      return null;
    } catch (err) {
      console.error('Error en autenticación externa:', err);
      return null;
    }
  }

}
