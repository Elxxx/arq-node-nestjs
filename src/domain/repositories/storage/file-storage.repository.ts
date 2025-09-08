/**
 * Puerto: Contrato para almacenamiento de archivos.
 *
 * @remarks
 * - Define las operaciones necesarias para un sistema de almacenamiento.
 * - Implementaciones concretas (Azure, S3, InMemory, Local, etc.) deben cumplir este contrato.
 */
export const FILE_STORAGE_REPOSITORY = Symbol('FILE_STORAGE_REPOSITORY');

export interface FileStorageRepository {
  /**
   * Sube un archivo a un contenedor.
   *
   * @param container - Nombre del contenedor o bucket
   * @param filename - Nombre del archivo
   * @param buffer - Contenido en binario
   * @returns URL pública o identificador del archivo
   */
  upload(container: string, filename: string, buffer: Buffer): Promise<string>;

  /**
   * Descarga un archivo de un contenedor.
   *
   * @param container - Nombre del contenedor o bucket
   * @param filename - Nombre del archivo
   * @returns Contenido del archivo en Buffer
   */
  download(container: string, filename: string): Promise<Buffer>;
}
