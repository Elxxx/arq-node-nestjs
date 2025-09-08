import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth/auth.repository';
import { ExternalAuthRepository } from './external-auth.repository';

/**
 * ExternalAuthModule
 *
 * @description
 * Módulo de infraestructura encargado de la integración con un servicio de autenticación externo.
 * Implementa el contrato de `AuthRepository` usando `HttpService` para llamar a una API externa.
 *
 * @features
 * - Registra y expone el cliente HTTP (`HttpModule`) para realizar peticiones REST.
 * - Inyecta dinámicamente la URL base del servicio de autenticación externo (`AUTH_API_URL`)
 *   a partir de las variables de entorno gestionadas con `ConfigService`.
 * - Provee la implementación concreta `ExternalAuthRepository` para el puerto `AUTH_REPOSITORY`.
 *
 * @exports AUTH_REPOSITORY
 * El puerto de autenticación (`AuthRepository`) queda disponible para ser consumido
 * por casos de uso en la capa de aplicación.
 *
 * @example
 * // En AppModule
 * @Module({
 *   imports: [ExternalAuthModule],
 * })
 * export class AppModule {}
 */
@Module({
  imports: [
    /**
     * ConfigModule expone variables de entorno a través de `ConfigService`.
     * HttpModule habilita `HttpService` para realizar peticiones HTTP.
     */
    ConfigModule,
    HttpModule,
  ],
  providers: [
    /**
     * Proveedor que resuelve la URL del API externo de autenticación.
     * Se inyecta en `ExternalAuthRepository` bajo el token `AUTH_API_URL`.
     */
    {
      provide: 'AUTH_API_URL',
      useFactory: (config: ConfigService) => config.get<string>('auth.apiUrl'),
      inject: [ConfigService],
    },

    /**
     * Puerto de dominio `AUTH_REPOSITORY` implementado con API externa.
     * Permite validar credenciales de usuario delegando la lógica técnica
     * a `ExternalAuthRepository`.
     */
    {
      provide: AUTH_REPOSITORY,
      useClass: ExternalAuthRepository,
    },
  ],

  /**
   * Exporta el contrato `AUTH_REPOSITORY` para ser consumido en la capa de aplicación.
   */
  exports: [AUTH_REPOSITORY],
})
export class ExternalAuthModule {}
