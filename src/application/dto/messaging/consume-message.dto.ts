// src/application/dto/consume-message.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO de entrada para consumir mensajes desde RabbitMQ.
 */
export class ConsumeMessageDto {
  @ApiProperty({
    example: 'user.queue',
    description: 'Nombre de la cola desde la cual consumir mensajes',
  })
  @IsString()
  @IsNotEmpty()
  queue!: string;
}
