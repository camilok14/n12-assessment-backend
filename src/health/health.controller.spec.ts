import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController]
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should get health', () => {
    const result = controller.getHealth();
    expect(result).toMatchObject({
      environment: 'test',
      message: 'n12-assessment-backend is up and running'
    });
  });
});
