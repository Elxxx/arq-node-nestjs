/**
 * Punto de entrada principal de la aplicación NestJS.
 *
 * Configura:
 * - Logger estructurado con Pino (`nestjs-pino`).
 * - Prefijo global de rutas y versionado URI (ej: /api/v1).
 * - Validación global de DTOs con `class-validator` y `class-transformer`.
 * - Swagger/OpenAPI para documentación automática de la API.
 *
 * @module Main
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { SWAGGER_DESCRIPTION } from './infrastructure/config/swagger-description';

/**
 * Función bootstrap que inicializa la aplicación NestJS.
 *
 * - Crea la instancia de la app.
 * - Configura logging, validación, prefijo global y Swagger.
 * - Arranca el servidor en el puerto definido en variables de entorno.
 *
 * @returns {Promise<void>} Una promesa que se resuelve cuando el servidor arranca.
 */
async function bootstrap(): Promise<void> {
  // Crea la aplicación Nest con buffer de logs iniciales
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Logger Pino estructurado
  app.useLogger(app.get(Logger));

  // Prefijo global y versionado de rutas
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no declaradas en DTOs
      transform: true, // convierte payloads a instancias de clases
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true, // evita objetos extraños
    }),
  );

  // Configuración de Swagger/OpenAPI
  const config = app.get(ConfigService);
  if (config.get<boolean>('swagger.enabled')) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Arquetipo Microservicios NestJS')
      .setDescription(SWAGGER_DESCRIPTION) // 👈 limpio y externo
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Autenticación con JWT (si aplica en futuros endpoints)',
        },
        'bearer',
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(config.get<string>('swagger.path') || '/docs', app, document, {
      explorer: true,
      jsonDocumentUrl: '/docs/json',
    });
  }

  // Levanta el servidor en el puerto configurado
  const port = config.get<number>('app.port') || 3000;
  await app.listen(port);
}

// Ejecuta la aplicación
bootstrap();
