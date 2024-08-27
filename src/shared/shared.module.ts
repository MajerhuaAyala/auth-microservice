import { Global, Module, Provider } from '@nestjs/common';
import { ApiConfigService } from '../config/api-config.service';

const providers: Provider[] = [ApiConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
