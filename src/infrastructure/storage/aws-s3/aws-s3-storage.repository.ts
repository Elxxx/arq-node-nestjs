import { Injectable, Inject } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { FileStorageRepository } from '../../../domain/repositories/storage/file-storage.repository';

/**
 * Adaptador de infraestructura para AWS S3.
 *
 * @description
 * Implementa el puerto `FileStorageRepository` utilizando la librería oficial
 * `aws-sdk`. Permite subir y descargar archivos desde un bucket de S3,
 * manteniendo la aplicación desacoplada de los detalles técnicos
 * del proveedor de almacenamiento.
 *
 * @implements {FileStorageRepository}
 */
@Injectable()
export class AwsS3Repository implements FileStorageRepository {
  /**
   * Constructor de la clase.
   *
   * @param s3 - Cliente de AWS S3 inyectado desde `AwsS3Module`.
   * @param bucketName - Nombre del bucket configurado en variables de entorno.
   *
   * @remarks
   * - `s3` se crea en la capa de infraestructura con credenciales seguras
   *   usando `ConfigService`.
   * - El bucket es configurado externamente para mantener bajo acoplamiento.
   */
  constructor(
    @Inject('AWS_S3_CLIENT')
    private readonly s3: S3,

    @Inject('AWS_S3_BUCKET')
    private readonly bucketName: string,
  ) {}

  /**
   * Sube un archivo a AWS S3.
   *
   * @param container - Prefijo lógico (ej. carpeta dentro del bucket).
   * @param filename - Nombre del archivo.
   * @param buffer - Contenido binario del archivo.
   * @returns URL pública del archivo subido.
   *
   * @example
   * ```ts
   * const url = await repo.upload('docs', 'example.txt', Buffer.from('Hola'));
   * console.log(url); // https://my-bucket.s3.amazonaws.com/docs/example.txt
   * ```
   */
  async upload(container: string, filename: string, buffer: Buffer): Promise<string> {
    const key = `${container}/${filename}`;

    await this.s3
      .upload({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
      })
      .promise();

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  /**
   * Descarga un archivo desde AWS S3.
   *
   * @param container - Prefijo lógico (ej. carpeta dentro del bucket).
   * @param filename - Nombre del archivo.
   * @returns El archivo como un `Buffer`.
   *
   * @throws {Error} Si el archivo no existe en el bucket.
   *
   * @example
   * ```ts
   * const buffer = await repo.download('docs', 'example.txt');
   * console.log(buffer.toString('utf-8')); // "Hola"
   * ```
   */
async download(container: string, filename: string): Promise<Buffer> {
  const key = `${container}/${filename}`;

    try {
      const response = await this.s3
        .getObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();

      if (!response.Body) {
        throw new Error(`File ${filename} not found in ${container}`);
      }

      if (Buffer.isBuffer(response.Body)) {
        return response.Body;
      }

      if (typeof response.Body === 'string') {
        return Buffer.from(response.Body, 'utf-8');
      }

      if (response.Body instanceof Uint8Array) {
        return Buffer.from(response.Body);
      }

      throw new Error(
        `Unsupported response.Body type for file ${filename} (type=${typeof response.Body})`,
      );
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error downloading file ${filename}: ${err.message}`);
      }
      throw new Error(`Error downloading file ${filename}: ${String(err)}`);
    }
  }
}
