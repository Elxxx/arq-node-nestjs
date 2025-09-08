// src/infrastructure/config/swagger-description.ts

/**
 * Descripción extendida para la documentación Swagger/OpenAPI.
 *
 * @remarks
 * Se carga desde main.ts para mantener el archivo limpio.
 */
export const SWAGGER_DESCRIPTION = `
### 📦 Arquitectura de la API

Este arquetipo implementa **Arquitectura Hexagonal (Ports & Adapters) / Clean Architecture** con principios SOLID para construir microservicios
sobre **NestJS** y **TypeScript**, siguiendo principios **SOLID**.

#### 🏗️ Estructura de carpetas

\`\`\`

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

\`\`\`

#### ✨ Principales características
- ✅ Separación estricta de capas y uso de puertos/adaptadores.
- ✅ Validación de entrada con **class-validator** y **class-transformer**.
- ✅ Logs estructurados con **nestjs-pino**.
- ✅ Configuración centralizada con **@nestjs/config**.
- ✅ Documentación de API generada automáticamente con **Swagger**.
- ✅ RabbitMQ vía amqp-connection-manager + amqplib (publisher confirms + reconexión).
- ✅ Persistencia con **TypeORM** y **PostgreSQL** (repositorios como adaptadores).
- ✅ Almacenamiento de archivos con adaptadores para **Azure Blob Storage** y **AWS S3**.
- ✅ Envío de emails con **SendGrid**.
- ✅ Seguridad con **JWT** y **bcrypt** (hashing de contraseñas).
- ✅ Pruebas unitarias y de integración con **Jest** y **Supertest**.
- ✅ Health checks con endpoint dedicado.
- ✅ Manejo global de excepciones HTTP.
- ✅ Uso de DTOs para entrada/salida y mapeo manual.
- ✅ Uso de servicios de dominio para lógica de negocio.
- ✅ Casos de uso para orquestar la lógica de aplicación.
- ✅ Repositorios como puertos para abstracción de persistencia.
- ✅ Inyección de dependencias nativa de NestJS.
- ✅ Uso de Interceptors para logging y transformación de respuestas.

---
Documentación generada por **Arquitectura e integración de sistemas**.
`;
