import { Controller } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { OtpEntity } from './otp.entity';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController extends CrudController<OtpEntity> {
    constructor(protected readonly service: OtpService) {
        super(service);
    }
}
