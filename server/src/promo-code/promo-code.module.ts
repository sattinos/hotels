import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';
import { PromoCodeEntity } from './promo-code.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([PromoCodeEntity])],
  providers: [PromoCodeService],
  controllers: [PromoCodeController]
})
export class PromoCodeModule {}
