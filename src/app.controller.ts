import { Controller, Inject } from '@nestjs/common';
import { Admin, Kafka } from 'kafkajs';
import { ClientKafka } from '@nestjs/microservices';
import { BROKERS, SERVICE_NAME, TOPICS_TO_WHICH_RESPONSE } from './config';

@Controller()
export class AppController {
  private admin: Admin;
  constructor(@Inject(SERVICE_NAME) private client: ClientKafka) {}

  async onModuleInit() {
    const services = TOPICS_TO_WHICH_RESPONSE;

    for (const service of services) {
      this.client.subscribeToResponseOf(service);
    }

    const kafka = new Kafka({
      clientId: 'auction-app',
      brokers: BROKERS,
    });

    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    const topicList = [];
    for (const service of services) {
      if (!topics.includes(service)) {
        topicList.push({
          topic: service,
          numPartitions: 10,
          replicationFactor: 1,
        });
      }

      if (!topics.includes(`${service}.reply`)) {
        topicList.push({
          topic: `${service}.reply`,
          numPartitions: 10,
          replicationFactor: 1,
        });
      }
    }

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }
}
