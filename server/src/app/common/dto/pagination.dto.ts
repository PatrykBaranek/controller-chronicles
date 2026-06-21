import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiProperty({ description: 'Total number of items across all pages' })
  totalItems: number;

  @ApiProperty({
    description: 'Total number of pages',
    required: false,
  })
  totalPages?: number;

  @ApiProperty({ description: 'Current page number' })
  currentPage: number;

  @ApiProperty({ description: 'Results for the current page' })
  results: T[];
}
