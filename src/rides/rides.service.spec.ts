import { Test, TestingModule } from '@nestjs/testing';
import { RidesService } from './rides.service';

describe('RidesService', () => {
  let service: RidesService;
  const rideModelMock: any = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RidesService, { provide: 'RideModel', useValue: rideModelMock }]
    }).compile();
    service = module.get<RidesService>(RidesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create ride outside busy periods', async () => {
    rideModelMock.create = jest.fn(async () => 'ride');
    const result = await service.createRide(2, '2021-08-06T13:00:00.000Z', 300);
    expect(result).toBe('ride');
    expect(rideModelMock.create).toHaveBeenCalledWith({ distance: 2, startTime: '2021-08-06T13:00:00.000Z', duration: 300, fare: 6 });
  });
  it('should create ride during a busy period', async () => {
    rideModelMock.create = jest.fn(async () => 'ride');
    const result = await service.createRide(10, '2021-08-06T15:30:00.000Z', 3600);
    expect(result).toBe('ride');
    expect(rideModelMock.create).toHaveBeenCalledWith({ distance: 10, startTime: '2021-08-06T15:30:00.000Z', duration: 3600, fare: 27 });
  });
});
