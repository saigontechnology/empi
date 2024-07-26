import { Injectable } from '@nestjs/common';
import * as employees from 'src/data/list_emp.json';
import { firstValueFrom, map } from 'rxjs';
import { API } from 'src/core/constants';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmployeesService {
  constructor(private readonly httpService: HttpService) {}

  async getEmployees() {
    const results = await Promise.all(
      employees.map((emp) => {
        const url = `${process.env.HOST}${API.GET_SKILLS_N_DOMAIN}/${emp.id}`;
        return firstValueFrom(
          this.httpService.get(url).pipe(
            map((response: any) => {
              return {
                empCode: emp.empCode,
                id: emp.id,
                ...response.data,
              };
            }),
          ),
        );
      }),
    );

    return results;
  }
}
