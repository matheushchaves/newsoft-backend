import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsInt } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'Página atual' })
  @IsPositive()
  @IsInt()
  page: number;

  @ApiProperty({ example: 10, description: 'Tamanho da página' })
  @IsPositive()
  @IsInt()
  pageSize: number;
}
