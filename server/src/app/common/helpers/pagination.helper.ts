import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PaginationDto } from '../dto/pagination.dto';

export function paginate<T>(
  results: unknown[],
  totalItems: number,
  page: number = 1,
  page_size: number = 5,
  returnType: new () => T,
  options: { showTotalPages?: boolean },
): PaginationDto<T> {
  const totalPages = Math.ceil(totalItems / page_size);

  if (page > totalPages) {
    throw new NotFoundException('Page number cannot be greater than page size');
  }

  const mappedResults = results.map((result) => plainToInstance(returnType, result));

  if (!options?.showTotalPages) {
    return {
      totalItems,
      currentPage: page,
      results: mappedResults,
    };
  }

  return {
    totalItems,
    totalPages,
    currentPage: page,
    results: mappedResults,
  };
}
