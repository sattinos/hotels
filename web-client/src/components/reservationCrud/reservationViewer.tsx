import * as React from 'react';
import { ReservationEntity, DesiredReservationChunk, reservationStatusString } from '../../model/reservationEntity';
import localizer from '../../controller/lib/localization/localizer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './style.less';

import Row from '../lib/row';
import appController from '../../controller/appController';
import DigitsInput from '../lib/digitsInput/input';
import { RoundBtn } from '../lib/roundButton';
import { OptionsInput } from '../lib/optionsInput';
import { shared } from '../shared';
import { UserProfile } from '../../model/userProfile';

export interface ReservationViewerProps {
    entity: ReservationEntity;
    onNewEntityAvailable: (entity: ReservationEntity, desiredChunks: DesiredReservationChunk[]) => void;
    title: string;
    readOnly?: boolean;
}

export interface ReservationViewerState {
    desiredChunks: DesiredReservationChunk[];
    flatTypes: string[];
    flatTypeIndex: number;
    total: number;
    available: number;
    countToReserve: number;
}

export default class ReservationViewer extends React.Component<ReservationViewerProps, ReservationViewerState> {
    constructor(props: ReservationViewerProps) {
        super(props);
        const desiredChunks = this.extractDesiredChunks(props.entity);
        this.state = {
            desiredChunks,
            flatTypes: [],
            flatTypeIndex: 0,
            total: 0,
            available: 0,
            countToReserve: 0
        };
    }

    extractDesiredChunks = (reservation: ReservationEntity): DesiredReservationChunk[] => {
        const desiredChunks: any = {};
        const result: DesiredReservationChunk[] = [];
        for (let index = 0; index < reservation.reservedFlats.length; index++) {
            const reservedFlat = reservation.reservedFlats[index];
            const flatType = reservedFlat.flatType;
            if (flatType) {
                if (desiredChunks[flatType.type]) {
                    desiredChunks[flatType.type]++;
                } else {
                    desiredChunks[flatType.type] = 1;
                    result.push({
                        countToReserve: 1,
                        flatType: flatType.type
                    });
                }
            }

        }
        for (let index = 0; index < result.length; index++) {
            result[index].countToReserve = desiredChunks[result[index].flatType];
        }
        return result;
    }

    showRemenantFlatTypes = (reservation: ReservationEntity, flatTypes: string[]) => {
        for (let index = 0; index < reservation.reservedFlats.length; index++) {
            const reservedFlat = reservation.reservedFlats[index];
            const flatType = reservedFlat.flatType;
            if (flatType) {
                const foundIndex = flatTypes.findIndex((instance) => instance === flatType.type);
                if (foundIndex > -1) {
                    flatTypes.splice(foundIndex, 1);
                }
            }

        }
        return flatTypes;
    }

    componentDidUpdate(prevProps: ReservationViewerProps) {
        if (this.props.entity.id !== prevProps.entity.id) {
            console.log('componentDidUpdate');
            this.reflectChanges(this.state.flatTypes);
        }
    }

    async componentDidMount() {
        console.log('componentDidMount');
        const flatTypes = await appController.flatTypeFetcher.getTypes();
        await this.fetchFlatTypeInfo(flatTypes);
        this.reflectChanges(flatTypes);
    }

    reflectChanges = (flatTypes: string[]) => {
        console.log('reflectChanges');
        const desiredChunks = this.extractDesiredChunks(this.props.entity);
        const remanantFlatTypes = this.showRemenantFlatTypes(this.props.entity, flatTypes);
        this.setState({
            desiredChunks,
            flatTypes: remanantFlatTypes
        });
    }

    render() {
        if( typeof this.props.entity.from === 'string' ) {
            this.props.entity.from = new Date(this.props.entity.from);
        }        
        if( typeof this.props.entity.to === 'string' ) {
            this.props.entity.to = new Date(this.props.entity.to);
        }
        
        return (
            <div className='form center'>
                <label className='bg'>{this.props.title}</label>
                {this.renderID()}
                <div className='formDiv textAlignLeft'>
                    <div>
                        {localizer.text('reserve.from')}
                    </div>
                    <div className='normalRowHeight'>
                        <DatePicker
                            dateFormat='MMMM d, yyyy h:mm::ss:SSS aa'
                            className='fillContainer roundedBox normalRowHeight paddedBoxHorizental'
                            selected={this.props.entity.from}
                            onChange={(v: Date) => this.onFromChange(v)} />
                    </div>
                </div>
                <div className='formDiv textAlignLeft'>
                    <div>
                        {localizer.text('reserve.to')}
                    </div>
                    <div>
                        <DatePicker
                            dateFormat='MMMM d, yyyy h:mm::ss:SSS aa'
                            className='fillContainer roundedBox normalRowHeight paddedBoxHorizental'
                            selected={this.props.entity.to}
                            placeholderText={localizer.text('reserve.toPlaceholder')}
                            onChange={(v: Date) => this.onToChange(v)} />
                    </div>
                </div>
                {this.renderReservers()}
                <div className='formDiv textAlignLeft'>
                    <div>
                        {localizer.text('reserve.channel')}
                    </div>
                    <div className='normalRowHeight'>
                        <input type='text' className='fillContainer roundedBox paddedBoxHorizental'
                            value={this.props.entity.channel}
                            placeholder={localizer.text('reserve.channel')}
                            onChange={this.onChannelChanged} />
                    </div>
                </div>
                {this.renderStatus()}
                {this.renderDesiredChunks()}
                {this.renderFlats()}
                {this.renderCreateTime()}
                {this.renderUpdateTime()}
            </div>
        );
    }

    renderID = () => {
        if (this.props.entity.id) {
            return (
                this.renderLabelRow(localizer.text('reserve.id'), this.props.entity.id as any)
            );
        }
        return null;
    }

    renderStatus = () => {
        if (this.props.entity.id) {
            return (
                <div className='formDiv textAlignLeft'>
                    <div>
                        {localizer.text('reserve.status')}
                    </div>
                    <div className='normalRowHeight'>
                        <OptionsInput title={''} options={reservationStatusString} index={this.props.entity.status} OnOptionSelected={(index: number) => this.onReservationStatusSelected(index)} />
                    </div>
                </div>
            );
        }
        return null;
    }

    renderReservers = () => {
        if (this.props.entity.reservers.length === 0) {
            return null;
        }
        const renderedReservers = this.props.entity.reservers.map((reserver: UserProfile, index: number) =>
            <div id='reserverChunk' key={`reserver_${index}`}>
                {this.renderLabelRow(localizer.text('reserver.id'), reserver.id)}
                {this.renderLabelRow(localizer.text('reserver.fullName'), reserver.fullName)}
                {this.renderLabelRow(localizer.text('reserver.phone'), reserver.phone)}
                {this.renderLabelRow(localizer.text('reserver.userName'), reserver.userName)}
            </div>
        );
        return (
            <div id='reserversDiv'>
                <div className='textAlignLeft' id='reserversDivTitle'>
                    {localizer.text('reservers.title')}
                </div>
                {renderedReservers}
            </div>
        );
    }

    renderFlatTypeOptions = () => {
        if (this.state.flatTypes.length === 0) {
            return null;
        }

        return (
            <div id='flatTypeDiv' className='formDiv textAlignLeft'>
                <div>
                    {localizer.text('reserve.flat-types')}
                </div>
                <div className='normalRowHeight'>
                    <OptionsInput title={''} options={this.state.flatTypes} index={this.state.flatTypeIndex} OnOptionSelected={this.onFlatTypeChange} />
                </div>
            </div>
        );
    }

    renderFlats = () => {
        if ((this.state.flatTypes.length === 0) || (this.state.total < 1)) {
            return null;
        }
        if (this.props.readOnly) {
            return;
        }
        return (
            <div id='desiredChunk'>
                {this.renderFlatTypeOptions()}
                <div className='textAlignLeft' id='searchDivTitle'>
                    {localizer.text('reserve.searchTitle')}
                </div>
                {this.renderLabelRow(localizer.text('reserve.total-flats'), this.state.total)}
                {this.renderLabelRow(localizer.text('reserve.available-flats'), this.state.available)}

                <div className='formDiv textAlignLeft'>
                    <div>
                        {localizer.text('reserve.count')}
                    </div>
                    <div className='normalRowHeight'>
                        <DigitsInput
                            className='fillContainer roundedBox paddedBoxHorizental'
                            placeHolder={localizer.text('reserve.count')}
                            value={this.state.countToReserve}
                            onChange={this.onCountToReserveChange} />
                    </div>
                </div>

                <RoundBtn text={localizer.text('common.add')} disabled={this.state.countToReserve < 1} onClick={this.onAddTapped} />
            </div>
        );
    }

    renderCreateTime = () => {
        if (!this.props.entity.createdAt) {
            return null;
        }
        return this.renderLabelRow(localizer.text('reserve.createdAt'), this.props.entity.createdAt.toString());
    }

    renderUpdateTime = () => {
        if (!this.props.entity.updatedAt) {
            return null;
        }
        return this.renderLabelRow(localizer.text('reserve.updateAt'), this.props.entity.updatedAt.toString());
    }

    onAddTapped = () => {
        const flatTypes = this.state.flatTypes;
        const desiredFlatType = this.state.flatTypes[this.state.flatTypeIndex];
        const desiredChunks = this.state.desiredChunks;
        desiredChunks.push({
            countToReserve: this.state.countToReserve,
            flatType: desiredFlatType
        });
        flatTypes.splice(this.state.flatTypeIndex, 1);
        this.setState({
            desiredChunks,
            flatTypes,
            countToReserve: 0
        }, () => {
            this.props.onNewEntityAvailable(this.props.entity, desiredChunks);
        });
    }

    onCountToReserveChange = (countToReserve: number) => {
        if (countToReserve <= this.state.available) {
            this.setState({
                countToReserve
            });
        }
    }

    renderDesiredChunks = () => {
        if (this.state.desiredChunks.length < 1) {
            return null;
        }
        const desiredChunks = this.state.desiredChunks.map((desiredChunk: DesiredReservationChunk, index: number) =>
            <div id='desiredChunk' key={`flatType_${desiredChunk.flatType}`}>
                {!this.props.readOnly ? <div id='removeChunk' onClick={() => this.onRemoveDesiredChunkTapped(index)}>{'x'}</div> : null}
                {this.renderLabelRow(localizer.text('reserve.flat-types'), desiredChunk.flatType)}
                {this.renderLabelRow(localizer.text('reserve.count'), desiredChunk.countToReserve)}
            </div>
        );
        return (
            <div>
                {desiredChunks}
            </div>
        );
    }

    renderLabelRow = (label: string, value: any) => {
        return (
            <div className='formDiv'>
                <Row rightClassName='textAlignLeft' isRtl={true} name={label}>
                    <div className='rowLabel'>
                        {value}
                    </div>
                </Row>
            </div>
        );
    }

    onFlatTypeChange = (flatTypeIndex: number) => {
        this.setState({
            flatTypeIndex
        }, () => {
            this.fetchFlatTypeInfo(this.state.flatTypes);
        });
    }

    fetchFlatTypeInfo = async (flatTypes: string[]) => {
        shared.busyFunction(true);
        const flatType = flatTypes[this.state.flatTypeIndex];
        const total = await appController.flatTypeFetcher.getTotalFlats(flatType);
        const available = await appController.flatTypeFetcher.getAvailableFlatsCount(this.props.entity.from, this.props.entity.to, flatType);
        this.setState({
            flatTypes,
            total,
            available,
            countToReserve: 0
        });
        shared.busyFunction(false);
    }

    onFromChange = (from: Date) => {
        if (this.props.readOnly) {
            return;
        }
        if (from < this.props.entity.to) {
            const entity = this.props.entity;
            entity.from = from;
            entity.from.setUTCHours(11, 0, 0, 0);
            this.props.onNewEntityAvailable(entity, this.state.desiredChunks);
            this.fetchFlatTypeInfo(this.state.flatTypes);
        }
    }

    onToChange = (to: Date) => {
        if (this.props.readOnly) {
            return;
        }
        const entity = this.props.entity;
        entity.to = to;
        entity.to.setUTCHours(10, 59, 59, 999);
        this.props.onNewEntityAvailable(entity, this.state.desiredChunks);
        this.fetchFlatTypeInfo(this.state.flatTypes);
    }

    onChannelChanged = (e: any) => {
        if (this.props.readOnly) {
            return;
        }
        const entity = this.props.entity;
        entity.channel = e.target.value;
        this.props.onNewEntityAvailable(entity, this.state.desiredChunks);
    }

    onRemoveDesiredChunkTapped = (index: number) => {
        if (this.props.readOnly) {
            return;
        }
        const desiredChunks = this.state.desiredChunks;
        const desiredChunk = desiredChunks[index];
        desiredChunks.splice(index, 1);
        const flatTypes = this.state.flatTypes;
        flatTypes.push(desiredChunk.flatType);
        this.setState({
            desiredChunks,
            flatTypes
        }, () => {
            this.props.onNewEntityAvailable(this.props.entity, desiredChunks);
        });
    }

    private onReservationStatusSelected = (index: number) => {
        if (this.props.readOnly) {
            return;
        }
        const entity = this.props.entity;
        entity.status = index;
        this.props.onNewEntityAvailable(entity, this.state.desiredChunks);
    }
}
