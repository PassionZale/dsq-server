import { Max, Min } from 'class-validator';

export class Pagination {
  @Min(0)
  offset = 0;

  @Min(1)
  @Max(50)
  limit = 25;
}
