import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
