import { Body, Controller, Post } from '@nestjs/common';
import { CreateRideBodyInputDTO } from './dto/create-ride.dto';
import { RidesService } from './rides.service';
import { Ride } from './schemas/ride.schema';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}
  @Post()
  public async createRide(@Body() body: CreateRideBodyInputDTO): Promise<Ride> {
    const { distance, startTime, duration } = body;
    return await this.ridesService.createRide(distance, startTime, duration);
  }
}
