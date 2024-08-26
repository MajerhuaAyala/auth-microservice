import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(role: any, userId: any) {
    return this.jwtService.signAsync({
      userId,
      role,
    });
  }

  async verifyToken(token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: 'recontra-secreto',
      });
      return this.jwtService.signAsync(user);
    } catch (error) {
      return { error: 'token no valido' };
    }
  }
}
