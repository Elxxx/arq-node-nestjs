import { Injectable, Inject } from '@nestjs/common';
import { ContainerClient } from '@azure/storage-blob';
import { FileStorageRepository } from '../../../domain/repositories/storage/file-storage.repository';

/**
 * Adaptador de infraestructura para Azure Blob Storage.
 *
 * @description
 * Implementa el puerto `FileStorageRepository` utilizando la librería oficial
 * `@azure/storage-blob`. Permite subir y descargar archivos desde un contenedor
 * de Azure Blob, manteniendo la aplicación desacoplada de los detalles técnicos
 * del proveedor de almacenamiento.
 *
 * @implements {FileStorageRepository}
 */
@Injectable()
export class AzureBlobStorageRepository implements FileStorageRepository {
  /**
   * Constructor de la clase.
   *
   * @param containerClient - Cliente de Azure Blob Storage inyectado desde `BlobStorageModule`.
   *
   * @remarks
   * - `containerClient` se crea en la capa de infraestructura con credenciales seguras
   *   usando `ConfigService`.
   * - Permite interactuar con blobs dentro de un contenedor específico.
   */
  constructor(
    @Inject('CONTAINER_CLIENT')
    private readonly containerClient: ContainerClient,
  ) {}

  /**
   * Sube un archivo a Azure Blob Storage.
   *
   * @param container - Nombre del contenedor donde se guardará el archivo.
   * @param filename - Nombre del archivo (incluye ruta lógica dentro del contenedor).
   * @param buffer - Contenido binario del archivo en formato `Buffer`.
   * @returns URL pública del archivo subido.
   *
   * @example
   * ```ts
   * const url = await repo.upload('my-container', 'docs/example.txt', Buffer.from('Hola'));
   * console.log(url); // https://<account>.blob.core.windows.net/my-container/docs/example.txt
   * ```
   */
  async upload(container: string, filename: string, buffer: Buffer): Promise<string> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(`${container}/${filename}`);
    await blockBlobClient.uploadData(buffer);
    return blockBlobClient.url;
  }

  /**
   * Descarga un archivo desde Azure Blob Storage.
   *
   * @param container - Nombre del contenedor que contiene el archivo.
   * @param filename - Nombre del archivo a descargar.
   * @returns El archivo como un `Buffer`.
   *
   * @throws Error si el archivo no existe en el contenedor.
   *
   * @example
   * ```ts
   * const buffer = await repo.download('my-container', 'docs/example.txt');
   * console.log(buffer.toString('utf-8')); // "Hola"
   * ```
   */
  async download(container: string, filename: string): Promise<Buffer> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(`${container}/${filename}`);
    const exists = await blockBlobClient.exists();
    if (!exists) throw new Error(`File ${filename} not found in ${container}`);

    const downloadResponse = await blockBlobClient.download(0);
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      downloadResponse.readableStreamBody?.on('data', (d) => chunks.push(d as Buffer));
      downloadResponse.readableStreamBody?.on('end', () => resolve(Buffer.concat(chunks)));
      downloadResponse.readableStreamBody?.on('error', reject);
    });
  }
}
