import { Module } from '@nestjs/common';
import { AdditionalSkillsModule } from './modules/additional-skills/additional-skills.module';
import { BusinessDomainsModule } from './modules/business-domains/business-domains.module';
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [AdditionalSkillsModule, BusinessDomainsModule, EmployeesModule],
})
export class AppModule {}
