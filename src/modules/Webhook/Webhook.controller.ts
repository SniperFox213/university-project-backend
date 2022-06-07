import { Controller, Post } from '@nestjs/common';
import { IdeasService } from 'src/modules/Ideas/services';

@Controller("webhook")
export class WebhookController {
  constructor(
    private readonly IdeasService: IdeasService
  ) {}
  
  @Post("idea")
  handleNewIdea() {

  };
};