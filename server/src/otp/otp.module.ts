import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './otp.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([OtpEntity]) ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService]
})
export class OtpModule {}
