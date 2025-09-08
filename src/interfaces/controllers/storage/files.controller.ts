import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UploadFileUseCase } from '../../../application/use-cases/file/storage/upload-file.use-case';
import { DownloadFileUseCase } from '../../../application/use-cases/file/storage/download-file.use-case';
import { UploadFileDto } from '../../../application/dto/storage/upload-file.dto';

/**
 * Controlador REST para gestión de archivos en Azure Blob Storage.
 *
 * Exposición de endpoints:
 * - POST   `/files` → Subir archivo
 * - GET    `/files/:container/:filename` → Descargar archivo
 *
 * @remarks
 * Cada endpoint delega la lógica a los **casos de uso** (Application Layer),
 * siguiendo el patrón de Arquitectura Hexagonal.
 */
@ApiTags('Almacenamiento en la nube')
@Controller({ path: 'files', version: '1' })
export class FileController {
  constructor(
    private readonly uploadFile: UploadFileUseCase,
    private readonly downloadFile: DownloadFileUseCase,
  ) {}

  /**
   * Subir un archivo a Storage.
   *
   * @param dto - Datos de subida (`UploadFileDto`).
   * @returns URL del archivo subido.
   *
   * @example
   * POST /files
   * ```json
   * {
   *   "container": "my-container",
   *   "filename": "example.txt",
   *   "content": "Hola mundo!"
   * }
   * ```
   */
  @Post()
  @ApiOperation({ summary: 'Subir archivo a Storage' })
  @ApiResponse({ status: 201, description: 'Archivo subido correctamente' })
  async upload(@Body() dto: UploadFileDto) {
    const buffer = Buffer.from(dto.content, 'utf-8');
    const url = await this.uploadFile.execute(dto.container, dto.filename, buffer);
    return { message: 'Archivo subido correctamente', url };
  }

  /**
   * Descargar un archivo desde Storage.
   *
   * @param container - Nombre del contenedor.
   * @param filename - Nombre del archivo.
   * @returns Archivo en formato Buffer convertido a string.
   *
   * @example
   * GET /files/my-container/example.txt
   */
  @Get(':container/:filename')
  @ApiOperation({ summary: 'Descargar archivo de Storage' })
  @ApiResponse({ status: 200, description: 'Archivo descargado correctamente' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  @HttpCode(HttpStatus.OK)
  async download(
    @Param('container') container: string,
    @Param('filename') filename: string,
  ) {
    const buffer = await this.downloadFile.execute(container, filename);
    return {
      filename,
      size: buffer.length,
      content: buffer.toString('utf-8'),
    };
  }
}
