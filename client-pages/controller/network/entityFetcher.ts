import axios from 'axios';

export interface RelationInfo {
    ids: number[];
    fieldName: string;
}

export class EntityFetcher<Entity> {
    public static getValues<T>(entities: T[], key: string) {
        const ids = [];
        for (let index = 0; index < entities.length; index++) {
            const entity = entities[index];
            ids.push((entity as any)[key]);
        }
        return ids;
    }

    public static async fetch<T>(entityFetcher: EntityFetcher<T>, entityID: number, setBusy: (isBusy: boolean) => void) {
        setBusy(true);
        const entity = await entityFetcher.getOne(entityID, true);
        setBusy(false);
        return entity;
    }

    constructor(public baseUrl: string, public path: string) { }

    public async create(entity: Entity, relations?: RelationInfo[], isLog?: boolean): Promise<Entity | null> {
        try {
            let url = `${this.baseUrl}${this.path}`;
            let data: any = entity;
            if (relations && relations.length > 0) {
                url += '/ex';
                data = {
                    entity,
                    relations
                };
            }
            if (isLog) {
                console.log('url:', url, '\n');
                console.log('data:', data, '\n');
            }

            const response = await axios({
                method: 'post',
                url,
                data
            });
            if (isLog) {
                console.log('date:', response.data, '\n');
            }
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.create (err):', error);
            return null;
        }
    }

    public async getOne(id: number, isLog: boolean = false): Promise<Entity | null> {
        try {
            const url = `${this.baseUrl}${this.path}/${id}`;
            const response = await axios({
                method: 'get',
                url
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.getOne (err):', error);
            return null;
        }
    }

    public async getAll(pageIndex: number = 0, pageSize: number = 10, isLog: boolean = false): Promise<Entity[]> {
        try {
            const url = `${this.baseUrl}${this.path}/${pageIndex}/${pageSize}`;
            const response = await axios({
                method: 'get',
                url
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.getAll (err):', error);
            return [];
        }
    }

    public async getCount(isLog: boolean = false): Promise<number> {
        try {
            const url = `${this.baseUrl}${this.path}/count`;
            const response = await axios({
                method: 'get',
                url
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.getCount (err):', error.data);
            return -1;
        }
    }

    public async updateOne(id: number, entity: Entity, isLog: boolean = false, relations?: RelationInfo[]): Promise<Entity | null> {
        try {
            const isExtended = (relations) && (relations.length > 0);
            const url = !isExtended ? `${this.baseUrl}${this.path}/${id}` : `${this.baseUrl}${this.path}/ex/${id}`;
            const data = !isExtended ? entity : { entity, relations };
            const response = await axios({
                method: 'put',
                url,
                data
            });
            if (isLog) {
                console.log('EntityFetcher.udpate url:', url);
                console.log('EntityFetcher.udpate entity:', entity);
                console.log('EntityFetcher.udpate entity relations:', relations);
                console.log('EntityFetcher.udpate status code:', response.status);
                console.log('EntityFetcher.update data:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.update (err):', error);
            return null;
        }
    }

    public async updateMany(entities: Entity[], isLog: boolean = false): Promise<Entity[] | null> {
        try {
            const url = `${this.baseUrl}${this.path}/updateMany`;
            const response = await axios({
                method: 'put',
                url,
                data: entities
            });
            if (isLog) {
                console.log('EntityFetcher.updateMany status code:', response.status);
                console.log('EntityFetcher.updateMany data:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.updateMany (err):', error);
            return null;
        }
    }

    public async delete(id: number): Promise<Entity | null> {
        try {
            const url = `${this.baseUrl}${this.path}/${id}`;
            const response = await axios({
                method: 'delete',
                url
            });
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.delete (err):', error);
            return null;
        }
    }

    public async deleteMany(ids: number[]) {
        try {
            const url = `${this.baseUrl}${this.path}/deleteMany`;
            console.log(url);
            console.log(ids);
            const response = await axios({
                method: 'delete',
                url,
                data: ids
            });
            return response.data;
        } catch (error) {
            console.log('EntityFetcher.deleteMany (err):', error.message);
            return null;
        }
    }
}
