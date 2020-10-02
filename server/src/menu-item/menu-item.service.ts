import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { MenuItemEntity } from './menu-item.entity';
import config, { RunMode } from '../app.config';
import appLogger from '../logger';
import { generateRandomToken } from '../lib/mathHelpers/random';

export enum SystemEntity {
    bed,
    room,
    flatType,
    flatInstance,
    reservation,
    reservationLog,
    reservedFlat,
    user,
    otp,
    promoCode,
    localization
}

interface ToolDataMenuItemConfig {
    uID?: string;
    name: string;
    to?: string;
    className: string;
    metaInfoEntityPath?: string;
    entity?: SystemEntity;
    parentuID?: string;

    createPath?: string;
    updatePath?: string;
    deletePath?: string;
}

const mainPath = (config.runMode === RunMode.WebPack) ? '' : '/admin';

const toolPaths = {
    login: `${mainPath}/`,
    welcome: `${mainPath}/welcome`,
    register: `${mainPath}/register`,
    forgetpwd: `${mainPath}/forgetpwd`,
    resetpwd: `${mainPath}/resetpwd`,

    vaBed: `${mainPath}/va-bed`,
    crBed: `${mainPath}/cr-bed`,
    upBed: `${mainPath}/up-bed`,

    vaRoom: `${mainPath}/va-room`,
    crRoom: `${mainPath}/cr-room`,
    upRoom: `${mainPath}/up-room`,

    vaFlatType: `${mainPath}/va-flatType`,
    crFlatType: `${mainPath}/cr-flatType`,
    upFlatType: `${mainPath}/up-flatType`,

    crReservation: `${mainPath}/cr-reservation`,
    upReservation: `${mainPath}/up-reservation`,
    vaReservation: `${mainPath}/va-reservation`,

    crLocalization: `${mainPath}/cr-localization`,
    upLocalization: `${mainPath}/up-localization`,
    vaLocalization: `${mainPath}/va-localization`,

    vaReservedFlat: `${mainPath}/va-reservedFlat`,
    vaReservationLog: `${mainPath}/va-reservationLog`,

    flatAvailability: `${mainPath}/flat-availability`,

    save: `${mainPath}/save`
};

@Injectable()
export class MenuItemService extends CrudServiceOrm<MenuItemEntity> {
    constructor(
        @InjectRepository(MenuItemEntity)
        protected readonly rep: Repository<MenuItemEntity>
    ) {
        super(rep);
        setTimeout(async () => {
            // await this.createMenusEntity();
            // const res = await this.rep.delete({});            console.log('delete menus: ', res);
        }, 2000);
    }

    createMenusEntity = async () => {
        const menuItemsConfigs: ToolDataMenuItemConfig[] = [
            { name: 'Core', className: 'menu', uID: 'co' },
            { name: 'System Entities', className: 'menu', uID: 'se' },
            { name: 'Tracking', className: 'menu', uID: 'tr' },

            { name: 'Bed', to: toolPaths.vaBed, className: 'menuItem', parentuID: 'se', metaInfoEntityPath: '/beds', entity: SystemEntity.bed },
            { name: 'Room', to: toolPaths.vaRoom, className: 'menuItem', parentuID: 'se', metaInfoEntityPath: '/rooms', entity: SystemEntity.room },
            { name: 'Flat Type', to: toolPaths.vaFlatType, className: 'menuItem', parentuID: 'se', metaInfoEntityPath: '/flat-type', entity: SystemEntity.flatType },
            { name: 'Reservation', to: toolPaths.vaReservation, className: 'menuItem', parentuID: 'se', metaInfoEntityPath: '/reservations', entity: SystemEntity.reservation },
            { name: 'Reserved Flat', to: toolPaths.vaReservedFlat, className: 'menuItem', parentuID: 'se', metaInfoEntityPath: '/reserved-flat', entity: SystemEntity.reservedFlat },
            { name: 'Flat Availability', to: toolPaths.flatAvailability, className: 'menuItem', parentuID: 'se', },

            { name: 'Localization', to: toolPaths.vaLocalization, className: 'menuItem', parentuID: 'co', metaInfoEntityPath: '/localization', entity: SystemEntity.localization },

            { name: 'Reservation Log', to: toolPaths.vaReservationLog, className: 'menuItem', parentuID: 'tr', metaInfoEntityPath: '/reservation-log', entity: SystemEntity.reservationLog }
        ];
        await this.buildMenus(menuItemsConfigs);
    }

    async buildMenus(itemsConfigs: ToolDataMenuItemConfig[]) {
        try {
            for (let index = 0; index < itemsConfigs.length; index++) {
                const configItem = itemsConfigs[index];
                const menuEntity = new MenuItemEntity();
                Object.assign(menuEntity, configItem);
                let created = null;
                if (!configItem.parentuID) {
                    created = await this.create(menuEntity);
                    appLogger.winstonLogger.info(`${created} main menu has been successfully created`);
                    // console.log(`${created} main menu has been successfully created`);
                    continue;
                }
                if (!menuEntity.uID) {
                    menuEntity.uID = generateRandomToken(16);
                }
                created = await this.create(menuEntity);
                appLogger.winstonLogger.info(`${created} sub menu has been successfully created`);
                // console.log(`${created} main menu has been successfully created`);
            }
        } catch (error) {
            appLogger.winstonLogger.error(`buildMenus: ${error}`);
            // console.error(`buildMenus: ${error}`);
        }
    }
}
