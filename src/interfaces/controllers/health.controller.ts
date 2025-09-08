import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controlador de Health Check.
 *
 * Expone un endpoint público para verificar que la API
 * está corriendo y obtener información básica del estado.
 *
 * @remarks
 * Este endpoint es útil para monitoreo (Kubernetes, Docker, load balancers, etc.).
 */
@ApiTags('Estado de la API')
@Controller('health')
export class HealthController {
  /**
   * Endpoint GET `/health`.
   *
   * @returns Objeto con estado, tiempo de actividad y timestamp actual.
   *
   * @example
   * GET /health → 200 OK
   * ```json
   * {
   *   "status": "ok",
   *   "uptime": 123.456,
   *   "timestamp": "2025-08-20T20:15:00.000Z"
   * }
   * ```
   */
  @Get()
  @ApiOperation({ summary: 'Verificar estado de la API' })
  @ApiResponse({ status: 200, description: 'La API está corriendo correctamente' })
  check() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
