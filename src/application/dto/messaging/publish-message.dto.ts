import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { JsonValue } from '../../../shared/types/messaging/json-value-publish.type';

/**
 * DTO de entrada para publicar mensajes en RabbitMQ.
 *
 * @remarks
 * - Define la forma de los datos que el cliente debe enviar.
 * - Usa `class-validator` para validar automáticamente la request.
 * - Usa `@ApiProperty` para generar documentación Swagger.
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
export class PublishMessageDto {
  @ApiProperty({ example: 'app.exchange', description: 'Exchange donde se publicará el mensaje' })
  @IsString()
  @IsNotEmpty()
  exchange!: string;

  @ApiProperty({ example: 'user.created', description: 'Routing key usada para enrutar el mensaje' })
  @IsString()
  @IsNotEmpty()
  routingKey!: string;

  @ApiProperty({
    example: { id: '123', name: 'Ada Lovelace' },
    description: 'Carga útil del mensaje (JSON)',
  })
  @IsObject()
  @IsNotEmpty()
  payload!: JsonValue;
}