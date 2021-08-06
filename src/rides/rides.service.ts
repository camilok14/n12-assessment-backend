import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetRidesBodyOutputDTO } from './dto/get-rides.dto';
import { Ride, RideDocument } from './schemas/ride.schema';

@Injectable()
export class RidesService {
  constructor(@InjectModel(Ride.name) private readonly rideModel: Model<RideDocument>) {}
  private readonly initialCharge = 1;
  private readonly ratePrice = 0.5;
  private readonly rateDistance = 0.2; // 1/5
  private readonly busyPeriods = [
    { startHours: 20, endHours: 6, fare: 0.5 },
    { startHours: 16, endHours: 19, fare: 1 }
  ];
  public async createRide(distance: number, startTime: string, duration: number): Promise<RideDocument> {
    let fare = this.initialCharge + (distance / this.rateDistance) * this.ratePrice;

    const startDate = new Date(startTime);
    const endDate = new Date(startTime);
    endDate.setSeconds(startDate.getSeconds() + duration);
    const endTime = endDate.toISOString();

    fare = this.busyPeriods.reduce((acc, busyPeriod) => {
      const busyPeriodStartTime = `${startTime.substring(0, 10)}T${busyPeriod.startHours}:00:00.000Z`;
      const busyPeriodEndtTime = `${startTime.substring(0, 10)}T${busyPeriod.endHours}:00:00.000Z`;
      const rideIsBeforeBusyPeriod = startTime < busyPeriodStartTime && endTime < busyPeriodStartTime;
      const rideIsAfterBusyPeriod = startTime >= busyPeriodEndtTime && endTime >= busyPeriodEndtTime;
      if (rideIsBeforeBusyPeriod || rideIsAfterBusyPeriod) {
        return acc;
      }
      return acc + busyPeriod.fare;
    }, fare);
    return await this.rideModel.create({ distance, startTime, duration, fare });
  }
  public async getRides(documentsPerPage: number, pageNumber: number): Promise<GetRidesBodyOutputDTO> {
    const [result] = await this.rideModel.aggregate([
      {
        $sort: { startTime: -1 }
      },
      {
        $facet: {
          rides: [{ $addFields: { _id: '$_id' } }],
          total: [{ $count: 'total' }]
        }
      },
      { $unwind: '$total' },
      {
        $project: {
          rides: {
            $slice: ['$rides', documentsPerPage * (pageNumber - 1), documentsPerPage]
          },
          pagination: {
            numberOfDocuments: '$total.total',
            pageNumber: { $literal: pageNumber },
            documentsPerPage: { $literal: documentsPerPage }
          }
        }
      }
    ]);
    return result;
  }
}
