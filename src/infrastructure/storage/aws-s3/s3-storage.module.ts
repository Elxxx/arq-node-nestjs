import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { FILE_STORAGE_REPOSITORY } from '../../../domain/repositories/storage/file-storage.repository';
import { AwsS3Repository } from './aws-s3-storage.repository';

/**
 * AwsS3Module
 *
 * @description
 * Este módulo configura e inyecta la dependencia de AWS S3 en la aplicación,
 * siguiendo el patrón de puertos y adaptadores.
 *
 * @features
 * - Obtiene credenciales y configuración desde `ConfigService`.
 * - Expone un cliente `S3` para acceso de bajo nivel.
 * - Provee el puerto `FILE_STORAGE_REPOSITORY` con la implementación `AwsS3Repository`.
 *
 * @example
 * // En AppModule:
 * @Module({
 *   imports: [AwsS3Module],
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
     * Proveedor de bajo nivel: Cliente de AWS S3.
     * Se construye dinámicamente a partir de las variables de entorno.
     */
    {
      provide: 'AWS_S3_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new S3({
          region: configService.get<string>('aws.s3.region'),
          accessKeyId: configService.get<string>('aws.s3.accessKeyId'),
          secretAccessKey: configService.get<string>('aws.s3.secretAccessKey'),
        });
      },
      inject: [ConfigService],
    },

    /**
     * Proveedor del nombre del bucket configurado en variables de entorno.
     */
    {
      provide: 'AWS_S3_BUCKET',
      useFactory: (configService: ConfigService) => {
        const bucket = configService.get<string>('aws.s3.bucket');
        if (!bucket) {
          throw new Error('Debe configurarse aws.s3.bucket en variables de entorno');
        }
        return bucket;
      },
      inject: [ConfigService],
    },

    /**
     * Puerto de dominio implementado con AWS S3.
     */
    {
      provide: FILE_STORAGE_REPOSITORY,
      useClass: AwsS3Repository,
    },
  ],

  /**
   * Exporta el contrato de FileStorageRepository
   * para que pueda ser usado en casos de uso (application layer).
   */
  exports: [FILE_STORAGE_REPOSITORY],
})
export class AwsS3Module {}
