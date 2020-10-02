import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { AuthGuard } from './auth.guard';
import { SessionGuard } from './session.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), UserModule],
  providers: [AuthGuard, SessionGuard],
  exports: [AuthGuard]
})
export class AuthModule { }
