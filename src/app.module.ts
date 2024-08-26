import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './transport/kafka.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, KafkaModule],
  controllers: [AppController],
})
export class AppModule {}
