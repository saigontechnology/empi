import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class AddtionalSkillsDto {
  @IsNotEmpty()
  @IsInt()
  employeeId: number;

  @IsInt()
  proficiency?: number;

  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsInt()
  additionalSkillId: number;
}
