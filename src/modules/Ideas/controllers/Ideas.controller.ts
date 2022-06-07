import { Body, Controller, Get, Post } from '@nestjs/common';

import { IdeasService } from 'src/modules/Ideas/services';

@Controller("ideas")
export class IdeasController {
  constructor(
    private readonly IdeasService: IdeasService,
  ) {}
  
  @Get("new")
  new() {
    return {
      ideas: this.IdeasService.getNewIdeas()
    }
  };

  @Post("setLastId")
  setLastId(@Body() payload: { ideaId: number }) {
    if (!payload?.ideaId) return;

    this.IdeasService.setLatestIdeaId(payload.ideaId + 1);
  };
};