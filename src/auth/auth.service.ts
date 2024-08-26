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
}
