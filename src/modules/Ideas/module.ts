import { Module } from '@nestjs/common';

import * as Services from './services';
import * as Controllers from './controllers';

@Module({
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class IdeasModule {};