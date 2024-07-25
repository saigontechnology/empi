import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
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
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
