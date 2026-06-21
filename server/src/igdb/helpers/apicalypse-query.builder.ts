export interface ApicalypseQueryOptions {
  fields?: string[];
  where?: string;
  search?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

/**
 * Builds an Apicalypse query body for a regular IGDB endpoint request.
 * Apicalypse clauses are order-sensitive in practice (search before where),
 * so this keeps a fixed clause order rather than letting callers control it.
 */
export function buildApicalypseQuery(options: ApicalypseQueryOptions): string {
  const clauses: string[] = [];

  if (options.fields?.length) {
    clauses.push(`fields ${options.fields.join(',')};`);
  }

  if (options.search) {
    clauses.push(`search "${options.search}";`);
  }

  if (options.where) {
    clauses.push(`where ${options.where};`);
  }

  if (options.sort) {
    clauses.push(`sort ${options.sort};`);
  }

  if (options.limit !== undefined) {
    clauses.push(`limit ${options.limit};`);
  }

  if (options.offset !== undefined) {
    clauses.push(`offset ${options.offset};`);
  }

  return clauses.join(' ');
}

/**
 * Builds the matching /count query: count endpoints only accept
 * search/where, no fields/sort/limit/offset.
 */
export function buildApicalypseCountQuery(
  options: Pick<ApicalypseQueryOptions, 'where' | 'search'>,
): string {
  const clauses: string[] = [];

  if (options.search) {
    clauses.push(`search "${options.search}";`);
  }

  if (options.where) {
    clauses.push(`where ${options.where};`);
  }

  return clauses.join(' ');
}
