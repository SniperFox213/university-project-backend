import { Module } from '@nestjs/common';
import { IdeasModule } from '../Ideas/module';
import { WebhookController } from './Webhook.controller';

@Module({
  imports: [IdeasModule],
  controllers: [WebhookController]
})
export class WebhookModule {};