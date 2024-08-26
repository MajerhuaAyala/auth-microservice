import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KafkaModule } from '../transport/kafka.module';

@Module({
  controllers: [AuthController],
  imports: [KafkaModule],
})
export class AuthModule {}
