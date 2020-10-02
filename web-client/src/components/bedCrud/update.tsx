import * as React from 'react';

import { BedEntity, getDefaultBed } from '../../model/bedEntity';
import localizer from '../../controller/lib/localization/localizer';
import { bedEntityDescriptor } from './metaData';
import { UpdateEntity } from '../entityCRUD/updateEntity';
import appController from '../../controller/appController';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { MetaDataForFiles } from '../entityCRUD/types';
import { shared } from '../shared';

export interface UpdateBedState {
    entity: BedEntity;
    metaDataForFiles: MetaDataForFiles[];
}

export default class UpdateBed extends React.Component<{}, UpdateBedState> {
    constructor(props: {}) {
        super(props);
        const entity: BedEntity = getDefaultBed();
        this.state = {
            entity,
            metaDataForFiles: []
        };
    }

    public async componentDidMount() {
        const entity = await EntityFetcher.fetch<BedEntity>(appController.bedsFetcher, shared.entityID, shared.busyFunction);
        if (entity) {
            this.setState({
                entity
            });
        }
    }

    public render() {
        return (
            <div className='center form'>
                <UpdateEntity<BedEntity>
                    title={localizer.text('bedUpdate.title')}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entity={this.state.entity}
                    entityFetcher={appController.bedsFetcher}
                    descriptor={bedEntityDescriptor}
                />
            </div>
        );
    }
}
