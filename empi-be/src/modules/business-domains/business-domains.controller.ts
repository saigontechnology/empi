import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BusinessDomainsService } from './business-domains.service';
import { BusinessDomainsDto } from './dto/business-domains.dto';

@Controller('business-domains')
export class BusinessDomainsController {
  constructor(private businessDomainsService: BusinessDomainsService) {}

  @Post()
  async addDomainByEmpId(@Body() data: BusinessDomainsDto) {
    return await this.businessDomainsService.addDomainByEmpId(data);
  }

  @Delete('/:id')
  async deleteDomainById(@Param('id') id: number) {
    return await this.businessDomainsService.deleteDomainById(id);
  }
}
