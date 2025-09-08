import { Injectable } from '@nestjs/common';

/**
 * Servicio de dominio para reglas de negocio sobre mensajes.
 *
 * @remarks
 * - Reglas NO técnicas: tamaño, patrón de routing, políticas, etc.
 * - Mantiene el dominio agnóstico de RabbitMQ u otro broker.
 */
@Injectable()
export class MessageDomainService {
  /**
   * Verifica que el mensaje (JSON) no exceda un tamaño máximo.
   *
   * @param payload - Objeto a publicar.
   * @param maxBytes - Límite en bytes.
   */
  ensureMaxSize(payload: unknown, maxBytes: number): void {
    const size = Buffer.byteLength(JSON.stringify(payload ?? {}), 'utf8');
    if (size > maxBytes) {
      throw new Error(`El mensaje excede el tamaño máximo permitido de ${maxBytes} bytes`);
    }
  }

  /**
   * Verifica que la routing key cumple un patrón permitido (topic).
   *
   * @param routingKey - Routing key a validar.
   * @param allowedPrefix - Prefijo requerido (ej. "app." o "orders.").
   */
  ensureRoutingKeyPrefix(routingKey: string, allowedPrefix: string): void {
    if (!routingKey?.startsWith(allowedPrefix)) {
      throw new Error(`La routingKey debe comenzar con "${allowedPrefix}"`);
    }
  }
}
