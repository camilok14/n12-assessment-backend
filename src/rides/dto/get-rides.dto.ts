import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { Ride } from '../schemas/ride.schema';

class Pagination {
  pageNumber: number;
  documentsPerPage: number;
  numberOfDocuments: number;
}

export class GetRidesBodyOutputDTO {
  pagination: Pagination;
  rides: Ride[];
}

export class GetRidesQueryInputDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  documentsPerPage: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber: number;
}
