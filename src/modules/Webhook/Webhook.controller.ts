import { Body, Controller, Logger, Post } from '@nestjs/common';
import { IdeasService } from 'src/modules/Ideas/services';

@Controller("webhook")
export class WebhookController {
  constructor(
    private readonly IdeasService: IdeasService
  ) {}

  private readonly logger = new Logger(WebhookController.name);
  
  @Post("idea")
  handleNewIdea(@Body() payload: any) {
    this.logger.debug('Recieved new webhook payload:', payload);

    if (payload?.eventType == "FORM_RESPONSE") {
      const answers = payload?.data?.fields ?? [];
      if (answers?.length < 4) return;

      // Getting answers (hard-coded!!!)
      const person = this.findAnswerById(answers, "question_mKMyr7");
      const title = this.findAnswerById(answers, "question_wLdyL1");
      const shortDescription = this.findAnswerById(answers, "question_npL9pb");
      const description = this.findAnswerById(answers, "question_31r5oW");

      // Checking if required fields exist
      if (!person || !description) return;

      // Creating new idea
      const idea = {
        title,
        description,
        shortDescription,
        person,
      };

      this.logger.log('Added idea:', idea);

      // Adding this idea
      this.IdeasService.addNewIdea(idea);

      // ...and then returning it
      return idea;
    };
  };

  findAnswerById(answers: { key: string, value: string }[], id: string): string | null {
    return answers.find((answer) => answer.key == id)?.value;
  };
};