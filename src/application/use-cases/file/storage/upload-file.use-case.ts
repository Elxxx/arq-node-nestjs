import { Injectable, Inject } from '@nestjs/common';
import {
  FileStorageRepository,
  FILE_STORAGE_REPOSITORY,
} from '../../../../domain/repositories/storage/file-storage.repository';
import { FileDomainService } from '../../../../domain/services/storage/storage.domain-service';

/**
 * Caso de uso: Subir archivo a un sistema de almacenamiento.
 *
 * @description
 * Encapsula la lógica de aplicación para subir archivos a través del
 * puerto `FileStorageRepository`.
 *
 * Integra las reglas de negocio del dominio (`FileDomainService`)
 * para validar que el archivo cumpla con:
 * - Extensiones permitidas.
 * - Tamaño máximo definido por la política de negocio.
 *
 * @remarks
 * - No depende de detalles técnicos del proveedor (Azure, S3, Local, etc.).
 * - Aplica el patrón de puertos y adaptadores de la Arquitectura Hexagonal.
 * - Las validaciones de dominio aseguran la integridad antes de
 *   delegar en infraestructura.
 *
 * @usecase UploadFileUseCase
 */
@Injectable()
export class UploadFileUseCase {
  /**
   * Constructor del caso de uso.
   *
   * @param fileStorageRepository - Puerto de almacenamiento de archivos.
   *   Su implementación concreta se inyecta (ejemplo: Azure Blob Storage).
   * @param fileDomainService - Servicio de dominio que aplica reglas
   *   de negocio sobre archivos (extensiones, tamaño máximo, etc.).
   */
  constructor(
    @Inject(FILE_STORAGE_REPOSITORY)
    private readonly fileStorageRepository: FileStorageRepository,
    private readonly fileDomainService: FileDomainService,
  ) {}

  /**
   * Ejecuta la operación de subida de archivo.
   *
   * @param container - Nombre del contenedor o bucket de destino.
   * @param filename - Nombre del archivo a subir (incluye extensión).
   * @param buffer - Contenido binario del archivo.
   * @returns URL pública del archivo subido.
   *
   * @throws {Error} Si el archivo no cumple las reglas de negocio:
   * - Extensión no válida.
   * - Tamaño mayor al permitido.
   *
   * @example
   * ```ts
   * const url = await uploadFileUseCase.execute(
   *   'my-container',
   *   'example.txt',
   *   Buffer.from('Hola mundo')
   * );
   * console.log(url);
   * // https://<account>.blob.core.windows.net/my-container/example.txt
   * ```
   */
  async execute(container: string, filename: string, buffer: Buffer): Promise<string> {
    // ✅ Validaciones de dominio (no técnicas)
    this.fileDomainService.ensureValidExtension(filename, ['txt', 'json', 'md']);
    this.fileDomainService.ensureMaxFileSize(buffer, 2 * 1024 * 1024); // 2 MB

    // ✅ Persistencia delegada al puerto de infraestructura
    return this.fileStorageRepository.upload(container, filename, buffer);
  }
}
