import { IsInt, IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class CreateRideBodyInputDTO {
  @IsNumber()
  @IsPositive()
  distance: number;

  @IsISO8601()
  startTime: string;

  @IsInt()
  @IsPositive()
  duration: number;
}
