import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class BusinessDomainsDto {
  @IsNotEmpty()
  @IsInt()
  employeeId: number;

  @IsInt()
  proficiency?: number;

  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsInt()
  businessDomainId: number;
}
