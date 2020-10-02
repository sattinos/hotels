import * as React from 'react';
import './style.less';
import ViewAllCrud from '../entityCRUD/viewAllCrud';
import localizer from '../../controller/lib/localization/localizer';
import appController from '../../controller/appController';
import { RoomEntity } from '../../model/roomEntity';

class ViewAllRooms extends React.Component<{}, {}> {
    private _tableRef: any = null;

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40, minResizeWidth: 20 },
        {
            Header: 'Name', accessor: 'name', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <input value={original.name} className='tableEditText' type='text' onChange={(e: any) => this.onNameChange(original, e.target.value)} />
            )
        },
        {
            Header: 'Description', accessor: 'description', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <input value={original.description} className='tableEditText' type='text' onChange={(e: any) => this.onDescriptionChange(original, e.target.value)} />
            )
        }
    ];

    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <ViewAllCrud<RoomEntity>
                title={localizer.text('bed-room.all')}
                columns={this.columns}
                entityFetcher={appController.roomsFetcher}
                entityName='room'

                ref={(e: any) => this._tableRef = e}
            />
        );
    }

    private onNameChange = (row: RoomEntity, newV: string) => {
        row.name = newV;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }

    private onDescriptionChange = (row: RoomEntity, newV: string) => {
        row.description = newV;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }
}

export default ViewAllRooms;