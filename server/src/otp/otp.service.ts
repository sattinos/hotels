import { Injectable } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { OtpEntity } from './otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class OtpService extends CrudServiceOrm<OtpEntity> {
    constructor(
        @InjectRepository(OtpEntity)
        protected readonly rep: Repository<OtpEntity>,
    ) {
        super(rep);
    }

    async generate(msisdn: string): Promise<OtpEntity> {
        const otpEntity = new OtpEntity();
        otpEntity.msisdn = msisdn;
        otpEntity.generated = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false });
        return await this.create(otpEntity);
    }
}
