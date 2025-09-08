// src/shared/types/api-response.type.ts
import { ApiProperty } from '@nestjs/swagger';

/**
 * Tipo genérico para respuestas estandarizadas.
 */
export class ApiResponse<T> {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Operación exitosa' })
  message!: string;

  @ApiProperty({ required: false, description: 'Datos de la respuesta' })
  data?: T;
}
