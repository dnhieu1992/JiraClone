import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateColumnDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;
}
