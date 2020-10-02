import { Module } from '@nestjs/common';
import { BedsService } from './beds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedEntity } from './bed.entity';
import { BedsController } from './beds.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([BedEntity])],
  providers: [BedsService],
  controllers: [BedsController]
})
export class BedsModule {}
