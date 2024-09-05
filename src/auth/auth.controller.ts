import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { SERVICE_NAME } from '../config';

@Controller()
export class AuthController {
  constructor(
    @Inject(SERVICE_NAME) private client: ClientKafka,
    private authService: AuthService,
  ) {}

  @MessagePattern('jwt')
  async getJwt() {
    const user = await firstValueFrom(this.client.send('user', {}));
    return this.authService.createAccessToken(user.role, user.id);
  }

  @MessagePattern('auth.verify.user')
  async verifyToken(@Payload() jwt: string) {
    return this.authService.verifyToken(jwt);
  }
}
