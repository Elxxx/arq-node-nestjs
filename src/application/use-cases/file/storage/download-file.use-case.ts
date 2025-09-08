import { Injectable, Inject } from '@nestjs/common';
import {
  FileStorageRepository,
  FILE_STORAGE_REPOSITORY,
} from '../../../../domain/repositories/storage/file-storage.repository';
import { FileDomainService } from '../../../../domain/services/storage/storage.domain-service';

/**
 * Caso de uso: Descargar archivo desde un sistema de almacenamiento.
 *
 * @description
 * Encapsula la lógica de aplicación para recuperar un archivo de un contenedor
 * a través del puerto `FileStorageRepository`.
 *
 * Integra reglas de negocio del dominio (`FileDomainService`) para asegurar
 * que solo se permitan extensiones válidas antes de proceder a la descarga.
 *
 * @remarks
 * - No depende de detalles técnicos de la infraestructura (Azure, S3, Local, etc.).
 * - Aplica el patrón de puertos y adaptadores de la Arquitectura Hexagonal.
 * - Valida invariantes de negocio antes de ejecutar la operación técnica.
 *
 * @usecase DownloadFileUseCase
 */
@Injectable()
export class DownloadFileUseCase {
  /**
   * Constructor del caso de uso.
   *
   * @param fileStorageRepository - Puerto de almacenamiento de archivos
   *   (implementado en infraestructura con Azure Blob Storage, S3, etc.).
   * @param fileDomainService - Servicio de dominio encargado de validar
   *   reglas de negocio sobre archivos (extensiones, tamaños, etc.).
   */
  constructor(
    @Inject(FILE_STORAGE_REPOSITORY)
    private readonly fileStorageRepository: FileStorageRepository,
    private readonly fileDomainService: FileDomainService,
  ) {}

  /**
   * Ejecuta la operación de descarga de archivo.
   *
   * @param container - Nombre del contenedor o bucket de origen.
   * @param filename - Nombre del archivo a descargar.
   * @returns El archivo en formato `Buffer`.
   *
   * @throws {Error} Si el archivo no cumple las reglas de dominio
   *   (ejemplo: extensión no permitida).
   * @throws {Error} Si el archivo no existe en el contenedor.
   *
   * @example
   * ```ts
   * const buffer = await downloadFileUseCase.execute(
   *   'my-container',
   *   'document.txt'
   * );
   * console.log(buffer.toString('utf-8')); // "Contenido del archivo"
   * ```
   */
  async execute(container: string, filename: string): Promise<Buffer> {
    // ✅ Validación de reglas de dominio antes de acceder al repositorio
    this.fileDomainService.ensureValidExtension(filename, ['txt', 'json', 'md']);

    // 📂 Recupera el archivo del almacenamiento
    return this.fileStorageRepository.download(container, filename);
  }
}
