import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BusinessDomainsController } from './business-domains.controller';
import { BusinessDomainsService } from './business-domains.service';
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
  controllers: [BusinessDomainsController],
  providers: [BusinessDomainsService],
})
export class BusinessDomainsModule {}
