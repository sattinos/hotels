import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservedFlatEntity } from './reserved-flat.entity';
import { ReservedFlatService } from './reserved-flat.service';
import { FlatModule } from '../flat/flat.module';
import { ReservedFlatController } from './reserved-flat.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([ReservedFlatEntity]), FlatModule ],
  providers: [ReservedFlatService],
  exports: [ReservedFlatService],
  controllers: [ReservedFlatController]
})
export class ReservedFlatModule {}
