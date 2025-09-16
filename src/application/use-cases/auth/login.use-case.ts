import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user/user.repository';
import { AuthDomainService } from '../../../domain/services/auth/auth.domain-service';
import { LoginDto } from '../../dto/auth/login.dto';
import { LoginResponseDto } from '../../dto/auth/login-response.dto';

/**
 * Caso de uso: Login de usuario.
 *
 * - Verifica credenciales en un tenant específico.
 * - Genera un JWT con tenantId incluido.
 */
@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly authService: AuthDomainService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepo.findByEmailAndTenant(dto.email, dto.tenantId);

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isValid = await this.authService.validatePassword(dto.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.authService.generateToken(user);

    return {
      accessToken: token,
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
      roleName: user.roleName ?? '',
      roleId: user.roleId,
    };
  }
}
