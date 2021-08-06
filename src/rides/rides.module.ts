import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { Ride, RideSchema } from './schemas/ride.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ride.name, schema: RideSchema, collection: 'rides' }])],
  controllers: [RidesController],
  providers: [RidesService]
})
export class RidesModule {}
