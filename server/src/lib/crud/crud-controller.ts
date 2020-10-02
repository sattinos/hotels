import { Post, Body, Get, Param, Put, Delete, Logger, Query } from '@nestjs/common';
import { CrudService, RelationInfo } from './crud-service';

export class CrudController<T> {
  constructor(protected readonly crudService: CrudService<T>) { }

  @Post()
  public async create(@Body() entity: T) {
    Logger.log('create entity:');
    Logger.log(entity);
    return await this.crudService.create(entity);
  }

  @Post('ex')
  public async createEx(@Body() extendedEntity: { entity: T, relations: RelationInfo[] }) {
    return await this.crudService.create(extendedEntity.entity, extendedEntity.relations);
  }

  @Get('count')
  public async getCount() {
    return await this.crudService.getCount();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<T> {
    return await this.crudService.getOne(id);
  }

  @Get('/:pageIndex/:pageSize')
  public async getAll(
    @Param('pageIndex') pageIndex: number = 0,
    @Param('pageSize') pageSize: number = 10,
    @Query() query: any
  ) {
    return await this.crudService.getAll(pageIndex, pageSize, query);
  }

  @Put('updateMany')
  public async updateMany(@Body() entities: T[]) {
    return await this.crudService.updateMany(entities);
  }

  @Put(':id')
  public async update(@Param('id') id: number, @Body() entity: T) {
    return await this.crudService.update(id, entity);
  }

  @Put('ex/:id')
  public async updateEx(@Param('id') id: number, @Body() extendedEntity: { entity: T, relations: RelationInfo[] }) {
    return await this.crudService.update(id, extendedEntity.entity, extendedEntity.relations);
  }

  @Delete('deleteMany')
  public async deleteMany(@Body() ids: number[]) {
    return await this.crudService.deleteMany(ids);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.crudService.delete(id);
  }
}
