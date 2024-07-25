import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AdditionalSkillsController } from './additional-skills.controller';
import { AdditionalSkillsService } from './additional-skills.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    HttpModule.register({
      headers: {
        authorization: `Bearer ${process.env.TOKEN}`,
      },
    }),
  ],
  controllers: [AdditionalSkillsController],
  providers: [AdditionalSkillsService],
})
export class AdditionalSkillsModule {}
