import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { LoginDto } from '../../../application/dto/auth/login.dto';
import { AuthUser } from '../../../domain/entities/auth/auth-user.entity';

/**
 * Controlador REST para autenticación.
 */
@ApiTags('Autenticación')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  /**
   * Autenticar un usuario.
   *
   * @param dto - Credenciales (`LoginDto`).
   * @returns Entidad `AuthUser` autenticada (sin token).
   *
   * @example
   * POST /auth/login
   * ```json
   * {
   *   "userName": "userName",
   *   "password": "secreto123",
   *   "nombreSistema": "Nombre Sistema"
   * }
   * ```
   */
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuario (sin token)' })
  @ApiResponse({ status: 201, description: 'Login exitoso', type: AuthUser })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() dto: LoginDto): Promise<AuthUser> {
    return this.loginUseCase.execute(dto);
  }
}
