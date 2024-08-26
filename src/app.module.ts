import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './transport/kafka.module';

@Module({
  imports: [AuthModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
