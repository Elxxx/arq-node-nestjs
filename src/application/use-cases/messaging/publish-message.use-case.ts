// src/application/use-cases/messaging/publish-message.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { JsonValue } from '../../../shared/types/messaging/json-value-publish.type';
import {
  MESSAGE_QUEUE_REPOSITORY,
  MessageQueueRepository,
} from '../../../domain/repositories/messaging/message-queue.repository';

/**
 * Caso de uso: Publicar mensaje en RabbitMQ.
 *
 * @description
 * - Orquesta la publicación de un evento de dominio.
 */
@Injectable()
export class PublishMessageUseCase {
  constructor(
    @Inject(MESSAGE_QUEUE_REPOSITORY)
    private readonly queue: MessageQueueRepository,
  ) {}

  async execute(exchange: string, routingKey: string, payload: JsonValue): Promise<void> {
    await this.queue.publish(exchange, routingKey, payload);
  }
}
