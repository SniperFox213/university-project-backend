import { Module } from '@nestjs/common';
import { WebhookController } from './Webhook.controller';

@Module({
  controllers: [WebhookController]
})
export class WebhookModule {};