/**
 * Representa la forma estándar de respuesta en caso de excepción HTTP.
 */
export interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[]; // puede ser un string o un array (ej. class-validator)
  path: string;
  requestId?: string;
}
