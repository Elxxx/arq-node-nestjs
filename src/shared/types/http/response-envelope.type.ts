/**
 * Envoltorio estándar para todas las respuestas HTTP.
 *
 * @template T - Tipo de datos que envuelve la respuesta
 */
export interface ResponseEnvelope<T> {
  data: T;
}
