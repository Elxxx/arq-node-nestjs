// src/domain/services/user/auth/auth.domain-service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import { User } from '../../../entities/user/user.entity';

@Injectable()
export class AuthDomainService {
  constructor(private readonly configService: ConfigService) {}

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.roleName,
    };

    const secret: Secret = this.configService.get<string>('jwt.secret', 'default-secret');

    // 👇 cast explícito para que TS lo entienda como StringValue o number
    const expiresIn: SignOptions['expiresIn'] = this.configService.get<string>(
      'jwt.expiresIn',
      '1h',
    ) as SignOptions['expiresIn'];

    const options: SignOptions = { expiresIn };

    return jwt.sign(payload, secret, options);
  }
}
