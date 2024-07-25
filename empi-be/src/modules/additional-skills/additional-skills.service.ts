import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AddtionalSkillsDto } from './dto/addtional-skills.dto';
import { firstValueFrom, map } from 'rxjs';
import { API } from 'src/core/constants';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AdditionalSkillsService {
  constructor(private readonly httpService: HttpService) {}

  async addSkillByEmpId(data: AddtionalSkillsDto) {
    const url = `${process.env.HOST}${API.ADD_ADDITIONAL_SKILL}`;
    await firstValueFrom(
      this.httpService
        .post(url, {
          ...data,
          isPrimary: false,
          monthOfExperience: 0,
        })
        .pipe(
          map((response: any) => {
            return response.data;
          }),
        ),
    );
    return {
      message: 'Additional skill has been added successfully!',
    };
  }

  async deleteSkillById(id: number) {
    const url = `${process.env.HOST}${API.DELETE_ADDITIONAL_SKILL}/${id}`;
    await firstValueFrom(
      this.httpService.delete(url).pipe(
        map((response: any) => {
          return response.data;
        }),
      ),
    );

    return {
      message: 'Additional skill has been deleted successfully!',
    };
  }
}
