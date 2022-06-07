import { Module } from '@nestjs/common';

import * as Modules from '../';

@Module({
  imports: [...Object.values(Modules)]
})
export class ApplicationModule {};