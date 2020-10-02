import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from '../otp/otp.module';
import { ContentsToolModule } from '../contents-tool/contents-tool.module';
import { MenuItemModule } from '../menu-item/menu-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    OtpModule,
    ContentsToolModule,
    MenuItemModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
