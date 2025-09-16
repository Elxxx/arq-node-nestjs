import { Injectable } from '@nestjs/common';
import { AuthDomainService } from '../../../domain/services/auth/auth.domain-service';
import { User } from '../../../domain/entities/user/user.entity';

/**
 * Caso de uso: Refresh token.
 *
 * @description
 * - Genera un nuevo access token a partir del usuario autenticado.
 */
@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly authService: AuthDomainService) {}

  async execute(user: User): Promise<{ accessToken: string }> {
    const token = this.authService.generateToken(user);
    return { accessToken: token };
  }
}
