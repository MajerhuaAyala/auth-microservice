import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './transport/kafka.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    KafkaModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
