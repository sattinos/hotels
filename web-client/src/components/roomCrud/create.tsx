import * as React from 'react';
import './style.less';

import localizer from '../../controller/lib/localization/localizer';
import { CreateEntity } from '../entityCRUD/createEntity';
import { roomEntityDescriptor } from './metaData';
import { ViewAllEntities } from '../entityCRUD/viewAllEntities';
import appController from '../../controller/appController';
import { RoundBtn } from '../lib/roundButton';
import { bedTypes, BedEntity } from '../../model/bedEntity';
import { MetaDataForFiles } from '../entityCRUD/types';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { RoomEntity, getDefaultRoom } from '../../model/roomEntity';

export interface CreateState {
    entity: RoomEntity;
    metaDataForFiles: MetaDataForFiles[];
    stage: number;
    beds: BedEntity[];
}

export default class CreateRoom extends React.Component<{}, CreateState> {
    private static getDefaultState = () => {
        return {
            entity: getDefaultRoom(),
            metaDataForFiles: [],
            stage: 0,
            beds: []
        };
    }
    private _components: any[];
    private _roomDescriptor = roomEntityDescriptor.slice(1);

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40 },
        { Header: 'Name', accessor: 'name', className: 'center' },
        { Header: 'Type', id: 'type', accessor: (row: any) => bedTypes[row.type], className: 'center', width: 160 }
    ];

    constructor(props: {}) {
        super(props);
        this.state = CreateRoom.getDefaultState();

        this._components = [
            this.roomCreateView,
            this.bedIDsSelector
        ];
    }

    public render() {
        return (
            this._components[this.state.stage]()
        );
    }

    private roomCreateView = () => {
        const names = EntityFetcher.getValues<BedEntity>(this.state.beds, 'name');

        return (
            <div className='center form'>
                <CreateEntity<RoomEntity>
                    title={localizer.text('room-create.title')}
                    entity={this.state.entity}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entityFetcher={appController.roomsFetcher}
                    descriptor={this._roomDescriptor}>

                    <div className='formDiv textAlignLeft'>
                        <div>
                            {this._roomDescriptor[1].label}
                        </div>
                        <div >
                            <input className='input center'
                                type='text'
                                value={names.toString()}
                                readOnly={true}
                                placeholder={localizer.text('room-choose-beds')}
                                onClick={this.onInputClick} />
                        </div>
                    </div>
                </CreateEntity>
            </div>
        );
    }

    private bedIDsSelector = () => {
        return (
            <div className='center form'>
                <ViewAllEntities
                    title={localizer.text('room-choose-beds')}
                    columns={this.columns}
                    entityFetcher={appController.bedsFetcher}
                    onSelectionChange={this.onSelectionChange} />
                <RoundBtn disabled={this.state.entity.bedsIDs.length === 0} text={localizer.text('common.ok')} onClick={() => this.onChooseClicked(0)} />
            </div>
        );
    }

    private onSelectionChange = (beds: BedEntity[]) => {
        const entity = this.state.entity;
        const bedsIDs = EntityFetcher.getValues<BedEntity>(beds, 'id');
        entity.bedsIDs = bedsIDs;
        this.setState({
            entity,
            beds
        });
    }

    private onChooseClicked = (stage: number) => {
        this.setState({
            stage
        });
    }

    private onInputClick = (_e: any) => {
        this.onChooseClicked(1);
    }
}
