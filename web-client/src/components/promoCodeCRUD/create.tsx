import * as React from 'react';
import './style.less';

import { PromoCodeEntity, getDefaultPromoCode } from '../../model/PromoCodeEntity';
import localizer from '../../controller/lib/localization/localizer';
import { CreateEntity } from '../entityCRUD/createEntity';
import { promoCodeEntityDescriptor } from './metaData';
import appController from '../../controller/appController';
import { MetaDataForFiles } from '../entityCRUD/types';
import { RoundBtn } from '../lib/roundButton';
import * as uniqid from 'uniqid';
import { FlatTypeEntity } from '../../model/flatType';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { VerticalSpacer } from '../lib/verticalSpacer';
import DigitsInput from '../lib/digitsInput/input';

export interface CreatePromoCodeProps {
    busyFunc: (isBusy: boolean) => void;
    onOkTapped?: (bed: PromoCodeEntity, file?: File) => void;
    onCancelTapped?: () => void;
}

interface AffectedPrice {
    name: string;
    price: number;
    desiredPrice: number;
}

export interface CreatePromoCodeState {
    entity: PromoCodeEntity;
    metaDataForFiles: MetaDataForFiles[];
    affectedPrices: AffectedPrice[];
}

export class CreatePromoCode extends React.Component<CreatePromoCodeProps, CreatePromoCodeState> {
    private _createPromoCodeDescriptors = promoCodeEntityDescriptor.slice(1);
    private _flatTypes: FlatTypeEntity[] = [];

    private columns = [
        { Header: 'Flat Type', accessor: 'name', className: 'center' },
        { Header: 'Original Price', accessor: 'price', className: 'center' },
        {
            Header: 'Desired Price', accessor: 'desiredPrice', className: 'center',
            Cell: ({ original }: any) => (
                <DigitsInput value={original.desiredPrice} placeHolder={''} className='tableEditText' onChange={(e: number) => this.onDesiredPriceChanged(original, e)} />
            )
        }
    ];

    constructor(props: CreatePromoCodeProps) {
        super(props);
        const entity: PromoCodeEntity = getDefaultPromoCode();
        this.state = {
            entity,
            metaDataForFiles: [],
            affectedPrices: []
        };
    }

    async componentDidMount() {
        this.props.busyFunc(true);
        this._flatTypes = await appController.flatTypeFetcher.getAll();
        this.flatTypeToAffectedPrices(this._flatTypes);
        this.props.busyFunc(false);
    }

    public render() {
        return (
            <div className='center form'>
                <CreateEntity<PromoCodeEntity>
                    title={localizer.text('PromoCode.title')}
                    entityFetcher={appController.promoCodeFetcher}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entity={this.state.entity}
                    descriptor={this._createPromoCodeDescriptors} >
                    <div className={'fullRow'} id='genRow'>
                        <div className={'c60 floatLeft'}>
                            <input className={'input'} id='pCodeInput'
                                type='text'
                                value={this.state.entity.value}
                                placeholder={localizer.text('promo-code.value')}
                                onChange={this.onChangeHandler} />
                        </div>
                        <div className={'c40 floatRight'}>
                            <RoundBtn id='genBtn' onClick={this.onGenClicked} disabled={false} text={localizer.text('promo-code.generate')} />
                        </div>
                    </div>

                    <VerticalSpacer height={10} />,
                    <ReactTable data={this.state.affectedPrices} columns={this.columns} pageSize={5} showPageSizeOptions={false} />
                </CreateEntity>
            </div>
        );
    }

    private onChangeHandler = (e: any) => {
        const entity = this.state.entity;
        entity.value = e.target.value;
        this.setState({
            entity
        });
    }

    private onGenClicked = () => {
        const entity = this.state.entity;
        entity.value = uniqid();
        this.setState({
            entity
        });
    }

    private onDesiredPriceChanged = (original: AffectedPrice, newPrice: number) => {
        original.desiredPrice = newPrice;
        const entity = this.state.entity;
        entity.percent = Math.round(100 * (1 - (original.desiredPrice / original.price)));
        this.setState({
            entity
        }, () => {
            this.applyPercent(entity.percent, original);
        });
    }

    private flatTypeToAffectedPrices = (flatTypes: FlatTypeEntity[]) => {
        const affectedPrices = [];
        for (let index = 0; index < flatTypes.length; index++) {
            affectedPrices.push({
                name: flatTypes[index].name,
                price: flatTypes[index].price,
                desiredPrice: flatTypes[index].price
            });
        }
        this.setState({
            affectedPrices
        });
    }

    private applyPercent = (percent: number, excludedEntity?: AffectedPrice) => {
        console.log('applying percent:', percent);
        const percentNormalized = 1 - (percent / 100);
        const affectedPrices = this.state.affectedPrices;
        for (let index = 0; index < affectedPrices.length; index++) {
            const affectedPricesEntity = affectedPrices[index];
            if (affectedPricesEntity !== excludedEntity) {
                affectedPrices[index].desiredPrice = Math.round(affectedPrices[index].price * percentNormalized);
            }
        }
        this.setState({
            affectedPrices
        });
    }
}
