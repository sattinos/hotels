import * as React from 'react';
import { RoomEntity } from '../../model/roomEntity';
import { UpdateEntity } from '../entityCRUD/updateEntity';
import localizer from '../../controller/lib/localization/localizer';
import appController from '../../controller/appController';
import { flatTypeDescriptor } from './metaData';
import { ViewAllEntities } from '../entityCRUD/viewAllEntities';
import { RoundBtn } from '../lib/roundButton';
import { MetaDataForFiles } from '../entityCRUD/types';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { FlatTypeEntity, getDefaultFlatType } from '../../model/flatType';
import { shared } from '../shared';

export interface UpdateFlatTypeState {
    flatType: FlatTypeEntity;
    stage: number;
    bedRooms: RoomEntity[];
    livingRooms: RoomEntity[];
    bathRooms: RoomEntity[];
    kitchens: RoomEntity[];
    metaDataForFiles: MetaDataForFiles[];
    bufferedRooms: RoomEntity[];
}

class UpdateFlatType extends React.Component<{}, UpdateFlatTypeState> {
    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40 },
        { Header: 'Name', accessor: 'name', className: 'center' }
    ];

    private _components: any[];
    private _activeRooms: number;

    constructor(props: {}) {
        super(props);
        const flatType: FlatTypeEntity = getDefaultFlatType();
        this.state = {
            flatType,
            stage: 0,
            bedRooms: [],
            livingRooms: [],
            bathRooms: [],
            kitchens: [],
            metaDataForFiles: [],
            bufferedRooms: []
        };

        this._activeRooms = 0;

        this._components = [
            this.roomUpdateRender,
            this.bedRoomsSelector
        ];
    }

    public async componentDidMount() {
        const entity = await EntityFetcher.fetch<FlatTypeEntity>(appController.flatTypeFetcher, shared.entityID, shared.busyFunction);
        console.log('fetched:', entity);
        if (entity) {
            this.onFlatChanged(entity);
        }
    }

    public render() {
        return (
            this._components[this.state.stage]()
        );
    }

    public roomUpdateRender = () => {
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
                <UpdateEntity<FlatTypeEntity>
                    title={localizer.text('flatType.update')}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entityFetcher={appController.flatTypeFetcher}
                    entity={this.state.flatType}
                    relations={[
                        { fieldName: 'bedRooms', ids: bedRoomsIDs },
                        { fieldName: 'livingRooms', ids: livingRoomsIDs },
                        { fieldName: 'bathRooms', ids: bathRoomsIDs },
                        { fieldName: 'kitchens', ids: kitchenIDs }
                    ]}
                    descriptor={flatTypeDescriptor} >
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
                            <input className='input center' type='text' value={livingRoomsNames.toString()} readOnly={true} placeholder={localizer.text('common-choose-bed')} onClick={(e: any) => this.onInputClick(e, 1)} />
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
                </UpdateEntity>
            </div>
        );
    }

    private bedRoomsSelector = () => {
        return (
            <div className='center form'>
                <ViewAllEntities
                    title={localizer.text('flat-choose-bed-rooms')}
                    columns={this.columns}
                    entityFetcher={appController.roomsFetcher}
                    onSelectionChange={this.onSelectionChange} />
                <RoundBtn disabled={this.state.bedRooms.length === 0} text={localizer.text('common.ok')} onClick={() => this.onChooseClicked(0)} />
                <RoundBtn disabled={false} text={localizer.text('common.back')} onClick={() => this.onCancelClicked()} />
            </div>
        );
    }

    private onFlatChanged = (flatType: FlatTypeEntity, metaDataForFilesArg?: MetaDataForFiles[]) => {
        let metaDataForFiles = this.state.metaDataForFiles;
        if (metaDataForFilesArg) {
            metaDataForFiles = metaDataForFilesArg;
        }
        this.setState({
            flatType,
            metaDataForFiles,
            bedRooms: flatType.bedRooms,
            bathRooms: flatType.bathRooms,
            kitchens: flatType.kitchens,
            livingRooms: flatType.livingRooms
        });
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

    private onInputClick = (_e: any, activeIndex: number) => {
        this._activeRooms = activeIndex;
        const bufferedRooms = [... this.getActiveRooms()];
        this.setState({
            bufferedRooms,
            stage: 1
        });
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

export default UpdateFlatType;
