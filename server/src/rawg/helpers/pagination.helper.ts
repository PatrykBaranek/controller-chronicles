import { AxiosResponse } from 'axios';
import { PaginationDto } from './dto/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export function paginateResponse<T>(
  response: AxiosResponse,
  page: number = 1,
  page_size: number = 5,
  returnType: new () => T,
  options: { showTotalPages?: boolean },
): PaginationDto<T> {
  const totalPages = Math.ceil(response.data.count / page_size);

  if (page > totalPages) {
    throw new NotFoundException('Page number cannot be greater than page size');
  }

  const results = response.data.results.map((result: T) =>
    plainToInstance(returnType, result),
  );

  if (!options?.showTotalPages) {
    return {
      totalItems: response.data.count,
      currentPage: page,
      results,
    };
  }

  return {
    totalItems: response.data.count,
    totalPages,
    currentPage: page,
    results,
  };
}
