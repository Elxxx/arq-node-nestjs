# 🚀 Arquetipo NodeJS / TypeScript - NestJS

Arquetipo base para construir **microservicios en Node.js** usando **NestJS + TypeScript**, aplicando **Arquitectura Hexagonal (Ports & Adapters)**, **Clean Architecture** y **principios SOLID**.

Incluye **ejemplo completo** con una entidad `User`, casos de uso CRUD, repositorio en memoria, controladores REST documentados con Swagger, logs estructurados con Pino, validación de entorno con Joi, y configuración lista para **Docker + PostgreSQL**.

---

## 📂 Estructura del Proyecto

La organización de carpetas sigue los principios de **Arquitectura Hexagonal (Ports & Adapters)** y **Clean Architecture**, garantizando una separación estricta de responsabilidades:

src/
├─ application/ # Casos de uso (servicios de aplicación) + DTOs
│ ├─ dto/
│ └─ use-cases/
├─ domain/ # Núcleo de negocio
│ ├─ entities/
│ ├─ repositories/ # Puertos (interfaces)
│ └─ services/ # Reglas de negocio puras
├─ infrastructure/ # Implementaciones técnicas (adaptadores)
│ ├─ config/
│ ├─ email/
│ ├─ logging/
│ ├─ messaging/
│ ├─ persistence/
│ ├─ security/
│ └─ storage/
├─ interfaces/ # Adaptadores de entrada (HTTP)
│ ├─ controllers/
│ ├─ filters/
│ └─ interceptors/
├─ app.module.ts # Módulo raíz (composition root)
└─ main.ts # Bootstrap NestJS (pipes, prefix, swagger, etc.)

---

## 🏗️ Principios Aplicados

**Arquitectura Hexagonal (Ports & Adapters)** → separación clara entre dominio, aplicación e infraestructura.

✅ **SOLID** aplicado:

- **S**: Separación de responsabilidades entre entidades, servicios, casos de uso y controladores.
- **O**: Casos de uso abiertos a extensión, cerrados a modificación.
- **L**: Interfaces claras para repositorios y servicios.
- **I**: Interfaces pequeñas y específicas por contexto.
- **D**: Inversión de dependencias (uso de tokens + inyección NestJS).

✅ **Buenas prácticas**:

- DTOs con `class-validator` + `class-transformer`.
- Logs estructurados (`nestjs-pino`).
- Validación de entorno con `@nestjs/config` + `joi`.
- Swagger para documentación automática.
- Testing con Jest (unitarios + integración).

---

## 📦 Librerías principales

Dependencias y Librerías principales aplicadas en el arquetipo.

**Core Framework**:

- @nestjs/common ^11.1.6
- @nestjs/core ^11.1.6
- @nestjs/platform-express ^11.1.6
- @nestjs/config ^4.0.2
- @nestjs/swagger ^11.2.0
- @nestjs/typeorm ^11.0.0

**Messaging & Eventing**:

- amqp-connection-manager ^4.1.14
- amqplib ^0.10.9

**Persistencia**:

- typeorm ^0.3.26
- pg ^8.16.3

**Validación y Transformación**:

- class-validator ^0.14.2
- class-transformer ^0.5.1
- joi ^18.0.1

**Logging**:

- nestjs-pino ^4.4.0
- pino ^9.9.0
- pino-pretty ^13.1.1

**Seguridad & Auth**:

- jsonwebtoken ^9.0.2

**Cloud Providers**:

- @azure/storage-blob ^12.28.0
- aws-sdk ^2.1692.0
- @sendgrid/mail ^8.1.5

**Utilidades**:

- uuid ^11.1.0
- rxjs ^7.8.1
- reflect-metadata ^0.2.2
- Dev & Tooling
- typescript ^5.9.2
- @nestjs/cli ^11.0.10
- eslint ^9.33.0
- prettier ^3.3.3
- husky ^9.1.1
- lint-staged ^15.2.8
- jest ^30.0.5
- supertest ^7.0.0
- ts-jest ^29.2.5
- ts-node ^10.9.2
- @typescript-eslint/eslint-plugin ^8.40.0
- @typescript-eslint/parser ^8.40.0

---

## 📦 Instalación

Este proyecto utiliza Node.js 22.17 y está diseñado para levantarse tanto en local como en contenedores Docker.

**En esta sección encontrarás los pasos necesarios para**:

- Clonar el repositorio y configurar el entorno.
- Instalar dependencias con npm.
- Definir las variables en el archivo .env.
- Levantar la aplicación en modo desarrollo o con Docker Compose.

```bash
# 1. Instalar dependencias
npm install

# 3. Levantar en modo desarrollo
npm run dev
```

## ⚙️ Variables de Entorno

Descripcion de las variables de entorno utilizadas en el proyecto:

**Configuración del entorno de desarrollo**
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

**Configuración de Swagger**
SWAGGER_ENABLED=true
SWAGGER_PATH=/docs

**Configuración de Base de datos PostgreSQL**
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123123
POSTGRES_DB=arquetipo
POSTGRES_SCHEMA=usuarios

**Configuración de Azure Blob Storage**
AZURE_STORAGE_CONNECTION_STRING=string-de-conexion-azure
AZURE_CONTAINER=container-name

**Configuración de SendGrid**
SENDGRID_API_KEY=key-de-api-sendgrid\*\*
SENDGRID_SENDER=casilla-sendgrid

**Configuración de JWT**
JWT_SECRET=mi-secreto

**URL del servicio de autenticación externa (pssim)**
AUTH_API_URL=https://pssim-api-desa.minvu.cl

**Configuración de RabbitMQ**
RABBITMQ_URL=amqp://admin:admin123@localhost:5672
RABBITMQ_EXCHANGE=app.exchange
RABBITMQ_EXCHANGE_TYPE=topic
RABBITMQ_DURABLE=true
RABBITMQ_QUEUE=user.queue
RABBITMQ_ROUTING_KEY=user.created

---

## 📖 Documentación de API (Swagger)

Cuando el servicio esté corriendo:

```bash

- Swagger UI → http://localhost:3000/docs
- OpenAPI JSON → http://localhost:3000/docs-json

```

Ejemplo de endpoints expuestos (/api/v1):

```bash

- POST /users → Crear usuario
- GET /users → Listar usuarios
- GET /users/:id → Obtener usuario
- PUT /users/:id → Actualizar usuario
- DELETE /users/:id → Eliminar usuario
- GET /health → Health check

```

## 🛠️ Scripts NPM

El proyecto incluye una serie de scripts para facilitar el ciclo de vida de desarrollo: desde ejecutar la aplicación en modo hot-reload, hasta compilar, testear y aplicar reglas de formateo.

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar compilado
npm run start

# Tests unitarios
npm run test

# Lint con ESLint
npm run lint

# Formateo con Prettier
npm run format
```

## 🧪 Testing

Este proyecto usa **Jest** para pruebas unitarias y de integración/E2E.

### Comandos principales

```bash

**Tests unitarios**
npm run test

**Con reporte de cobertura**
npm run test -- --coverage

**Pruebas E2E (end-to-end)**
npm run test:e2e

**Un archivo específico**
npx jest test/unit/create-user.use-case.spec.ts

```

---

## 📄 Licencia

```bash

MIT.

```

---
