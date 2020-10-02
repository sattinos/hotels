import * as React from 'react';

import { FlatTypeEntity } from '../../model/flatType';
import appController from '../../controller/appController';
import Select from 'react-select';
import localizer from '../../controller/lib/localization/localizer';
import { ValueType } from 'react-select/lib/types';
import Row from '../lib/row';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReservedFlatEntity } from '../../model/reservedFlatEntity';
import DigitsInput from '../lib/digitsInput/input';
import { RoundBtn } from '../lib/roundButton';
import { shared } from '../shared';
import { Icon } from '../lib/icon';
import { newIcon } from '../../images';
import { Redirect } from 'react-router';

import './style.less';
import { CrudOperation, generatePath } from '../../paths';
import { storage } from '../storage';

// tslint:disable-next-line: interface-over-type-literal
type selectType = { value: FlatTypeEntity | null, label: string };

interface CountDateCouple {
    count: number;
    at: Date;
}

export interface ViewAllAcrossTimeState {
    flatTypes: selectType[];
    chosenFlatType: selectType;
    from: Date;
    to: Date;
    reservedFlats: ReservedFlatEntity[][];
    toReserve: CountDateCouple[];
    createClicked: boolean;
}

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const weekDays = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

class ViewAllAcrossTime extends React.Component<{}, ViewAllAcrossTimeState> {
    private allFlatTypeEntities: FlatTypeEntity[] = [];

    constructor(props: {}) {
        super(props);
        const from = new Date(); from.setUTCHours(11, 0, 0, 0);
        const to = new Date(); to.setUTCHours(11, 0, 0, 0);
        to.setDate(to.getDate() + 1);
        this.state = {
            flatTypes: [],
            chosenFlatType: { value: null, label: '' },
            from,
            to,
            reservedFlats: [],
            toReserve: [],
            createClicked: false
        };
    }

    async componentDidMount() {
        const flatTypes: selectType[] = [];
        shared.busyFunction(true);
        this.allFlatTypeEntities = await appController.flatTypeFetcher.getAll();
        for (let index = 0; index < this.allFlatTypeEntities.length; index++) {
            const instance = this.allFlatTypeEntities[index];
            flatTypes.push({
                label: instance.type,
                value: instance
            });
        }
        this.setState({
            flatTypes,
            chosenFlatType: flatTypes[0]
        }, async () => {
            await this.parseDays();
        });
        shared.busyFunction(false);
    }

    render() {
        console.log('ViewAllAcrossTime render');
        if (this.state.createClicked) {
            return <Redirect to={generatePath('reservation', CrudOperation.Create)} />;
        }

        const chosenFlatType = this.state.chosenFlatType.value as FlatTypeEntity;
        return (
            <>
                <div className='form center' id={'vaForm'}>
                    <h1>{localizer.text('View All Flats')}</h1>
                    <div className='paddedBox'>
                        <Row name={localizer.text('view-all-flats-flat-type')}>
                            <Select options={this.state.flatTypes} onChange={this.onFlatTypeChange} />
                        </Row>
                    </div>
                    <div className='paddedBox'>
                        <Row name={localizer.text('view-all-flats-from')}>
                            <DatePicker withPortal className='fillContainer fullCell nl'
                                minDate={new Date()}
                                selected={this.state.from}
                                placeholderText={localizer.text('view-all-flats.from')}
                                onChange={(v: Date) => this.onFromChange(v)} />
                        </Row>
                    </div>
                    <div className='paddedBox'>
                        <Row name={localizer.text('view-all-flats-to')}>
                            <DatePicker withPortal className='fillContainer fullCell nl'
                                minDate={this.state.from}
                                selected={this.state.to}
                                placeholderText={localizer.text('view-all-flats.to')}
                                onChange={(v: Date) => this.onToChange(v)} />
                        </Row>
                    </div>

                    {!!chosenFlatType ?
                        <div className='paddedBox'>
                            <Row name={localizer.text('view-all-flats-total')}>
                                {chosenFlatType.count}
                            </Row>
                        </div> : null
                    }
                    {this.state.reservedFlats.length > 0 ?
                        <div id='availableFlatsDiv'>
                            <div id='availableFlatsTitleDiv' className='bg'>{localizer.text('view-all-flats-available flats')}</div>
                            <div id='cardsInfo'>
                                <div id='reservedTitleDiv'>{'Reserved'}</div>
                                <div id='availableTitleDiv'>{'Available'}</div>
                            </div>
                            <div className='textAlignLeft' id='cardsContainer'>
                                {this.renderReservedFlats()}
                            </div>

                        </div> : null}

                    <RoundBtn text='save' disabled={false} onClick={this.onSaveClicked} />
                    <div className='paddedBox'>
                        <Icon enabled={true} src={newIcon} className='tableRowIcon' onClick={() => this.setState({ createClicked: true })} />
                    </div>
                </div>
            </>
        );
    }

    private onFlatTypeChange = (value: ValueType<selectType>) => {
        if (value) {
            const chosenFlatType = value as selectType;
            this.setState({
                chosenFlatType
            }, async () => {
                await this.parseDays();
            });
        }
    }

    private onFromChange = (from: Date) => {
        from.setUTCHours(11, 0, 0, 0);
        if (from < this.state.to) {
            this.setState({
                from
            }, async () => {
                await this.parseDays();
            });
        }
    }

    private parseDays = async () => {
        const chosenFlatType = this.state.chosenFlatType.value;
        if (chosenFlatType) {
            shared.busyFunction(true);
            const reservedFlats = [];
            let dt = new Date(this.state.from);
            let reachEnd = false;
            const toReserve: CountDateCouple[] = [];
            while (!reachEnd) {
                console.log('--------------------');
                const reservedFlatsForDt: ReservedFlatEntity[] = await appController.flatTypeFetcher.getReservedFlatsFor(dt, chosenFlatType.type, true);
                console.log('--------------------');
                reservedFlats.push(reservedFlatsForDt);
                toReserve.push({
                    count: 0,
                    at: dt
                });
                dt = new Date(dt);
                dt.setDate(dt.getDate() + 1);
                reachEnd = (dt.getTime() > this.state.to.getTime());
            }
            this.setState({
                reservedFlats,
                toReserve
            });
            shared.busyFunction(false);
        }
    }

    private renderReservedFlats = () => {
        const chosenFlatType = this.state.chosenFlatType.value;
        if (chosenFlatType) {
            const total = chosenFlatType.count;
            const listItems = [];
            for (let index = 0; index < this.state.toReserve.length; index++) {
                const dt = this.state.toReserve[index].at;
                const rf = this.state.reservedFlats[index];
                listItems.push(
                    <div id='cardContainer' key={index}>
                        <div className='textAlignLeft' id='monthStartDiv'>{((index === 0) || (dt.getDate() === 1)) ? `${months[dt.getMonth()]} ${dt.getFullYear()}` : ''}</div>
                        <div className='textAlignLeft' id='weekDiv'>{weekDays[dt.getDay()]}</div>
                        <div className='textAlignLeft' id='dayDiv'>{dt.getDate()}</div>
                        <DigitsInput id='reservedDiv' className='center' placeHolder={(rf.length).toString()} value={rf.length + this.state.toReserve[index].count} onChange={(num: number) => this.onReservedFlatsChanged(num, index)} />
                        <div className='center' id='availableDiv'>{total - rf.length}</div>
                    </div>
                );
            }
            return listItems;
        }
        return null;
    }

    private onReservedFlatsChanged = (num: number, index: number) => {
        const chosenFlatType = this.state.chosenFlatType.value as any;
        const total = chosenFlatType.count;
        const len = this.state.reservedFlats[index].length;
        const toReserve = this.state.toReserve;
        num = parseInt(num as any, 10);
        if (num === 0) {
            toReserve[index].count = 0;
            this.setState({
                toReserve
            });
            return;
        }
        if ((num > len) && (num <= total)) {
            toReserve[index].count = num - len;
            this.setState({
                toReserve
            });
        }
    }

    private onToChange = (to: Date) => {
        to.setUTCHours(11, 0, 0, 0);
        if (to > this.state.from) {
            this.setState({
                to
            }, async () => {
                await this.parseDays();
            });
        }
    }

    private onSaveClicked = async () => {
        console.log('ToReserve:', this.state.toReserve);
        const userProfile = storage.userProfile;
        console.log(userProfile);
        if (userProfile) {
            const chosenFlatType = this.state.chosenFlatType.value;
            if (chosenFlatType) {
                shared.busyFunction(true);
                for (let index = 0; index < this.state.toReserve.length; index++) {
                    const couple = this.state.toReserve[index];
                    if (couple.count === 0) {
                        continue;
                    }
                    // forDate: Date, toDate: Date, type: string, count: number, reserverID: number, isLog?: boolean
                    const from = couple.at; from.setUTCHours(11, 0, 0, 0);
                    const to = new Date(from); to.setDate(from.getDate() + 1); to.setUTCHours(10, 59, 59, 999);

                    // TODO: handle this case after desiredChunks added
                    // const reservationEntity = await appController.flatTypeFetcher.reserve(from, to, chosenFlatType.type, couple.count, userProfile.id);
                    // console.log('reserved:', reservationEntity);
                }
                shared.busyFunction(false);
                await this.parseDays();
            }
        }
    }
}

export default ViewAllAcrossTime;
