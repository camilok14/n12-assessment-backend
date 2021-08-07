import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ride {
  @Prop()
  distance: number;

  /**
   * Fecha de inicio del viaje en formato ISO8601
   */
  @Prop()
  startTime: string;

  /**
   * Fecha de fin del viaje en formato ISO8601
   */
   @Prop()
   endTime: string;

  /**
   * Duración del viaje en segundos
   */
  @Prop()
  duration: number;

  @Prop()
  fare: number;
}
export const RideSchema = SchemaFactory.createForClass(Ride);
export type RideDocument = Ride & Document;
