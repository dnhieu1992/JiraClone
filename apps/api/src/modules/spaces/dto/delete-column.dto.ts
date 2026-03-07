import { IsOptional, IsString } from 'class-validator';

export class DeleteColumnDto {
  @IsOptional()
  @IsString()
  moveIssuesToColumnId?: string;
}
