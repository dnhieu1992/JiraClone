import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSpaceDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name?: string;
}
