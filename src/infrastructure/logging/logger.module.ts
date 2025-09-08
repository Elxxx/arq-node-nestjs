import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

/**
 * Módulo de logging centralizado.
 *
 * @remarks
 * - Configura **Pino** como logger estructurado usando `nestjs-pino`.
 * - Obtiene la configuración de nivel de logs desde variables de entorno (`LOG_LEVEL`).
 * - En desarrollo activa `pino-pretty` para mostrar logs legibles en consola.
 * - En producción usa salida JSON estructurada (ideal para observabilidad).
 * - Incluye `requestId` y contexto `HTTP` en cada log para trazabilidad.
 *
 * @example
 * // Ejemplo de log generado
 * {
 *   "level": "info",
 *   "time": "2025-08-20T20:20:00.000Z",
 *   "context": "HTTP",
 *   "requestId": "abc-123",
 *   "msg": "Request completed"
 * }
 */
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          // Nivel de logs configurable por env (ej: debug, info, warn, error)
          level: config.get<string>('logger.level') || 'info',
          // Auto logging de todas las solicitudes HTTP
          autoLogging: true,
          // En desarrollo usa pino-pretty para formato legible
          transport:
            process.env.NODE_ENV !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                  },
                }
              : undefined,
          // Props personalizadas en cada log
          customProps: (req) => ({ context: 'HTTP', requestId: req.id }),
        },
      }),
    }),
  ],
})
export class LoggerModule {}
