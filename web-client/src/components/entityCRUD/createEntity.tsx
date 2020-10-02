import * as React from 'react';
import { Indexable, MetaData, MetaDataForFiles } from './types';
import { UpdateEntity } from './updateEntity';
import { EntityFetcher, RelationInfo } from '../../controller/network/entityFetcher';

export interface CreateEntityProps<T extends Indexable> {
    title: string;
    metaDataForFiles: MetaDataForFiles[];
    entity: T;
    relations?: RelationInfo[];
    entityFetcher: EntityFetcher<T>;
    descriptor: MetaData[];
}

export class CreateEntity<T extends Indexable> extends React.Component<CreateEntityProps<T>, {}> {
    constructor(props: CreateEntityProps<T>) {
        super(props);
    }

    public render() {
        return (
            <UpdateEntity<T>
                title={this.props.title}
                metaDataForFiles={this.props.metaDataForFiles}
                entity={this.props.entity}
                entityFetcher={this.props.entityFetcher}
                relations={this.props.relations}
                descriptor={this.props.descriptor}
            >
                {this.props.children}
            </UpdateEntity>
        );
    }
}
