import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  public getHealth(): { environment: string; message: string } {
    return {
      environment: process.env.NODE_ENV,
      message: 'n12-assessment-backend is up and running'
    };
  }
}
