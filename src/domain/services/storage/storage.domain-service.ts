import { Injectable } from '@nestjs/common';

/**
 * Servicio de dominio para reglas de negocio sobre archivos.
 *
 * @remarks
 * - Aquí se validan invariantes y restricciones de negocio
 *   relacionadas con archivos (no técnicas).
 * - No contiene lógica de Azure, S3 ni infraestructura.
 * - Ejemplo: validar tipos de archivo, tamaños máximos, políticas de seguridad.
 */
@Injectable()
export class FileDomainService {
  /**
   * Verifica que el archivo no exceda un tamaño máximo permitido.
   *
   * @param buffer - Contenido del archivo.
   * @param maxBytes - Límite de tamaño en bytes.
   * @throws {Error} Si el archivo es demasiado grande.
   */
  ensureMaxFileSize(buffer: Buffer, maxBytes: number): void {
    if (buffer.length > maxBytes) {
      throw new Error(`El archivo excede el tamaño máximo permitido de ${maxBytes} bytes`);
    }
  }

  /**
   * Verifica que el archivo tenga una extensión permitida.
   *
   * @param filename - Nombre del archivo.
   * @param allowedExtensions - Lista de extensiones válidas.
   * @throws {Error} Si el archivo no tiene una extensión permitida.
   */
  ensureValidExtension(filename: string, allowedExtensions: string[]): void {
    
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      throw new Error(`La extensión de archivo .${ext} no está permitida`);
    }
  }
}
