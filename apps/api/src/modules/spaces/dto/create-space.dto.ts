import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SpaceTemplate } from '../entities/space.entity';

export class CreateSpaceDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  key?: string;

  @IsEnum(SpaceTemplate)
  template: SpaceTemplate;
}
