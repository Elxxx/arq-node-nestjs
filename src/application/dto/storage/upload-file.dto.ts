import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * DTO de entrada para subir un archivo a Storage (Azure, AWS, etc.).
 *
 * @remarks
 * Define la estructura esperada en el cuerpo de la request para `FileController`.
 */
export class UploadFileDto {
  /**
   * Nombre del contenedor o bucket donde se guardará el archivo.
   *
   * - Obligatorio.
   * - Texto simple, máximo 100 caracteres.
   *
   * @example "my-container"
   */
  @ApiProperty({ example: 'my-container', description: 'Nombre del contenedor o bucket' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  container!: string;

  /**
   * Nombre del archivo (incluye extensión).
   *
   * - Obligatorio.
   * - Máximo 255 caracteres.
   *
   * @example "example.txt"
   */
  @ApiProperty({ example: 'example.txt', description: 'Nombre del archivo (incluye extensión)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  filename!: string;

  /**
   * Contenido del archivo en texto plano.
   *
   * - Obligatorio.
   * - Se transformará internamente a `Buffer` para su almacenamiento.
   *
   * @example "Hola mundo!"
   */
  @ApiProperty({ example: 'Hola mundo!', description: 'Contenido del archivo en texto plano' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
