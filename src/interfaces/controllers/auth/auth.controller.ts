// src/interfaces/controllers/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from '../../../application/dto/auth/login.dto';
import { LoginResponseDto } from '../../../application/dto/auth/login-response.dto';
import { ApiResponse as GenericResponse } from '../../../shared/types/user/api-response.type';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con email y contraseña' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() dto: LoginDto): Promise<GenericResponse<LoginResponseDto>> {
    const data = await this.loginUseCase.execute(dto);
    return {
      success: true,
      message: 'Login exitoso',
      data,
    };
  }
}
