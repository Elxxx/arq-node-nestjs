/**
 * Módulo raíz de la aplicación NestJS.
 *
 * Configura:
 * - Carga de variables de entorno con validación (ConfigModule + Joi).
 * - Logger estructurado con Pino (LoggerModule).
 * - Módulo de base de datos (DatabaseModule).
 * - Módulos de infraestructura (persistencia, email, storage, mensajería, seguridad).
 * - Controladores HTTP (Users, Files, Email, Auth, Messaging, Health).
 * - Casos de uso y servicios de dominio.
 * - Filtro global de excepciones HTTP.
 *
 * @remarks
 * Este módulo actúa como **composition root** de la aplicación,
 * ensamblando los distintos módulos de infraestructura con la capa de dominio
 * y la capa de aplicación, siguiendo los principios de Arquitectura Hexagonal.
 *
 * @module AppModule
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

// 🛠️ Configuración e infraestructura base
import configuration from './infrastructure/config/configuration';
import { validateEnv } from './infrastructure/config/validation';
import { LoggerModule } from './infrastructure/logging/logger.module';
import { DatabaseModule } from './infrastructure/config/database.module';

// 🌐 Controladores HTTP (delivery layer)
import { HealthController } from './interfaces/controllers/health.controller';
import { HttpExceptionFilter } from './interfaces/filters/http-exception.filter';

// 👤 User API (controlador, repositorio, casos de uso, servicios de dominio)
import { PostgresUserModule } from './infrastructure/persistence/user/pg/postgres-user.module';
import { UserDomainService } from './domain/services/user/user.domain-service';
import { UsersController } from './interfaces/controllers/user/users.controller';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from './application/use-cases/user/get-user.use-case';
import { ListUsersUseCase } from './application/use-cases/user/list-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/user/delete-user.use-case';
import { RefreshTokenUseCase } from './application/use-cases/user/refresh-token.use-case';

// 📂 Storage API (Modulo, servicio, controlador, casos de uso)
// 🔹 Opción 1: Azure
import { BlobStorageModule } from './infrastructure/storage/azure-blob/blob-storage.module';
// 🔹 Opción 2: AWS
// import { AwsS3Module } from './infrastructure/storage/aws-s3/s3-storage.module';
import { FileDomainService } from './domain/services/storage/storage.domain-service';
import { FileController } from './interfaces/controllers/storage/files.controller';
import { UploadFileUseCase } from './application/use-cases/file/storage/upload-file.use-case';
import { DownloadFileUseCase } from './application/use-cases/file/storage/download-file.use-case';

// 📧 Email API (SendGrid)
import { SendGridModule } from './infrastructure/email/sendgrid/sendgrid.module';
import { EmailDomainService } from './domain/services/email/email.domain-service';
import { EmailController } from './interfaces/controllers/email/email.controller';
import { SendEmailUseCase } from './application/use-cases/email/send-email.use-case';

// 🔐 Auth API (JWT)
//import { ExternalAuthModule } from './infrastructure/security/external-auth/external-auth.module';
import { AuthDomainService } from './domain/services/auth/auth.domain-service';
import { AuthController } from './interfaces/controllers/auth/auth.controller';
import { LoginUseCase } from './application/use-cases/auth/login.use-case';

// 📨 Messaging (RabbitMQ)
import { RabbitMQModule } from './infrastructure/messaging/rabbitmq/rabbitmq.module';
import { MessageDomainService } from './domain/services/messaging/message.domain-service';
import { MessagingController } from './interfaces/controllers/messaging/messages.controller';
import { PublishMessageUseCase } from './application/use-cases/messaging/publish-message.use-case';
import { ConsumeMessageUseCase } from './application/use-cases/messaging/consume-message.use-case';

// 👥 Tenant API (SaaS - multi-tenant)
import { PostgresTenantModule } from './infrastructure/persistence/tenant/pg/postgres-tenant.module';
import { TenantDomainService } from './domain/services/tenant/tenant.domain-service';
import { TenantsController } from './interfaces/controllers/tenant/tenants.controller';
import { CreateTenantUseCase } from './application/use-cases/tenant/create-tenant.use-case';
import { ListTenantsUseCase } from './application/use-cases/tenant/list-tenants.use-case';
import { GetTenantUseCase } from './application/use-cases/tenant/get-tenant.use-case';
import { UpdateTenantUseCase } from './application/use-cases/tenant/update-tenant.use-case';
import { DeleteTenantUseCase } from './application/use-cases/tenant/delete-tenant.use-case';

// 👥 Campaña API (SaaS - multi-tenant)
import { PostgresCampaignModule } from './infrastructure/persistence/campaign/pg/postgres-campaign.module';
import { CampaignGroupingDomainService } from './domain/services/campaign/campaign-grouping.domain-service';
import { CreateCampaignUseCase } from './application/use-cases/campaign/create-campaign.use-case';
import { AttachParticipantsUseCase } from './application/use-cases/campaign/attach-participants.use-case';
import { AutoGroupUseCase } from './application/use-cases/campaign/auto-group.use-case';
import { ListCampaignGroupsUseCase } from './application/use-cases/campaign/list-groups.use-case';
import { AssignTemplatesAutoUseCase } from './application/use-cases/campaign/assign-templates-auto.use-case';
import { AssignTemplatesManualUseCase } from './application/use-cases/campaign/assign-templates-manual.use-case';
import { DefineScheduleUseCase } from './application/use-cases/campaign/define-schedule.use-case';
import { LaunchCampaignUseCase } from './application/use-cases/campaign/launch-campaign.use-case';
import { ListCampaignsUseCase } from './application/use-cases/campaign/list-campaigns.use-case';
import { GetCampaignUseCase } from './application/use-cases/campaign/get-campaign.use-case';
import { CampaignsController } from './interfaces/controllers/campaign/campaigns.controller';

@Module({
  imports: [
    /**
     * Configuración de entorno global.
     * - Carga variables de .env con @nestjs/config.
     * - Usa esquema Joi para validar valores requeridos.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    /**
     * Módulo de conexión de base de datos.
     * Define la conexión global a la BD (PostgreSQL, MySQL, etc.).
     */
    DatabaseModule,

    /**
     * Módulo de persistencia de usuarios con PostgreSQL.
     * (Si migramos a MySQL, bastaría con importar MysqlUserModule aquí).
     */
    PostgresUserModule,

    /**
     * Módulo de persistencia de tenants con PostgreSQL.
     */
    PostgresTenantModule,

    /**
     * Módulo de persistencia de campañas con PostgreSQL.
     */
    PostgresCampaignModule,

    /**
     * Logger estructurado con Pino (nestjs-pino).
     */
    LoggerModule,

    /**
     * Módulo de almacenamiento (Azure / AWS).
     */
    BlobStorageModule,
    // AwsS3Module, 👈 habilitar si migramos a AWS

    /**
     * Módulo de envío de correos con SendGrid.
     */
    SendGridModule,

    /**
     * Módulo de autenticación con JWT + servicio externo.
     */
    //ExternalAuthModule,

    /**
     * Módulo de mensajería con RabbitMQ.
     */
    RabbitMQModule,
  ],

  /**
   * Controladores HTTP expuestos hacia el mundo exterior.
   */
  controllers: [
    UsersController,
    FileController,
    EmailController,
    AuthController,
    MessagingController,
    HealthController,
    TenantsController,
    CampaignsController,
  ],

  /**
   * Providers (servicios de dominio + casos de uso + filtros globales).
   */
  providers: [
    // 🔹 User
    UserDomainService,
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    RefreshTokenUseCase,

    // 🔹 Storage
    FileDomainService,
    UploadFileUseCase,
    DownloadFileUseCase,

    // 🔹 Email
    EmailDomainService,
    SendEmailUseCase,

    // 🔹 Auth
    AuthDomainService,
    LoginUseCase,

    // 🔹 Messaging
    PublishMessageUseCase,
    ConsumeMessageUseCase,
    MessageDomainService,

    // 🔹 Tenant
    TenantDomainService,
    CreateTenantUseCase,
    ListTenantsUseCase,
    GetTenantUseCase,
    UpdateTenantUseCase,
    DeleteTenantUseCase,

    // Campaña
    CreateCampaignUseCase,
    AttachParticipantsUseCase,
    AutoGroupUseCase,
    ListCampaignGroupsUseCase,
    AssignTemplatesAutoUseCase,
    AssignTemplatesManualUseCase,
    DefineScheduleUseCase,
    LaunchCampaignUseCase,
    ListCampaignsUseCase,
    GetCampaignUseCase,
    CampaignGroupingDomainService,

    // 🌐 Filtro global de excepciones
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
