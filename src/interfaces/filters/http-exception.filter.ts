import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Response } from 'express';
import { RequestWithId } from '../../shared/types/http/request-with-id.type';
import { HttpExceptionResponse } from '../../shared/types/http/http-exception-response.type';

/**
 * Filtro global de excepciones HTTP.
 *
 * Captura cualquier excepción lanzada en la aplicación y
 * devuelve una respuesta JSON estandarizada.
 *
 * También registra el error usando el logger estructurado (`nestjs-pino`).
 *
 * @example
 * // Error lanzado en un controlador:
 * throw new NotFoundException('User not found');
 *
 * // Respuesta generada por este filtro:
 * {
 *   "statusCode": 404,
 *   "message": "User not found",
 *   "path": "/api/v1/users/123",
 *   "requestId": "abcd-1234"
 * }
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @param logger - Logger Pino inyectado para registrar errores estructurados.
   */
  constructor(private readonly logger: Logger) {}

  /**
   * Método principal que maneja las excepciones capturadas.
   *
   * @param exception - Excepción lanzada (HttpException o Error genérico).
   * @param host - Contexto de ejecución (permite acceder a request/response HTTP).
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithId>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR; // 👈 FIX
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (
        typeof res === 'object' &&
        res !== null &&
        'message' in res
      ) {
        message = (res as { message?: string | string[] }).message ?? exception.message;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error({ err: exception, requestId: request.id }, 'HTTP Exception');

    const payload: HttpExceptionResponse = {
      statusCode: status,
      message,
      path: request.url,
      requestId: request.id,
    };

    response.status(status).json(payload); // ✅ ya no rompe
  }
}
