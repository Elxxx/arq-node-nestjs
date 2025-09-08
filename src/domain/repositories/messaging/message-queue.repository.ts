// src/domain/repositories/messaging/message-queue.repository.ts

/**
 * Puerto: Contrato para colas de mensajería (Message Queue).
 *
 * @remarks
 * - Define operaciones de publicación y consumo.
 * - Implementaciones concretas (RabbitMQ, SQS, Kafka, InMemory, etc.) deben cumplir este contrato.
 */
export const MESSAGE_QUEUE_REPOSITORY = Symbol('MESSAGE_QUEUE_REPOSITORY');

export interface MessageQueueRepository {
  /**
   * Publica un mensaje en un exchange con una routing key.
   *
   * @param exchange - Exchange donde se publicará el mensaje.
   * @param routingKey - Routing key del mensaje.
   * @param payload - Contenido serializable (se convertirá a JSON).
   */
  publish(exchange: string, routingKey: string, payload: unknown): Promise<void>;

  /**
   * Consume un mensaje de una cola específica.
   *
   * @param queue - Nombre de la cola.
   * @returns Mensaje JSON o null si la cola está vacía.
   */
  consume(queue: string): Promise<unknown | null>;
}
