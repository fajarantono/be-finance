import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly icon: string;

  @IsOptional()
  @IsString()
  readonly color: string;

  @IsOptional()
  @IsBoolean()
  readonly isDebit: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;
}
