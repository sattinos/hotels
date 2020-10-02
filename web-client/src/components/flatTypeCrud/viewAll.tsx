import * as React from 'react';
import './style.less';
import ViewAllCrud from '../entityCRUD/viewAllCrud';
import localizer from '../../controller/lib/localization/localizer';
import appController from '../../controller/appController';
import DigitsInput from '../lib/digitsInput/input';
import { FlatTypeEntity } from '../../model/flatType';

class ViewAllFlatTypes extends React.Component<{}, {}> {
    private _tableRef: any = null;

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40, minResizeWidth: 20 },
        {
            Header: 'Name', accessor: 'name', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <input value={original.name} className='tableEditText' type='text' onChange={(e: any) => this.onRowFieldChange(original, 'name', e.target.value)} />
            )
        },
        {
            Header: 'Price', accessor: 'price', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <DigitsInput value={original.price} className='tableEditText' placeHolder='' onChange={(e: number) => this.onRowFieldChange(original, 'price', e)} />
            )
        },

        {
            Header: 'Count', accessor: 'count', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <DigitsInput value={original.count} className='tableEditText' placeHolder='' onChange={(e: number) => this.onRowFieldChange(original, 'count', e)} />
            )
        },

        {
            Header: 'Area', accessor: 'area', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <DigitsInput value={original.area} className='tableEditText' placeHolder='' onChange={(e: number) => this.onRowFieldChange(original, 'area', e)} />
            )
        },

        {
            Header: 'Description', accessor: 'description', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <input value={original.description} className='tableEditText' type='text' onChange={(e: any) => this.onRowFieldChange(original, 'description', e.target.value)} />
            )
        }
    ];

    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <ViewAllCrud<FlatTypeEntity>
                title={localizer.text('flatType.all')}
                columns={this.columns}
                entityFetcher={appController.flatTypeFetcher}
                ref={(e: any) => this._tableRef = e}
                entityName='flatType'
            />
        );
    }

    private onRowFieldChange = (row: FlatTypeEntity, fieldName: string, value: any) => {
        (row as any)[fieldName] = value;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }
}

export default ViewAllFlatTypes;
