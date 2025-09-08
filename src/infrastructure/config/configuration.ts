/**
 * Configuración centralizada de la aplicación.
 *
 * @remarks
 * - Define secciones principales: `app`, `logger`, `swagger`, `db`.
 * - Cada valor se obtiene de variables de entorno y tiene un valor por defecto.
 * - Usado junto con `@nestjs/config` para exponer la configuración como `ConfigService`.
 *
 * @example
 * // Uso en un servicio
 * constructor(private readonly config: ConfigService) {
 *   const port = this.config.get<number>('app.port');
 * }
 */
export default () => ({
  /**
   * Configuración general de la aplicación.
   */
  app: {
    /** Entorno actual (development, test, production). */
    env: process.env.NODE_ENV || 'development',

    /** Puerto en el que corre la API (default: 3000). */
    port: parseInt(process.env.PORT || '3000', 10),
  },

  /**
   * Configuración de logging.
   */
  logger: {
    /** Nivel de logs (debug, info, warn, error). */
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * Configuración de Swagger / OpenAPI.
   */
  swagger: {
    /** Habilita/deshabilita la documentación. */
    enabled: (process.env.SWAGGER_ENABLED || 'true').toLowerCase() === 'true',

    /** Ruta donde se sirve la documentación (default: /docs). */
    path: process.env.SWAGGER_PATH || '/docs',
  },

  /**
   * Configuración de base de datos PostgreSQL.
   */
  db: {
    /** Host de la base de datos. */
    host: process.env.POSTGRES_HOST || 'localhost',

    /** Puerto de conexión (default: 5432). */
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),

    /** Usuario de la base de datos. */
    user: process.env.POSTGRES_USER || 'app',

    /** Contraseña del usuario. */
    password: process.env.POSTGRES_PASSWORD || 'secret',

    /** Nombre de la base de datos. */
    database: process.env.POSTGRES_DB || 'appdb',
  },

  /**
   * Configuración de Azure Blob Storage.
   */
  azure: {
    storage: {
      /** Cadena de conexión a Azure Blob Storage. */
      storageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
      /** Nombre del contenedor en Azure Blob Storage. */
      container: process.env.AZURE_CONTAINER || 'default-container',
    },
  },

  /**
   * Configuración de SendGrid.
   */
  sendgrid: {
    /** Clave de API de SendGrid. */
    apiKey: process.env.SENDGRID_API_KEY || '',

    /** Dirección de correo del remitente. */
    sender: process.env.SENDGRID_SENDER || '',
  },

  /**
   * Configuración de JWT (JSON Web Tokens).
   */
  jwt: {
    /** Clave secreta para firmar los tokens JWT. */
    secret: process.env.JWT_SECRET || 'default-secret',
    /** Tiempo de expiración del token (e.g., 1h, 30m). */
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },

  /**
   * Configuración de autenticación externa.
   */
  auth: {
    /** URL base de la API externa de autenticación. */
    apiUrl: process.env.AUTH_API_URL || 'https://auth.example.com',
  },

  /**
   * Configuración de RabbitMQ.
   */
  rabbitmq: {
    /** URL de conexión a RabbitMQ. */
    url: process.env.RABBITMQ_URL,
    /** Exchange por defecto para publicar mensajes. */
    exchange: process.env.RABBITMQ_EXCHANGE,
    /** Tipo de exchange (topic, direct, fanout). */
    exchangeType: process.env.RABBITMQ_EXCHANGE_TYPE ?? 'topic',
    /** Indica si el exchange es durable (true/false). */
    durable: process.env.RABBITMQ_DURABLE === 'true',
    /** Nombre de la cola por defecto (opcional). */
    queue: process.env.RABBITMQ_QUEUE || 'default_queue',
    /** Routing key por defecto (opcional). */
    routingKey: process.env.RABBITMQ_ROUTING_KEY || 'default_routing_key',
    /** Opciones adicionales para la conexión a RabbitMQ (JSON). */
    options: process.env.RABBITMQ_OPTIONS ? JSON.parse(process.env.RABBITMQ_OPTIONS) : {},
  },
});
