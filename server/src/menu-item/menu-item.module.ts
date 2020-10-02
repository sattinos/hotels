import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { MenuItemEntity } from './menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
  exports: [MenuItemService]
})
export class MenuItemModule { }
