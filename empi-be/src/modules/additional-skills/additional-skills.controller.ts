import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AdditionalSkillsService } from './additional-skills.service';
import { AddtionalSkillsDto } from './dto/addtional-skills.dto';

@Controller('additional-skills')
export class AdditionalSkillsController {
  constructor(private addiontalSkillsService: AdditionalSkillsService) {}

  @Post()
  async addSkillByEmpId(@Body() data: AddtionalSkillsDto) {
    return await this.addiontalSkillsService.addSkillByEmpId(data);
  }

  @Delete('/:id')
  async deleteSkillById(@Param('id') id: number) {
    return await this.addiontalSkillsService.deleteSkillById(id);
  }
}
