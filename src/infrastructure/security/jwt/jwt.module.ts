import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth/auth.repository';
import { JwtAuthRepository } from './jwt-auth.repository';

/**
 * JwtModule
 *
 * @description
 * Módulo de infraestructura encargado de la autenticación basada en **JWT (JSON Web Token)**.
 * Implementa el puerto `AuthRepository` utilizando la librería `jsonwebtoken`.
 *
 * @features
 * - Inyecta dinámicamente la clave secreta de firma (`JWT_SECRET`) desde las variables de entorno
 *   gestionadas por `ConfigService`.
 * - Provee la implementación `JwtAuthRepository` como adaptador técnico
 *   para el contrato de autenticación (`AUTH_REPOSITORY`).
 *
 * @exports AUTH_REPOSITORY
 * El contrato de autenticación (`AuthRepository`) queda disponible para los casos de uso
 * de la capa de aplicación.
 *
 * @example
 * // En AppModule
 * @Module({
 *   imports: [JwtModule],
 * })
 * export class AppModule {}
 */
@Module({
  imports: [
    /**
     * ConfigModule expone variables de entorno a través de `ConfigService`.
     * Permite acceder a `jwt.secret` desde el archivo de configuración.
     */
    ConfigModule,
  ],
  providers: [
    /**
     * Proveedor que resuelve la clave secreta JWT.
     * Se inyecta en `JwtAuthRepository` bajo el token `JWT_SECRET`.
     */
    {
      provide: 'JWT_SECRET',
      useFactory: (config: ConfigService) => config.get<string>('jwt.secret'),
      inject: [ConfigService],
    },

    /**
     * Puerto de dominio `AUTH_REPOSITORY` implementado con JWT.
     * Permite validar credenciales y generar tokens firmados.
     */
    {
      provide: AUTH_REPOSITORY,
      useClass: JwtAuthRepository,
    },
  ],

  /**
   * Exporta el contrato de autenticación `AUTH_REPOSITORY`
   * para ser consumido por la capa de aplicación.
   */
  exports: [AUTH_REPOSITORY],
})
export class JwtModule {}
