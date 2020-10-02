import { EntityFetcher } from '../controller/network/entityFetcher';

export interface ToolDataMenuItem {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    uID: string;
    name: string;
    to?: string;
    className: string;
    parentuID: string;
    entity?: number;
    createPath?: string;
    updatePath?: string;
    deletePath?: string;
    subMenus: ToolDataMenuItem[];
    fetcher?: EntityFetcher<any>;
}
