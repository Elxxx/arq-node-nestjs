import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';

/**
 * Pruebas de extremo a extremo (E2E) para el módulo de usuarios.
 *
 * @remarks
 * Estas pruebas arrancan la aplicación completa en memoria usando
 * el `AppModule` real y ejecutan llamadas HTTP contra ella con `supertest`.
 *
 * Se validan:
 * - Creación de un usuario vía POST `/api/v1/users`
 * - Listado de usuarios vía GET `/api/v1/users`
 */
describe('Users E2E', () => {
  let app: INestApplication;

  /**
   * Inicializa la aplicación Nest antes de correr las pruebas.
   *
   * @returns Promise<void>
   */
  beforeAll(async () => {
    // Compila el módulo raíz de la aplicación
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

    // Crea una app NestJS a partir del módulo compilado
    app = moduleRef.createNestApplication();

    // Aplica validación global en los DTOs (igual que en main.ts)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.init();
  });

  /**
   * Cierra la aplicación Nest una vez terminadas las pruebas.
   */
  afterAll(async () => {
    await app.close();
  });

  /**
   * Caso de prueba: crear un usuario.
   *
   * @scenario POST `/api/v1/users`
   * @input body { name: "Ada", email: "ada@example.com" }
   * @expected status 201 y respuesta con `email` igual al enviado
   */
  it('/users (POST) crea y devuelve el usuario', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({ name: 'Ada', email: 'ada@example.com' })
      .expect(201);

    expect(res.body.email).toBe('ada@example.com');
  });

  /**
   * Caso de prueba: listar usuarios.
   *
   * @scenario GET `/api/v1/users`
   * @expected status 200 y respuesta en forma de arreglo
   */
  it('/users (GET) lista usuarios', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/users').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
