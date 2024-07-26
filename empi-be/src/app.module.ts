import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { AdditionalSkillsModule } from './modules/additional-skills/additional-skills.module';
import { BusinessDomainsModule } from './modules/business-domains/business-domains.module';
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [AdditionalSkillsModule, BusinessDomainsModule, EmployeesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
