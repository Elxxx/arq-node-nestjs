import * as Joi from 'joi';

/**
 * Valida las variables de entorno de la aplicación usando Joi.
 *
 * @remarks
 * - Garantiza que los valores requeridos existen y tienen el formato correcto.
 * - Asigna valores por defecto si no se proporcionan en `.env`.
 * - Lanza un error si alguna variable crítica no pasa la validación.
 *
 * @param config - Objeto con las variables de entorno cargadas.
 * @returns Objeto validado y tipado con los valores de configuración.
 *
 * @throws {Error} Si alguna variable no cumple el esquema definido.
 *
 * @example
 * // En AppModule:
 * ConfigModule.forRoot({
 *   validate: validateEnv
 * })
 */
export function validateEnv(config: Record<string, unknown>) {
  // Definición del esquema de validación
  const schema = Joi.object({
    /** Entorno de la aplicación */
    NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),

    /** Puerto HTTP de la API */
    PORT: Joi.number().integer().min(1).max(65535).default(3000),

    /** Nivel de logging */
    LOG_LEVEL: Joi.string().default('info'),

    /** Habilita/deshabilita la documentación Swagger */
    SWAGGER_ENABLED: Joi.boolean().truthy('true').falsy('false').default(true),

    /** Ruta de acceso a Swagger */
    SWAGGER_PATH: Joi.string().default('/docs'),

    /** Configuración de base de datos PostgreSQL */
    POSTGRES_HOST: Joi.string().default('localhost'),
    POSTGRES_PORT: Joi.number().integer().default(5432),
    POSTGRES_USER: Joi.string().default('app'),
    POSTGRES_PASSWORD: Joi.string().default('secret'),
    POSTGRES_DB: Joi.string().default('appdb'),
  });

  // Validación de las variables de entorno
  const { error, value } = schema.validate(config, {
    allowUnknown: true, // permite otras variables no definidas en el esquema
    abortEarly: false, // muestra todos los errores de validación a la vez
  });

  // Lanza error si la validación falla
  if (error) throw new Error(`Config validation error: ${error.message}`);

  return value;
}
