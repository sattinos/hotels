import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContentsToolModule } from './contents-tool/contents-tool.module';
import { BedsModule } from './beds/beds.module';
import { RoomModule } from './rooms/room.module';
import { FlatModule } from './flat/flat.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationLogModule } from './reservation-log/reservation-log.module';
import { FlatTypeService } from './flat-type/flat-type.service';
import { ReservedFlatService } from './reserved-flat/reserved-flat.service';
import { ReservedFlatModule } from './reserved-flat/reserved-flat.module';
import { FlatTypeModule } from './flat-type/flat-type.module';
import { PromoCodeModule } from './promo-code/promo-code.module';
import { OtpModule } from './otp/otp.module';
import { OtpnpmModule } from './run/otpnpm/otpnpm.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MenuItemModule } from './menu-item/menu-item.module';

import 'reflect-metadata';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ContentsToolModule,
    UserModule,
    BedsModule,
    RoomModule,
    FlatModule,
    ReservationModule,
    ReservationLogModule,
    ReservedFlatModule,
    FlatTypeModule,
    PromoCodeModule,
    OtpModule,
    OtpnpmModule,
    AuthModule,
    AdminModule,
    MenuItemModule
  ],
  controllers: [AppController],
  providers: [AppService, FlatTypeService, ReservedFlatService]
})
export class AppModule {
}
