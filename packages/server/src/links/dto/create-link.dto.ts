import { IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  readonly fullLink: string;
}
