import { Controller, Get, Param, Logger } from '@nestjs/common';
import { ReservationEntity } from './reservation.entity';
import { CrudController } from '../lib/crud/crud-controller';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController extends CrudController<ReservationEntity> {
    constructor(protected readonly service: ReservationService) {
        super(service);
    }

    @Get('count')
    public async getCount() {
        return await super.getCount();
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ReservationEntity> {
        Logger.log(`trying to get reservation of id: ${id}`);
        const reservation = await this.service.repositery.findOne({
            relations: ['reservedFlats'],
            where: {
                id
            }
        });

        for (let index = 0; index < reservation.reservedFlats.length; index++) {
            const element = reservation.reservedFlats[index];
            reservation.reservedFlats[index] = await this.service.reservedFlatService.repositery.findOne({
                relations: ['flat', 'flatType'],
                where: {
                    id: element.id
                }
            });
        }
        return reservation;

    }
}
