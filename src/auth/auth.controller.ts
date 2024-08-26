import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AuthController {
  constructor(
    @Inject('ACTION_SERVICE') private client: ClientKafka,
    private authService: AuthService,
  ) {}

  @MessagePattern('jwt')
  async getJwt() {
    const user = await firstValueFrom(this.client.send('user', {}));
    return this.authService.createAccessToken(user.role, user.id);
  }
}
