import * as React from 'react';
import './style.less';

import localizer from '../../controller/lib/localization/localizer';
import { UpdateEntity } from '../entityCRUD/updateEntity';
import { roomEntityDescriptor } from './metaData';
import appController from '../../controller/appController';
import { ViewAllEntities } from '../entityCRUD/viewAllEntities';
import { RoundBtn } from '../lib/roundButton';
import { bedTypes, BedEntity } from '../../model/bedEntity';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { MetaDataForFiles } from '../entityCRUD/types';
import { RoomEntity, getDefaultRoom } from '../../model/roomEntity';
import { shared } from '../shared';

export interface UpdateRoomState {
    entity: RoomEntity;
    stage: number;
    metaDataForFiles: MetaDataForFiles[];
    beds: BedEntity[];
}

export default class UpdateRoom extends React.Component<{}, UpdateRoomState> {
    private static getDefaultState = () => {
        return {
            entity: getDefaultRoom(),
            metaDataForFiles: [],
            stage: 0,
            beds: []
        };
    }

    private _components: any[];

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40 },
        { Header: 'Name', accessor: 'name', className: 'center' },
        { Header: 'Type', id: 'type', accessor: (row: any) => bedTypes[row.type], className: 'center', width: 160 }
    ];

    constructor(props: {}) {
        super(props);
        this.state = UpdateRoom.getDefaultState();
        this._components = [
            this.roomUpdateView,
            this.bedIDsSelector
        ];
    }

    public async componentDidMount() {
        const entity = await EntityFetcher.fetch<RoomEntity>(appController.roomsFetcher, shared.entityID, shared.busyFunction);
        if (entity) {
            const beds = [];
            for (let index = 0; index < entity.bedsIDs.length; index++) {
                const bedID = entity.bedsIDs[index];
                const bed = await EntityFetcher.fetch<BedEntity>(appController.bedsFetcher, bedID, shared.busyFunction);
                if (bed) {
                    beds.push(bed);
                }
            }
            this.setState({
                entity,
                beds
            });
        }
    }

    public render() {
        return (
            this._components[this.state.stage]()
        );
    }

    public roomUpdateView = () => {
        const names = EntityFetcher.getValues<BedEntity>(this.state.beds, 'name');
        return (
            <div className='center form'>
                <UpdateEntity<RoomEntity>
                    title={localizer.text('room-update.title')}
                    entityFetcher={appController.roomsFetcher}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entity={this.state.entity}
                    descriptor={roomEntityDescriptor}>
                    <div className='fullRow'>
                        <input className='input center'
                            type='text'
                            value={names.toString()}
                            readOnly={true}
                            placeholder={localizer.text('room-choose-beds')}
                            onClick={this.onInputClick} />
                    </div>
                </UpdateEntity>
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
