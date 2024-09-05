import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

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
      const { ...user } = await this.jwtService.verifyAsync(token);
      return this.jwtService.signAsync(user);
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Invalid token',
      });
    }
  }
}
