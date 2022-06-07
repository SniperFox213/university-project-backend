import { Body, Controller, Post } from '@nestjs/common';
import { IdeasService } from 'src/modules/Ideas/services';

@Controller("webhook")
export class WebhookController {
  constructor(
    private readonly IdeasService: IdeasService
  ) {}
  
  @Post("idea")
  handleNewIdea(@Body() payload: any) {
    if (payload?.event_type == "form_response") {
      const response = payload.form_response ?? {};
      if (response.answers?.length < 4) return;

      // Getting answers (hard-coded!!!)
      const person = response.answers[0]?.text;
      const title = response.answers[1]?.text;
      const shortDescription = response.answers[2]?.text;
      const description = response.answers[3]?.text;

      // Checking if required fields exist
      if (!person || !description) return;

      // Getting latest id
      const allIdeas = this.IdeasService.getAllIdeas() ?? [];
      const latestId = allIdeas[allIdeas.length - 1]?.id ?? 0;
      
      // Creating new idea
      const idea = { 
        id: latestId + 1,
        title,
        description,
        shortDescription,
        person,
      };

      // Adding this idea
      this.IdeasService.addNewIdea(idea);

      // ...and then returning it
      return idea;
    };
  };
};