import { Controller, Get, Query, Post, Body, Put, Param, Logger } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { FlatTypeEntity } from './flat-type.entity';
import { FlatTypeService } from './flat-type.service';
import { DesiredReservationChunk } from '../reservation/reservation.entity';
import { UserEntity } from '../user/user.entity';

interface ReserveRequest {
    from: Date;
    to: Date;
    desiredChunks: DesiredReservationChunk[];
    reserverID: number;
    channel: string;
    fullName: string;
    phone: string;
    city: string;
    reservers: UserEntity[];
}

@Controller('flat-type')
export class FlatTypeController extends CrudController<FlatTypeEntity> {
    constructor(protected readonly service: FlatTypeService) {
        super(service);
    }

    @Get('/getFlatType')
    async getFlatType(@Query('type') type: string) {
        const flatType = await this.service.getFlatType(type);
        return flatType;
    }

    @Get('/getFlatTypes')
    async getFlatTypes() {
        return await this.service.getFlatsTypes();
    }

    @Get('/getTotalFlats')
    async getTotalFlats(@Query('type') type: string) {
        return await this.service.getTotalFlats(type);
    }

    @Get('/getAvailableFlatsCount')
    async getAvailableFlatsCount(@Query('for') forDate: Date,
                                 @Query('to') toDate: Date,
                                 @Query('type') type: string) {
        return await this.service.getAvailableFlatsCount(forDate, type, toDate);
    }

    @Post('/reserve')
    async reserve(@Body() reserveRequest: ReserveRequest) {
        let reservers = reserveRequest.reservers;
        if ( !reservers ) {
            const newReserver = await this.service.userService.getOne(reserveRequest.reserverID);
            reservers = [newReserver];
        }
        return await this.service.reserve(reserveRequest.from,
                                          reserveRequest.to,
                                          reserveRequest.desiredChunks,
                                          reserveRequest.channel,
                                          reservers);
    }

    @Post('/customerReserve')
    async customerReserve(@Body() customerRequest: ReserveRequest) {
        Logger.log('customerReserve');
        Logger.log(customerRequest);

        return await this.service.customerReserve(customerRequest.from,
                                          customerRequest.to,
                                          customerRequest.desiredChunks,
                                          customerRequest.channel,
                                          customerRequest.fullName,
                                          customerRequest.phone,
                                          customerRequest.city);
    }

    @Put(':reservationID')
    async modify( @Param('reservationID') reservationID: number,
                  @Body() reserveRequest: ReserveRequest) {
        reservationID = parseInt(reservationID as any, 10);
        console.log('reservationID:', reservationID);

        const oldReservation = await this.service.reservationService.delete(reservationID);
        await this.service.dereserve(oldReservation.reservedFlats);
        const newReserver = await this.service.userService.getOne(reserveRequest.reserverID);
        const reservers = oldReservation.reservers;
        const index = reservers.findIndex( (reserverEntity: UserEntity) => reserverEntity.id === newReserver.id);
        if ( index === -1) {
            reservers.push(newReserver);
        }
        reserveRequest.reservers = reservers;
        return await this.reserve(reserveRequest);
    }

    @Get('/getReservedFlatsFor')
    async getReservedFlatsFor(@Query('for') forDate: Date, @Query('type') type: string) {
        const flatType = await this.service.getFlatType(type);
        return await this.service.reservedFlatService.getReservedFlatsFor(forDate, flatType);
    }
}
