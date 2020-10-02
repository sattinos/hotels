import * as React from 'react';

import { BedEntity, getDefaultBed } from '../../model/bedEntity';
import localizer from '../../controller/lib/localization/localizer';
import { CreateEntity } from '../entityCRUD/createEntity';
import { bedEntityDescriptor } from './metaData';
import appController from '../../controller/appController';
import { MetaDataForFiles } from '../entityCRUD/types';

export interface CreateBedState {
    entity: BedEntity;
    metaDataForFiles: MetaDataForFiles[];
}

export default class CreateBed extends React.Component<{}, CreateBedState> {
    private _createBedDescriptors = bedEntityDescriptor.slice(1);

    constructor(props: {}) {
        super(props);
        const entity: BedEntity = getDefaultBed();
        this.state = {
            entity,
            metaDataForFiles: []
        };
    }

    public render() {
        return (
            <div className='center form'>
                <CreateEntity<BedEntity>
                    title={localizer.text('bed.title')}
                    entityFetcher={appController.bedsFetcher}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entity={this.state.entity}
                    descriptor={this._createBedDescriptors}
                />
            </div>
        );
    }
}
