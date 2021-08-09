/**
 * Define los tramos de horarios con cargos adicionales.
 */
export class BusyPeriod {
  /**
   * String que representa las horas del inicio del tramo horario con carga adicional.
   */
  startHours: string;

  /**
   * Duración del tramo horario en segundos.
   */
  duration: number;

  /**
   * String que representa las horas del fin del tramo horario con carga adicional.
   */
  endHours: string;

  /**
   * Cantidad adicional en EUR que se le cobra al viaje por ocurrir en el tramo horario de carga adicional.
   */
  fare: number;
}
