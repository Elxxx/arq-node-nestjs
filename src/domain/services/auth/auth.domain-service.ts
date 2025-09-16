import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user/user.entity';
import { SignOptions } from 'jsonwebtoken'; // ✅ importar el tipo correcto

/**
 * Servicio de dominio para `Auth`.
 *
 * - Encapsula validación de contraseñas y generación de JWT.
 * - Lee configuración desde `ConfigService`.
 */
@Injectable()
export class AuthDomainService {
  constructor(private readonly configService: ConfigService) {}

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      roleId: user.roleId,           // siempre existe
      roleName: user.roleName ?? '', // opcional
    };

    const secret = this.configService.get<string>('jwt.secret', 'default-secret');
    const expiresIn = this.configService.get<string>('jwt.expiresIn', '1h');

    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };

    return jwt.sign(payload, secret as jwt.Secret, options);
  }
}
