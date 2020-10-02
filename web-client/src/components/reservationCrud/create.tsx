import * as React from 'react';
import localizer from '../../controller/lib/localization/localizer';
import { ReservationEntity, getDefaultReservation, DesiredReservationChunk } from '../../model/reservationEntity';
import appController from '../../controller/appController';
import { RoundBtn } from '../lib/roundButton';
import { shared } from '../shared';

import { Redirect } from 'react-router';
import { paths } from '../../paths';
import ReservationViewer from './reservationViewer';
import { storage } from '../storage';

export interface CreateReservationState {
    entity: ReservationEntity;
    saveEnabled: boolean;
    toMainTapped: boolean;
    desiredChunks: DesiredReservationChunk[];
}

class CreateReservation extends React.Component<{}, CreateReservationState> {
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
        this.state = CreateReservation.getDefaultState();
    }

    async reset() {
        this.setState(CreateReservation.getDefaultState());
    }

    render() {
        if (this.state.toMainTapped) {
            return (
                <Redirect to={paths.vaReservation} />
            );
        }
        return (
            <div className='form center'>
                <ReservationViewer title={localizer.text('reserve.create')} entity={this.state.entity} onNewEntityAvailable={this.onNewEntityAvailable} />
                <div>
                    <RoundBtn text={localizer.text('common.save')} disabled={!this.state.saveEnabled} onClick={this.onSaveTapped} />
                    <RoundBtn text={localizer.text('common.back')} disabled={false} onClick={() => this.setState({ toMainTapped: true })} />
                </div>
            </div>
        );
    }

    validate = () => {
        const saveEnabled = (this.state.desiredChunks.length > 0) && (this.state.entity.channel.length > 0);
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
            console.log('desiredChunks', this.state.desiredChunks);
            const reservationEntity = await appController.flatTypeFetcher.reserve(this.state.entity.from, this.state.entity.to, this.state.desiredChunks, userProfile.id, this.state.entity.channel, true);
            shared.busyFunction(false);
            console.log('reservationEntity:', reservationEntity);
            shared.alertFunction(localizer.text('reserve.success'));
            await this.reset();
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

export default CreateReservation;
