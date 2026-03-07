import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { IssueType } from '../entities/issue.entity';

export class CreateIssueDto {
  @IsEnum(IssueType)
  type: IssueType;

  @IsString()
  @MaxLength(240)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  columnId: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
