import { Injectable } from '@nestjs/common';

import { ILocalIdea } from 'src/types';

@Injectable()
export class IdeasService {
  // "Database"
  private ideas: ILocalIdea[] = [];
  public latestId: number = 0;
  
  // Methods
  public getAllIdeas(): ILocalIdea[] {
    return this.ideas;
  };
  
  public getIdeasAfter(id: number): ILocalIdea[] {
    return this.ideas.filter((idea) => idea.id >= id) ?? [];
  };
  
  public getNewIdeas(): ILocalIdea[] {
    return this.getIdeasAfter(this.latestId);
  };
  
  public setLatestIdeaId(id: number) {
    this.latestId = id;
  };
  
  public addNewIdea(idea: ILocalIdea) {
    this.ideas.push(idea);
  };
};