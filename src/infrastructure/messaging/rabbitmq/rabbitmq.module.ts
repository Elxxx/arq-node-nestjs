// src/infrastructure/messaging/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQOptions } from '../../../shared/types/rabbitmq/options.type';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQMessageQueueRepository } from './rabbitmq.repository';
import { MESSAGE_QUEUE_REPOSITORY } from '../../../domain/repositories/messaging/message-queue.repository';

/**
 * Módulo de integración con RabbitMQ.
 *
 * Provee los tokens de configuración (URL, exchange, tipo, durable, opciones)
 * y registra la implementación RabbitMQMessageQueueRepository como proveedor
 * para MESSAGE_QUEUE_REPOSITORY.
 *
 * Este módulo importa ConfigModule para resolver las variables de entorno
 * y exporta el repositorio para ser usado por otros módulos de la aplicación.
 */
@Module({
  imports: [ConfigModule],
  providers: [
    /**
     * Token: RABBITMQ_URL
     * Descripción: URL completa de conexión a RabbitMQ (amqp://user:pass@host:port/vhost).
     * Tipo: string
     */
    {
      provide: 'RABBITMQ_URL',
      useFactory: (config: ConfigService) => config.get<string>('rabbitmq.url'),
      inject: [ConfigService],
    },
    /**
     * Token: RABBITMQ_EXCHANGE
     * Descripción: nombre del exchange a utilizar.
     * Tipo: string
     */
    {
      provide: 'RABBITMQ_EXCHANGE',
      useFactory: (config: ConfigService) => config.get<string>('rabbitmq.exchange'),
      inject: [ConfigService],
    },
    /**
     * Token: RABBITMQ_EXCHANGE_TYPE
     * Descripción: tipo de exchange (ej: 'topic', 'direct', 'fanout').
     * Por defecto: 'topic'
     * Tipo: string
     */
    {
      provide: 'RABBITMQ_EXCHANGE_TYPE',
      useFactory: (config: ConfigService) => config.get<string>('rabbitmq.exchangeType') || 'topic',
      inject: [ConfigService],
    },
    /**
     * Token: RABBITMQ_DURABLE
     * Descripción: indica si el exchange/cola debe ser durable.
     * Por defecto: true
     * Tipo: boolean
     */
    {
      provide: 'RABBITMQ_DURABLE',
      useFactory: (config: ConfigService) => config.get<boolean>('rabbitmq.durable') ?? true,
      inject: [ConfigService],
    },
    /**
     * Token: RABBITMQ_OPTIONS
     * Descripción: opciones adicionales de configuración para la conexión/colA.
     * Tipo: object
     */
    {
      provide: 'RABBITMQ_OPTIONS',
      useFactory: (config: ConfigService) => config.get<RabbitMQOptions>('rabbitmq.options'),
      inject: [ConfigService],
    },
    /**
     * Token: RABBITMQ_QUEUE
     * Descripción: nombre de la cola por defecto (opcional).
     * Tipo: string
     */
    {
      provide: 'RABBITMQ_QUEUE',
      useFactory: (config: ConfigService) =>
        config.get<string>('rabbitmq.queue') || 'default_queue',
      inject: [ConfigService],
    },
    /**
     * Token: RABBITMQ_ROUTING_KEY
     * Descripción: routing key por defecto (opcional).
     * Tipo: string
     */
    {
      provide: 'RABBITMQ_ROUTING_KEY',
      useFactory: (config: ConfigService) => config.get<string>('rabbitmq.routingKey') || '#', // por defecto todas
      inject: [ConfigService],
    },
    /**
     * Proveedor: implementación del repositorio de colas de mensajes.
     * Interfaz: MESSAGE_QUEUE_REPOSITORY
     * Implementación: RabbitMQMessageQueueRepository
     */
    {
      provide: MESSAGE_QUEUE_REPOSITORY,
      useClass: RabbitMQMessageQueueRepository,
    },
  ],
  exports: [MESSAGE_QUEUE_REPOSITORY],
})
export class RabbitMQModule {}
