// src/application/use-cases/messaging/consume-message.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  MESSAGE_QUEUE_REPOSITORY,
  MessageQueueRepository,
} from '../../../domain/repositories/messaging/message-queue.repository';

/**
 * Caso de uso: Consumir mensaje de RabbitMQ.
 *
 * @description
 * - Orquesta el consumo de un mensaje desde una cola específica.
 */
@Injectable()
export class ConsumeMessageUseCase {
  constructor(
    @Inject(MESSAGE_QUEUE_REPOSITORY)
    private readonly messageQueueRepo: MessageQueueRepository,
  ) {}

  async execute(queue: string): Promise<unknown | null> {
    return this.messageQueueRepo.consume(queue);
  }
}
