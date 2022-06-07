import { Body, Controller, Post } from '@nestjs/common';
import { IdeasService } from 'src/modules/Ideas/services';

@Controller("webhook")
export class WebhookController {
  constructor(
    private readonly IdeasService: IdeasService
  ) {}
  
  @Post("idea")
  handleNewIdea(@Body() payload: any) {
    console.log('payload:', payload);
    if (payload?.event_type == "form_response") {
      const answers = payload?.form_response?.answers ?? [];
      if (answers?.length < 4) return;

      // Getting answers (hard-coded!!!)
      const person = this.findAnswerById(answers, "RfVfj5xpikID");
      const title = this.findAnswerById(answers, "NLTAPx2C3Fcn");
      const shortDescription = this.findAnswerById(answers, "8i3UOxZr2jXD");
      const description = this.findAnswerById(answers, "a4AvmWasehlj");

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

      console.log('parsed idea:', idea);

      // Adding this idea
      this.IdeasService.addNewIdea(idea);

      // ...and then returning it
      return idea;
    };
  };

  findAnswerById(answers: { id: string, text: string }[], id: string): string | null {
    return answers.find((answer) => answer.id == id)?.text;
  };
};