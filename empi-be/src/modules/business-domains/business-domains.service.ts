import { Injectable } from '@nestjs/common';
import { API } from 'src/core/constants';
import { BusinessDomainsDto } from './dto/business-domains.dto';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BusinessDomainsService {
  constructor(private readonly httpService: HttpService) {}

  async addDomainByEmpId(data: BusinessDomainsDto) {
    const url = `${process.env.HOST}${API.ADD_DOMAIN}`;
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
      message: 'Business domain has been added successfully!',
    };
  }

  async deleteDomainById(id: number) {
    const url = `${process.env.HOST}${API.DELETE_DOMAIN}/${id}`;
    await firstValueFrom(
      this.httpService.delete(url).pipe(
        map((response: any) => {
          return response.data;
        }),
      ),
    );

    return {
      message: 'Business domain has been deleted successfully!',
    };
  }
}
