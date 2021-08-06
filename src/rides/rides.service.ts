import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  private getHoursFromISODate(dateAsISOString: string): number {
    const hoursAsString = dateAsISOString.substring(11, 13);
    return Number(hoursAsString);
  }
  public async createRide(distance: number, startTime: string, duration: number): Promise<RideDocument> {
    let fare = this.initialCharge + (distance / this.rateDistance) * this.ratePrice;

    const startDate = new Date(startTime);
    const endDate = new Date(startTime);
    endDate.setSeconds(startDate.getSeconds() + duration);
    const rideStartHours = this.getHoursFromISODate(startTime);
    const rideEndHours = this.getHoursFromISODate(endDate.toISOString());

    fare = this.busyPeriods.reduce((acc, busyPeriod) => {
      const rideIsBeforeBusyPeriod = rideStartHours < busyPeriod.startHours && rideEndHours < busyPeriod.startHours;
      const rideIsAfterBusyPeriod = rideStartHours >= busyPeriod.endHours && rideEndHours >= busyPeriod.endHours;
      if (rideIsBeforeBusyPeriod || rideIsAfterBusyPeriod) {
        return acc;
      }
      return acc + busyPeriod.fare;
    }, fare);
    return await this.rideModel.create({ distance, startTime, duration, fare });
  }
}
