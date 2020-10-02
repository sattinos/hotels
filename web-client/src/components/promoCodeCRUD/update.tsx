import * as React from 'react';
import './style.less';

import { PromoCodeEntity, getDefaultPromoCode } from '../../model/PromoCodeEntity';
import localizer from '../../controller/lib/localization/localizer';
import { promoCodeEntityDescriptor } from './metaData';
import { UpdateEntity } from '../entityCRUD/updateEntity';
import appController from '../../controller/appController';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { MetaDataForFiles } from '../entityCRUD/types';

export interface UpdatePromoCodeProps {
    setBusy: (isBusy: boolean) => void;
    entityID: number;
    onOkTapped?: (promoCode: PromoCodeEntity, file?: File) => void;
    onCancelTapped?: () => void;
}

export interface UpdatePromoCodeState {
    entity: PromoCodeEntity;
    metaDataForFiles: MetaDataForFiles[];
}

export class UpdatePromoCode extends React.Component<UpdatePromoCodeProps, UpdatePromoCodeState> {
    constructor(props: UpdatePromoCodeProps) {
        super(props);
        const entity: PromoCodeEntity = getDefaultPromoCode();
        this.state = {
            entity,
            metaDataForFiles: []
        };
    }

    public async componentDidMount() {
        const entity = await EntityFetcher.fetch<PromoCodeEntity>(appController.promoCodeFetcher, this.props.entityID, this.props.setBusy);
        if (entity) {
            this.setState({
                entity
            });
        }
    }

    public render() {
        return (
            <div className='center form'>
                <UpdateEntity<PromoCodeEntity>
                    title={localizer.text('PromoCodeUpdate.title')}
                    metaDataForFiles={this.state.metaDataForFiles}
                    entity={this.state.entity}
                    entityFetcher={appController.promoCodeFetcher}
                    descriptor={promoCodeEntityDescriptor}
                />
            </div>
        );
    }
}
