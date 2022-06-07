import { Controller, Get } from '@nestjs/common';

import { IdeasService } from 'src/modules/Ideas/services';

@Controller("ideas")
export class IdeasController {
  constructor(
    private readonly IdeasService: IdeasService,
  ) {}
  
  @Get()
  new() {
    return {
      ideas: this.IdeasService.getNewIdeas()
    }
  };
};