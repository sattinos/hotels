import { Test, TestingModule } from '@nestjs/testing';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './otp.entity';

import * as otpGenerator from 'otp-generator';

describe('OtpService', () => {
  let service: OtpService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([OtpEntity])],
      controllers: [OtpController],
      providers: [OtpService]
    }).compile();
    service = module.get<OtpService>(OtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create an otp entity', async () => {
    const otpEntity = new OtpEntity();
    otpEntity.msisdn = '0543202636';
    otpEntity.generated = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false });

    const createdEntity = await service.create(otpEntity);
    expect(createdEntity).toBeDefined();
    // tslint:disable-next-line:no-console
    console.log('created entity:', createdEntity);
  });
});
