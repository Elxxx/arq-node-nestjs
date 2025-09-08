import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContainerClient } from '@azure/storage-blob';
import { FILE_STORAGE_REPOSITORY } from '../../../domain/repositories/storage/file-storage.repository';
import { AzureBlobStorageRepository } from './azure-blob-storage.repository';

/**
 * BlobStorageModule
 *
 * @description
 * Este módulo configura e inyecta la dependencia de Azure Blob Storage
 * en la aplicación, siguiendo el patrón de puertos y adaptadores.
 *
 * @features
 * - Obtiene credenciales y configuración desde `ConfigService`.
 * - Expone un `ContainerClient` de Azure para acceso bajo nivel.
 * - Provee el puerto `FILE_STORAGE_REPOSITORY` con la implementación `AzureBlobStorageRepository`.
 *
 * @example
 * // En AppModule
 * @Module({
 *   imports: [BlobStorageModule],
 * })
 * export class AppModule {}
 */
@Module({
  imports: [
    /**
     * ConfigModule expone las variables de entorno validadas
     * y centralizadas en `ConfigService`. Esto permite inyectar
     * valores de forma tipada desde cualquier parte de la app.
     */
    ConfigModule,
  ],

  providers: [
    /**
     * Proveedor de bajo nivel: ContainerClient de Azure Blob.
     * Se construye dinámicamente a partir de las variables de entorno.
     */
    {
      provide: 'CONTAINER_CLIENT',
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('azure.storage.storageConnectionString');
        const containerName = configService.get<string>('azure.storage.container');

        if (!connectionString || !containerName) {
          throw new Error(
            'Se debe proporcionar las variables de conexión de Azure Blob Storage y el nombre del contenedor',
          );
        }

        return new ContainerClient(connectionString, containerName);
      },
      inject: [ConfigService],
    },

    /**
     * Puerto de dominio implementado con Azure.
     * Expone la implementación de `FileStorageRepository`.
     */
    {
      provide: FILE_STORAGE_REPOSITORY,
      useClass: AzureBlobStorageRepository,
    },
  ],

  /**
   * Exporta el contrato de FileStorageRepository
   * para que pueda ser usado en casos de uso (application layer).
   */
  exports: [FILE_STORAGE_REPOSITORY],
})
export class BlobStorageModule {}
