import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

const configure = ClientsModule.register([
  {
    name: 'ACTION_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'app-auth',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-microservice',
      },
    },
  },
]);

@Module({
  imports: [configure],
  exports: [configure],
})
export class KafkaModule {}
