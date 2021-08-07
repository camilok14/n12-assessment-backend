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
    { startHours: 20, duration: 36000, fare: 0.5 }, // 20:00 hrs - 06:00 hrs
    { startHours: 16, duration: 10800, fare: 1 } // 16:00 hrs - 19:00 hrs
  ];

  /**
   * Calcula la fecha de término de un período a partir de la fecha de inicio y la duración
   * @param startTime Fecha del inicio del período en formato ISO8601
   * @param duration  Cantidad de segundos que dura el período
   *
   * @returns         Fecha del fin del período en formato ISO08601
   */
  private getEndTime(startTime: string, duration: number): string {
    const endDate = new Date(startTime);
    endDate.setSeconds(endDate.getSeconds() + duration);
    return endDate.toISOString();
  }
  public async createRide(distance: number, startTime: string, duration: number): Promise<RideDocument> {
    let fare = this.initialCharge + (distance / this.rateDistance) * this.ratePrice;

    const endTime = this.getEndTime(startTime, duration);

    fare = this.busyPeriods.reduce((acc, busyPeriod) => {
      const busyPeriodStartTime = `${startTime.substring(0, 10)}T${busyPeriod.startHours}:00:00.000Z`;
      const busyPeriodEndtTime = this.getEndTime(busyPeriodStartTime, busyPeriod.duration);
      const rideIsBeforeBusyPeriod = endTime < busyPeriodStartTime;
      const rideIsAfterBusyPeriod = startTime >= busyPeriodEndtTime;
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
