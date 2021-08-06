import { Test, TestingModule } from '@nestjs/testing';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';

describe('RidesController', () => {
  let controller: RidesController;
  let ridesService: RidesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidesController],
      providers: [RidesService, { provide: 'RideModel', useValue: {} }]
    }).compile();
    controller = module.get<RidesController>(RidesController);
    ridesService = module.get<RidesService>(RidesService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create ride', async () => {
    jest.spyOn(ridesService, 'createRide').mockImplementation(async () => 'ride' as any);
    const result = await controller.createRide({ distance: 1, startTime: 'startTime', duration: 9000 });
    expect(result).toBe('ride');
    expect(ridesService.createRide).toHaveBeenCalledWith(1, 'startTime', 9000);
  });
  it('should get rides', async () => {
    jest.spyOn(ridesService, 'getRides').mockImplementationOnce(async () => 'rides' as any);
    const result = await controller.getRides({ documentsPerPage: 10, pageNumber: 1 });
    expect(result).toBe('rides');
    expect(ridesService.getRides).toHaveBeenCalledWith(10, 1);
  });
});
