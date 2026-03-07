import { IsString } from 'class-validator';

export class MoveIssueDto {
  @IsString()
  sourceColumnId: string;

  @IsString()
  targetColumnId: string;
}
