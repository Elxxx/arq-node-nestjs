import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublishMessageUseCase } from '../../../application/use-cases/messaging/publish-message.use-case';
import { ConsumeMessageUseCase } from '../../../application/use-cases/messaging/consume-message.use-case';
import { PublishMessageDto } from '../../../application/dto/messaging/publish-message.dto';

/**
 * Controlador REST para gestión de mensajes en RabbitMQ.
 *
 * Exposición de endpoint:
 * - POST `/messages` → Publicar mensaje en RabbitMQ
 */
@ApiTags('Mensajeria con RabbitMQ')
@Controller({ path: 'messages', version: '1' })
export class MessagingController {
  constructor(
    private readonly publishMessage: PublishMessageUseCase,
    private readonly consumeMessage: ConsumeMessageUseCase,
  ) {}
  /**
   * Publicar un mensaje en RabbitMQ.
   *
   * @param dto - Datos del mensaje (exchange, routingKey, payload).
   * @returns Confirmación de publicación.
   *
   * @example
   * POST /messages
   * ```json
   * {
   *   "exchange": "mi-exchange",
   *   "routingKey": "user.created",
   *   "payload": { "id": "123", "name": "Ada Lovelace" }
   * }
   * ```
   */
  @Post('publish')
  @ApiOperation({ summary: 'Publicar un mensaje en RabbitMQ' })
  @ApiResponse({
    status: 201,
    description: 'Mensaje publicado correctamente',
  })
  async publish(@Body() dto: PublishMessageDto) {
    await this.publishMessage.execute(dto.exchange, dto.routingKey, dto.payload);
    return { message: 'Mensaje publicado correctamente' };
  }

  /**
   * Consumir un mensaje desde una cola específica en RabbitMQ.
   *
   * @param queue - Nombre de la cola desde donde consumir.
   * @returns Mensaje consumido o indicación de cola vacía.
   *
   * @example
   * GET /messages/consume?queue=mi-cola
   */
  @Get('consume')
  @ApiOperation({ summary: 'Consumir un mensaje desde una cola de RabbitMQ' })
  @ApiResponse({ status: 200, description: 'Mensaje consumido correctamente' })
  @ApiResponse({ status: 204, description: 'Cola vacía' })
  async consume(@Query('queue') queue: string) {
    const msg = await this.consumeMessage.execute(queue);
    if (!msg) return { message: 'Cola vacía' };
    return { message: 'Mensaje consumido correctamente', data: msg };
  }
}
