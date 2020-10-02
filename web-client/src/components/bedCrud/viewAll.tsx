import * as React from 'react';
import { BedEntity, bedTypes } from '../../model/bedEntity';
import localizer from '../../controller/lib/localization/localizer';
import { OptionsInput } from '../lib/optionsInput';
import appController from '../../controller/appController';
import ViewAllCrud from '../entityCRUD/viewAllCrud';

export interface ViewAllBedsProps {
    busyFunc: (isBusy: boolean) => void;
    alertFunction: (alertTxt: string, onOkTapped?: () => void) => void;

    onCreateClicked: () => void;
    onEditClicked: (entityID: number) => void;
}

export default class ViewAllBeds extends React.Component<ViewAllBedsProps, {}> {
    private _tableRef: any = null;

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40, minResizeWidth: 20 },
        {
            Header: 'Name', accessor: 'name', className: 'center', minResizeWidth: 20 ,
            Cell: ({ original }: any) => (
                <input value={original.name} className='tableEditText' type='text' onChange={(e: any) => this.onNameChange(original, e.target.value)} />
            )
        },
        {
            Header: 'Type', accessor: 'type', className: 'center', width: 160, minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <OptionsInput title={''} options={bedTypes} index={original.type} OnOptionSelected={(index: number) => this.onOptionSelected(original, index)} />
            )
        },
        {
            Header: 'Description', accessor: 'description', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <input value={original.description} className='tableEditText' type='text' onChange={(e: any) => this.onDescriptionChange(original, e.target.value)} />
            )
        }
    ];

    constructor(props: ViewAllBedsProps) {
        super(props);
    }

    public render() {
        return (
            <ViewAllCrud<BedEntity>
                title={localizer.text('bed.all')}
                columns={this.columns}
                entityFetcher={appController.bedsFetcher}

                ref={(e: any) => this._tableRef = e}

                entityName='bed'
            />
        );
    }

    private onNameChange = (row: BedEntity, newV: string) => {
        row.name = newV;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }

    private onDescriptionChange = (row: BedEntity, newV: string) => {
        row.description = newV;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }

    private onOptionSelected = (row: BedEntity, index: number) => {
        row.type = index;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }
}
