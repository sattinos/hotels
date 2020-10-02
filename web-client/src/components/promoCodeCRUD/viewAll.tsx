import * as React from 'react';
import './style.less';
import { PromoCodeEntity } from '../../model/PromoCodeEntity';
import localizer from '../../controller/lib/localization/localizer';
import appController from '../../controller/appController';
import ViewAllCrud from '../entityCRUD/viewAllCrud';
import DigitsInput from '../lib/digitsInput/input';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface ViewAllPromoCodesProps {
    busyFunc: (isBusy: boolean) => void;
    alertFunction: (alertTxt: string, onOkTapped?: () => void) => void;

    onCreateClicked: () => void;
    onEditClicked: (entityID: number) => void;
}

export class ViewAllPromoCodes extends React.Component<ViewAllPromoCodesProps, {}> {
    private _tableRef: any = null;

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', width: 40 },
        {
            Header: 'Name', accessor: 'name', className: 'center',
            Cell: ({ original }: any) => (
                <input value={original.name} className='tableEditText' type='text' onChange={(e: any) => this.onRowFieldChange(original, 'name', e.target.value)} />
            )
        },
        {
            Header: 'Percent', accessor: 'percent', className: 'center',
            Cell: ({ original }: any) => (
                <DigitsInput value={original.percent} className='tableEditText' placeHolder='' onChange={(e: number) => this.onRowFieldChange(original, 'percent', e)} />
            )
        },
        {
            Header: 'Value', accessor: 'value', className: 'center',
            Cell: ({ original }: any) => (
                <input value={original.name} className='tableEditText' type='text' onChange={(e: any) => this.onRowFieldChange(original, 'value', e.target.value)} />
            )
        },
        {
            Header: 'Valid From', accessor: 'validFrom', className: 'center',
            Cell: ({ original }: any) => (
                <DatePicker withPortal className='fillContainer fullCell roundedBox'
                    minDate={new Date()}
                    selected={original.validFrom}
                    placeholderText={localizer.text('promo-code.valid-from')}
                    onChange={(v: Date) => this.onRowFieldChange(original, 'validFrom', v)} />
            )
        },
        {
            Header: 'Valid To', accessor: 'validTo', className: 'center',
            Cell: ({ original }: any) => (
                <DatePicker withPortal className='fillContainer fullCell roundedBox'
                    minDate={original.validFrom}
                    selected={original.validTo}
                    placeholderText={localizer.text('promo-code.valid-to')}
                    onChange={(v: Date) => this.onRowFieldChange(original, 'validTo', v)} />
            )
        }
    ];

    constructor(props: ViewAllPromoCodesProps) {
        super(props);
    }

    public render() {
        return (
            <ViewAllCrud<PromoCodeEntity>
                title={localizer.text('PromoCode.all')}
                columns={this.columns}
                entityFetcher={appController.promoCodeFetcher}
                entityName='promo-code'
                ref={(e: any) => this._tableRef = e}
                onDataFetched={this.onPromoFetched}
            />
        );
    }

    private onPromoFetched = (promoCodes: PromoCodeEntity[]) => {
        for (let index = 0; index < promoCodes.length; index++) {
            const promoCodeEntity = promoCodes[index];
            promoCodeEntity.validFrom = new Date(promoCodeEntity.validFrom);
            promoCodeEntity.validTo = new Date(promoCodeEntity.validTo);
        }
        return promoCodes;
    }

    private onRowFieldChange = (row: PromoCodeEntity, fieldName: string, value: any) => {
        (row as any)[fieldName] = value;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }
}
