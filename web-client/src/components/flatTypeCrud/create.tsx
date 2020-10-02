import * as React from 'react';
import './style.less';

import { CreateEntity } from '../entityCRUD/createEntity';
import localizer from '../../controller/lib/localization/localizer';
import appController from '../../controller/appController';
import { flatTypeDescriptorCreate } from './metaData';
import { ViewAllEntities } from '../entityCRUD/viewAllEntities';
import { RoundBtn } from '../lib/roundButton';
import { MetaDataForFiles } from '../entityCRUD/types';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { RoomEntity } from '../../model/roomEntity';
import { FlatTypeEntity, getDefaultFlatType } from '../../model/flatType';

export interface CreateFlatTypeState {
    entity: FlatTypeEntity;
    metaDataForFiles: MetaDataForFiles[];
    stage: number;
    bedRooms: RoomEntity[];
    livingRooms: RoomEntity[];
    bathRooms: RoomEntity[];
    kitchens: RoomEntity[];
    bufferedRooms: RoomEntity[];
}

class CreateFlatType extends React.Component<{}, CreateFlatTypeState> {
    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40 },
        { Header: 'Name', accessor: 'name', className: 'center' }
    ];

    private _components: any[];
    private _activeRooms: number;

    constructor(props: {}) {
        super(props);
        const entity: FlatTypeEntity = getDefaultFlatType();
        this.state = {
            entity,
            metaDataForFiles: [],
            stage: 0,
            bedRooms: [],
            livingRooms: [],
            bathRooms: [],
            kitchens: [],
            bufferedRooms: []
        };

        this._activeRooms = 0;

        this._components = [
            this.flatTypeRender,
            this.roomsSelector
        ];
    }

    public render() {
        return (
            this._components[this.state.stage]()
        );
    }

    public flatTypeRender = () => {
        const bedRoomsIDs: number[] = EntityFetcher.getValues<RoomEntity>(this.state.bedRooms, 'id');
        const bedRoomsNames: string[] = EntityFetcher.getValues<RoomEntity>(this.state.bedRooms, 'name');

        const livingRoomsIDs: number[] = EntityFetcher.getValues<RoomEntity>(this.state.livingRooms, 'id');
        const livingRoomsNames: string[] = EntityFetcher.getValues<RoomEntity>(this.state.livingRooms, 'name');

        const bathRoomsIDs: number[] = EntityFetcher.getValues<RoomEntity>(this.state.bathRooms, 'id');
        const bathRoomsNames: string[] = EntityFetcher.getValues<RoomEntity>(this.state.bathRooms, 'name');

        const kitchenIDs: number[] = EntityFetcher.getValues<RoomEntity>(this.state.kitchens, 'id');
        const kitchenNames: string[] = EntityFetcher.getValues<RoomEntity>(this.state.kitchens, 'name');

        return (
            <div className='center form'>
                <CreateEntity<FlatTypeEntity>
                    title={localizer.text('flatType.title')}
                    entity={this.state.entity}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entityFetcher={appController.flatTypeFetcher}
                    relations={[
                        { fieldName: 'bedRooms', ids: bedRoomsIDs },
                        { fieldName: 'livingRooms', ids: livingRoomsIDs },
                        { fieldName: 'bathRooms', ids: bathRoomsIDs },
                        { fieldName: 'kitchens', ids: kitchenIDs }
                    ]}
                    descriptor={flatTypeDescriptorCreate}>
                    <div className='formDiv textAlignLeft'>
                        <div>
                            {localizer.text('flatType.bedRooms')}
                        </div>
                        <div>
                            <input className='input center' type='text' value={bedRoomsNames.toString()} readOnly={true} placeholder={localizer.text('common-choose-beds')} onClick={(e: any) => this.onInputClick(e, 0)} />
                        </div>
                    </div>

                    <div className='formDiv textAlignLeft'>
                        <div>
                            {localizer.text('flatType.livingRooms')}
                        </div>
                        <div>
                            <input className='input center' type='text' value={livingRoomsNames.toString()} readOnly={true} placeholder={localizer.text('common-choose-beds')} onClick={(e: any) => this.onInputClick(e, 1)} />
                        </div>
                    </div>

                    <div className='formDiv textAlignLeft'>
                        <div>
                            {localizer.text('flatType.bathRooms')}
                        </div>
                        <div>
                            <input className='input center' type='text' value={bathRoomsNames.toString()} readOnly={true} placeholder={localizer.text('common-choose-beds')} onClick={(e: any) => this.onInputClick(e, 2)} />
                        </div>
                    </div>

                    <div className='formDiv textAlignLeft'>
                        <div>
                            {localizer.text('flatType.kitchens')}
                        </div>
                        <div>
                            <input className='input center' type='text' value={kitchenNames.toString()} readOnly={true} placeholder={localizer.text('common-choose-beds')} onClick={(e: any) => this.onInputClick(e, 3)} />
                        </div>
                    </div>
                </CreateEntity>
            </div>
        );
    }

    private roomsSelector = () => {
        return (
            <div className='center form'>
                <ViewAllEntities<RoomEntity>
                    title={localizer.text('choose-bed-rooms')}
                    columns={this.columns}
                    entityFetcher={appController.roomsFetcher}
                    onSelectionChange={this.onSelectionChange} />
                <RoundBtn disabled={this.state.bedRooms.length === 0} text={localizer.text('common.ok')} onClick={() => this.onChooseClicked(0)} />
                <RoundBtn disabled={false} text={localizer.text('common.back')} onClick={() => this.onCancelClicked()} />
            </div>
        );
    }

    private onSelectionChange = (rooms: RoomEntity[]) => {
        switch (this._activeRooms) {
            case 0:
                this.setState({
                    bedRooms: rooms
                });
                break;

            case 1:
                this.setState({
                    livingRooms: rooms
                });
                break;

            case 2:
                this.setState({
                    bathRooms: rooms
                });
                break;

            case 3:
                this.setState({
                    kitchens: rooms
                });
                break;
        }
    }

    private getActiveRooms = () => {
        switch (this._activeRooms) {
            case 0:
                return this.state.bedRooms;

            case 1:
                return this.state.livingRooms;

            case 2:
                return this.state.bathRooms;

            case 3:
                return this.state.kitchens;
        }
    }

    private onInputClick = (_e: any, activeIndex: number) => {
        this._activeRooms = activeIndex;
        const bufferedRooms = [... this.getActiveRooms()];
        this.setState({
            bufferedRooms,
            stage: 1
        });
    }

    private onChooseClicked = (stage: number) => {
        this.setState({
            stage
        });
    }

    private onCancelClicked = () => {
        this.onSelectionChange(this.state.bufferedRooms);
        this.setState({
            stage: 0
        });
    }
}

export default CreateFlatType;
