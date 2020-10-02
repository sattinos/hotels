import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ReservedFlatService } from './reserved-flat.service';
import { ReservedFlatController } from './reserved-flat.controller';
import { ReservedFlatEntity } from './reserved-flat.entity';
import { FlatModule } from '../flat/flat.module';
import { LessThan } from 'typeorm';

describe('ReservedFlatService', () => {
  let service: ReservedFlatService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReservedFlatEntity]), FlatModule],
      providers: [ReservedFlatService],
      exports: [ReservedFlatService],
      controllers: [ReservedFlatController]
    }).compile();
    service = module.get<ReservedFlatService>(ReservedFlatService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetch reserved flats', async () => {
    const date = new Date();
    date.setDate(8);
    date.setHours(15, 0, 0, 0);

    // tslint:disable-next-line:no-console
    console.log('date:', date);
    const result = await service.repositery.findOne({
      where: {
        from: LessThan(date)
      }
    });
    // tslint:disable-next-line:no-console
    console.log('reserved flats:', result);
  });
});
