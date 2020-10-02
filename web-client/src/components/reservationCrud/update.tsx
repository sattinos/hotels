import * as React from 'react';
import { getDefaultReservation, ReservationEntity, DesiredReservationChunk } from '../../model/reservationEntity';
import { shared } from '../shared';
import './style.less';
import { Redirect } from 'react-router';
import { paths } from '../../paths';
import localizer from '../../controller/lib/localization/localizer';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import appController from '../../controller/appController';
import { RoundBtn } from '../lib/roundButton';
import ReservationViewer from './reservationViewer';
import { storage } from '../storage';

export interface UpdateReservationState {
    entity: ReservationEntity;
    desiredChunks: DesiredReservationChunk[];
    saveEnabled: boolean;
    toMainTapped: boolean;
}

class UpdateReservation extends React.Component<{}, UpdateReservationState> {
    static getDefaultState = () => {
        return {
            entity: getDefaultReservation(),
            saveEnabled: false,
            toMainTapped: false,
            desiredChunks: []
        };
    }

    constructor(props: {}) {
        super(props);
        this.state = UpdateReservation.getDefaultState();
    }

    public async componentDidMount() {
        const entity = await EntityFetcher.fetch<ReservationEntity>(appController.reservationsFetcher, shared.entityID, shared.busyFunction);
        console.log('fetched:', entity);
        if (entity) {
            this.setState({
                entity
            });
        }
    }

    render() {
        if (this.state.toMainTapped) {
            return (
                <Redirect to={paths.vaReservation} />
            );
        }

        return (
            <div className='form center'>
                <ReservationViewer title={localizer.text('reserve.update')} entity={this.state.entity} onNewEntityAvailable={this.onNewEntityAvailable} />
                <div>
                    <RoundBtn text={localizer.text('common.save')} disabled={!this.state.saveEnabled} onClick={this.onSaveTapped} />
                    <RoundBtn text={localizer.text('common.back')} disabled={false} onClick={() => this.setState({ toMainTapped: true })} />
                </div>
            </div>
        );
    }

    validate = () => {
        const saveEnabled = (this.state.desiredChunks.length > 0) && (this.state.entity.channel.length > 0);
        console.log('saveEnabled', this.state.entity);
        this.setState({
            saveEnabled
        });
    }

    onSaveTapped = async () => {
        const userProfile = storage.userProfile;
        console.log(userProfile);
        if (userProfile) {
            shared.busyFunction(true);
            console.log('onSaveTapped', this.state.entity);
            await appController.flatTypeFetcher.modify(
                this.state.entity.id as number,
                this.state.entity.from,
                this.state.entity.to,
                this.state.desiredChunks,
                userProfile.id,
                this.state.entity.channel,
                true
            );
            shared.alertFunction(localizer.text('reserve.success'));
            shared.busyFunction(false);
        }
    }

    onNewEntityAvailable = async (entity: ReservationEntity, desiredChunks: DesiredReservationChunk[]) => {
        console.log('onNewEntityAvailable', entity);
        this.setState({
            entity,
            desiredChunks
        }, () => {
            this.validate();
        });
    }
}

export default UpdateReservation;
