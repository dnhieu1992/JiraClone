import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { IssueType } from '../entities/issue.entity';

export class UpdateIssueDto {
  @IsOptional()
  @IsEnum(IssueType)
  type?: IssueType;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
