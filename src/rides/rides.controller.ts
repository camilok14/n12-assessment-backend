import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRideBodyInputDTO } from './dto/create-ride.dto';
import { GetRidesBodyOutputDTO, GetRidesQueryInputDTO } from './dto/get-rides.dto';
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

  @Get()
  public async getRides(@Query() query: GetRidesQueryInputDTO): Promise<GetRidesBodyOutputDTO> {
    const { documentsPerPage, pageNumber } = query;
    return await this.ridesService.getRides(documentsPerPage, pageNumber);
  }
}
