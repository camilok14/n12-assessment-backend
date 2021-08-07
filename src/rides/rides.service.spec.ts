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
    const result = await service.createRide(2, '2021-08-06T19:00:00.000Z', 300);
    expect(result).toBe('ride');
    expect(rideModelMock.create).toHaveBeenCalledWith({ distance: 2, startTime: '2021-08-06T19:00:00.000Z', duration: 300, fare: 6 });
  });
  it('should create ride including a busy period', async () => {
    rideModelMock.create = jest.fn(async () => 'ride');
    const result = await service.createRide(10, '2021-08-06T15:30:00.000Z', 3600);
    expect(result).toBe('ride');
    expect(rideModelMock.create).toHaveBeenCalledWith({ distance: 10, startTime: '2021-08-06T15:30:00.000Z', duration: 3600, fare: 27 });
  });
  it('should create ride during a busy period', async () => {
    rideModelMock.create = jest.fn(async () => 'ride');
    const result = await service.createRide(10, '2021-08-06T17:00:00.000Z', 3600);
    expect(result).toBe('ride');
    expect(rideModelMock.create).toHaveBeenCalledWith({ distance: 10, startTime: '2021-08-06T17:00:00.000Z', duration: 3600, fare: 27 });
  });
  it('should get rides', async () => {
    rideModelMock.aggregate = jest.fn(async () => ['rides']);
    const result = await service.getRides(10, 1);
    expect(result).toBe('rides');
    expect(rideModelMock.aggregate).toHaveBeenCalledWith([
      { $sort: { startTime: -1 } },
      { $facet: { rides: [{ $addFields: { _id: '$_id' } }], total: [{ $count: 'total' }] } },
      { $unwind: '$total' },
      {
        $project: {
          rides: { $slice: ['$rides', 0, 10] },
          pagination: { numberOfDocuments: '$total.total', pageNumber: { $literal: 1 }, documentsPerPage: { $literal: 10 } }
        }
      }
    ]);
  });
});
