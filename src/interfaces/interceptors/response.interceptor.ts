import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseEnvelope } from '../../shared/types/http/response-envelope.type';

/**
 * Interceptor global para estandarizar las respuestas HTTP.
 *
 * Este interceptor intercepta la respuesta de cualquier controlador
 * y la envuelve en un objeto con la forma:
 *
 * ```json
 * { "data": ... }
 * ```
 *
 * @example
 * // Respuesta original del controlador:
 * { "id": "123", "name": "Ada" }
 *
 * // Respuesta tras el interceptor:
 * { "data": { "id": "123", "name": "Ada" } }
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseEnvelope<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseEnvelope<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
