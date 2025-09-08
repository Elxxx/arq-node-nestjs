import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * DatabaseModule
 *
 * @description
 * Configura la conexión de TypeORM a la base de datos relacional
 * (PostgreSQL, MySQL, etc.), en base a variables de entorno.
 *
 * @remarks
 * - Mantiene la app desacoplada del motor de base de datos.
 * - Permite migrar a otro motor cambiando solo configuración.
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('db.host'),
          port: config.get<number>('db.port'),
          username: config.get<string>('db.user'),
          password: config.get<string>('db.password'),
          database: config.get<string>('db.database'),
          autoLoadEntities: true,
          synchronize: config.get<boolean>('db.synchronize') ?? false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
