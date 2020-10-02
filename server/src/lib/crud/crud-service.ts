import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { SortItem } from '../queryLanguage';

export interface RelationInfo {
  ids: number[];
  fieldName: string;
}

export interface CrudService<T> {
  create(entity: T, relations?: RelationInfo[]): Promise<T>;
  createMany(entities: T[], relations?: RelationInfo[][]): Promise<T[]>;
  getAll(pageIndex: number, pageSize: number, query: any): Promise<T[]>;
  getOne(id: any): Promise<T>;
  update(id: any, entity: T, relations?: RelationInfo[]): Promise<T>;
  updateMany(entities: T[]): Promise<boolean>;
  delete(id: any): Promise<T>;
  deleteMany(ids: any[]): Promise<boolean>;
  getCount(): Promise<number>;
}

@Injectable()
export class CrudServiceOrm<T> implements CrudService<T> {
  constructor(protected readonly rep: Repository<T>) { }

  public get repositery(): Repository<T> {
    return this.rep;
  }

  async create(entity: T, relations?: RelationInfo[]): Promise<T> {
    if (relations) {
      const res1 = await this.createMany([entity], [relations]);
      return res1[0];
    }
    const res = await this.createMany([entity]);
    return res[0];
  }

  async createMany(entities: T[], _relations?: RelationInfo[][]) {
    try {
      return await this.rep.save(entities as any);
    } catch (error) {
      Logger.error(`error while trying to createMany:`);
      Logger.error(entities);
      Logger.error(`createMany err:`);
      Logger.error(error);
      throw new BadRequestException();
    }
  }

  async getAll(pageIndex: number = 0, pageSize: number = 10, query?: any): Promise<T[]> {
    try {
      const sortwords: string[] = (query && query.sortItems) ? query.sortItems : [];
      const sortItems: SortItem[] = [];
      for (let index = 0; index < sortwords.length; index++) {
        sortItems.push(
          JSON.parse(sortwords[index])
        );
      }
      const order = {};
      if (sortItems.length > 0) {
        for (let index = 0; index < sortItems.length; index++) {
          const sortItem = sortItems[index];
          order[sortItem.id] = sortItem.desc ? 'DESC' : 'ASC';
        }
      }
      const saved: T[] = await this.rep.find({
        skip: pageIndex * pageSize,
        take: pageSize,
        order
      });
      return saved;
    } catch (error) {
      Logger.error(`getAll err: ${error}`);
      throw new BadRequestException();
    }
  }

  async getOne(id: any): Promise<T> {
    try {
      const entity = await this.rep.findOne({
        where: { id }
      });
      if (!entity) {
        throw new NotFoundException();
      }
      return entity;
    } catch (error) {
      Logger.error(`getOne(err): id: ${id} ${JSON.stringify(error)}`);
      throw new NotFoundException();
    }
  }

  async getCount(): Promise<number> {
    try {
      return await this.rep.count();
    } catch (error) {
      Logger.error(`getCount(err): ${JSON.stringify(error)}`);
      throw new BadRequestException();
    }
  }

  async update(id: any, entity: T): Promise<T> {
    try {
      let foundEntity = await this.getOne(id);
      foundEntity = _.assign(foundEntity, entity);
      return await this.rep.save(foundEntity as any);
    } catch (error) {
      Logger.error(`update err: ${error.message}`);
      throw new BadRequestException();
    }
  }

  async updateMany(entities: T[]): Promise<boolean> {
    try {
      return await this.rep.save(entities as any);
    } catch (error) {
      Logger.error(`updateMany err: ${error.message}`);
      throw new BadRequestException();
    }
  }

  async delete(id: any): Promise<T> {
    try {
      const foundEntity = await this.getOne(id);
      await this.rep.delete(id);
      return foundEntity;
    } catch (error) {
      Logger.error(`delete err: ${error.message}`);
      throw new NotFoundException();
    }
  }

  async deleteMany(ids: any[]): Promise<boolean> {
    try {
      await this.rep.delete(ids);
      return true;
    } catch (error) {
      Logger.error(`deleteMany err: ${error.message}`);
      throw new NotFoundException();
    }
  }
}
