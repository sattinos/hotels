import { Test, TestingModule } from '@nestjs/testing';
import { OtpController } from './otp.controller';

describe('Otp Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OtpController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OtpController = module.get<OtpController>(OtpController);
    expect(controller).toBeDefined();
  });
});
