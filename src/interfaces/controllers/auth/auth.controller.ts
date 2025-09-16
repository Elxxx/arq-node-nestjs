import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LoginDto } from '../../../application/dto/auth/login.dto';
import { LoginResponseDto } from '../../../application/dto/auth/login-response.dto';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';

/**
 * Controlador REST para autenticación.
 *
 * @description
 * Expone endpoints relacionados con autenticación de usuarios:
 * - `POST /auth/login` → Inicia sesión con credenciales.
 * - `POST /auth/logout` → Cierra sesión (cliente elimina el token).
 */
@ApiTags('Autenticación')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  /**
   * Inicia sesión y devuelve un JWT válido.
   *
   * @param dto Credenciales de acceso (`email`, `password`).
   * @returns Objeto con el `accessToken`, `userId`, `email` y `roleName`.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  /**
   * Cierra sesión.
   *
   * @description
   * El backend no invalida tokens JWT (son stateless).
   * El cliente debe eliminar el `accessToken` del almacenamiento local.
   */
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({
    status: 204,
    description: 'Sesión cerrada (token eliminado en cliente)',
  })
  async logout(): Promise<void> {
    // En JWT stateless, el logout es manejado por el cliente (frontend).
    // Podrías implementar blacklist si fuera necesario.
  }
}
