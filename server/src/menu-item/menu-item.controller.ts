import { Controller } from '@nestjs/common';
import { MenuItemEntity } from './menu-item.entity';
import { MenuItemService } from './menu-item.service';
import { CrudController } from '../lib/crud/crud-controller';

@Controller('menu-item')
export class MenuItemController extends CrudController<MenuItemEntity> {
    constructor(
        protected readonly service: MenuItemService
    ) {
        super(service);
    }
}
