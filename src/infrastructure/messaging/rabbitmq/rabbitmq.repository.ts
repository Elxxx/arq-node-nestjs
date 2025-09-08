import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { RabbitMQExchangeType } from '../../../shared//types/rabbitmq/types';
import {
  connect,
  AmqpConnectionManager,
  AmqpConnectionManagerOptions,
  ChannelWrapper,
} from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { MessageQueueRepository } from '../../../domain/repositories/messaging/message-queue.repository';

/**
 * Repositorio de mensajería basado en RabbitMQ.
 *
 * Gestiona la conexión y el canal confirm (publisher confirms) usando
 * amqp-connection-manager. Expone métodos para publicar mensajes y
 * consumirlos, aplicando logs estructurados para trazabilidad.
 *
 * Implementa MessageQueueRepository (interfaz de dominio) y OnModuleDestroy
 * para limpiar la conexión cuando Nest finaliza el módulo.
 */
@Injectable()
export class RabbitMQMessageQueueRepository
  implements MessageQueueRepository, OnModuleDestroy
{
  /**
   * Manager de conexión hacia RabbitMQ (amqp-connection-manager).
   */
  private connection!: AmqpConnectionManager;

  /**
   * Channel wrapper que proporciona publicación con confirm.
   */
  private channel!: ChannelWrapper;

  /**
   * Logger estructurado con el contexto del repositorio.
   */
  private readonly logger = new Logger(RabbitMQMessageQueueRepository.name);

  /**
   * Constructor con inyección de tokens de configuración.
   *
   * @param url URL completa de conexión a RabbitMQ (amqp://user:pass@host:port/vhost)
   * @param exchange Nombre del exchange a utilizar por defecto
   * @param exchangeType Tipo de exchange ('topic' | 'direct' | 'fanout', etc.)
   * @param durable Indica si el exchange/colas deben ser durables
   * @param options Opciones adicionales para amqp-connection-manager
   * @param queue Nombre de la cola principal
   * @param routingKey Routing key por defecto
   */
  constructor(
    @Inject('RABBITMQ_URL') private readonly url: string,
    @Inject('RABBITMQ_EXCHANGE') private readonly exchange: string,
    @Inject('RABBITMQ_EXCHANGE_TYPE') private readonly exchangeType: RabbitMQExchangeType,
    @Inject('RABBITMQ_DURABLE') private readonly durable: boolean,
    @Inject('RABBITMQ_OPTIONS') private readonly options: AmqpConnectionManagerOptions | undefined,
    @Inject('RABBITMQ_QUEUE') private readonly queue: string,
    @Inject('RABBITMQ_ROUTING_KEY') private readonly routingKey: string,
  ) {
    this.init();
  }

  /**
   * Inicializa la conexión y el channel confirm.
   *
   * - Crea una conexión gestionada con las opciones proporcionadas.
   * - Crea un ChannelWrapper en modo json y asegura el exchange/cola por defecto.
   * - Registra listeners de eventos con logs estructurados.
   */
  private init() {
    this.connection = connect([this.url], this.options);

    this.channel = this.connection.createChannel({
      json: true,
      setup: async (channel: ConfirmChannel) => {
        await channel.assertExchange(this.exchange, this.exchangeType, {
          durable: this.durable,
        });
        await channel.assertQueue(this.queue, { durable: this.durable });
        await channel.bindQueue(this.queue, this.exchange, this.routingKey);

        this.logger.log(
          `✅ Exchange [${this.exchange}] y cola [${this.queue}] inicializados con routingKey [${this.routingKey}]`,
        );
      },
    });

    // Listeners de eventos del channel wrapper
    this.channel.on('connect', () =>
      this.logger.log('🔌 Conectado a RabbitMQ (channel activo)'),
    );
    this.channel.on('error', (err) =>
      this.logger.error(
        `❌ Error en channel RabbitMQ: ${
          err instanceof Error ? err.message : JSON.stringify(err)
        }`,
      ),
    );
    this.channel.on('close', () =>
      this.logger.warn('⚠️ Channel RabbitMQ cerrado'),
    );
  }

  /**
   * Publica un mensaje en RabbitMQ.
   *
   * @param exchange Exchange donde publicar. Si no se pasa, usa el exchange por defecto.
   * @param routingKey Routing key / binding key para el mensaje.
   * @param payload Carga útil a publicar.
   */
  async publish(
    exchange: string,
    routingKey: string,
    payload: unknown,
  ): Promise<void> {
    const targetExchange = exchange || this.exchange;
    await this.channel.publish(targetExchange, routingKey, payload, {
      contentType: 'application/json',
      persistent: true,
    });

    this.logger.debug(
      `📤 Mensaje publicado → exchange=[${targetExchange}] routingKey=[${routingKey}] payload=${JSON.stringify(
        payload,
      )}`,
    );
  }

  /**
   * Consume un mensaje de una cola específica.
   *
   * @param queue Nombre de la cola desde donde consumir.
   * @returns Mensaje JSON o null si la cola está vacía.
   */
  async consume(queue: string): Promise<unknown | null> {
    await this.channel.waitForConnect();
    await this.channel.assertQueue(queue, { durable: this.durable });

    const msg = await this.channel.get(queue, { noAck: false });

    if (!msg) {
      this.logger.verbose(`📭 Cola [${queue}] vacía`);
      return null;
    }

    try {
      const content = JSON.parse(msg.content.toString('utf8'));
      this.channel.ack(msg);

      this.logger.debug(
        `📥 Mensaje recibido desde cola [${queue}]: ${JSON.stringify(content)}`,
      );

      return content;
    } catch (e) {
      this.channel.nack(msg, false, false);

      this.logger.error(
        `❌ Error procesando mensaje en cola [${queue}]: ${
          e instanceof Error ? e.message : 'Formato desconocido'
        }`,
      );
      return null;
    }
  }

  /**
   * Limpia recursos al destruir el módulo.
   */
  async onModuleDestroy(): Promise<void> {
    try {
      await this.channel.close();
      await this.connection.close();
      this.logger.log('🔻 Conexión RabbitMQ cerrada correctamente');
    } catch (e) {
      this.logger.warn(
        `⚠️ Error cerrando conexión RabbitMQ: ${
          e instanceof Error ? e.message : 'desconocido'
        }`,
      );
    }
  }
}
