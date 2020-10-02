import * as React from 'react';
import './style.less';
import ViewAllCrud from '../entityCRUD/viewAllCrud';
import localizer from '../../controller/lib/localization/localizer';
import { OptionsInput } from '../lib/optionsInput';
import appController from '../../controller/appController';
import { ReservationEntity, reservationStatusString } from '../../model/reservationEntity';
import ViewReservation from './view';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { shared } from '../shared';

export interface ViewAllReservationsProps {
    onCreateClicked: () => void;
    onEditClicked: (entityID: number) => void;
}

export interface ViewAllReservationsState {
    reservationToView: ReservationEntity | null;
}

class ViewAllReservations extends React.Component<ViewAllReservationsProps, ViewAllReservationsState> {
    private _tableRef: any = null;

    private columns = [
        { Header: 'ID', accessor: 'id', className: 'center', minResizeWidth: 20 },

        {
            Header: 'Details', className: 'center', minResizeWidth: 20, sortable: false,
            Cell: ({ original }: any) => (
                <a onClick={(_e: any) => this.onDetailsClicked(original)}>{'View Details'}</a>
            )
        },

        {
            Header: 'Status', accessor: 'status', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <OptionsInput title={''} options={reservationStatusString} index={original.status} OnOptionSelected={(index: number) => this.onReservationStatusSelected(original, index)} />
            )
        },

        { Header: 'From', id: 'from', accessor: (reservationInstance: ReservationEntity) => reservationInstance.from.toDateString(), className: 'center', minResizeWidth: 20  },
        { Header: 'To', id: 'to', accessor: (reservationInstance: ReservationEntity) => reservationInstance.to.toDateString(), className: 'center', minResizeWidth: 20 },
        {
            Header: 'Channel', accessor: 'channel', className: 'center', minResizeWidth: 20,
            Cell: ({ original }: any) => (
                <input value={original.channel} className='tableEditText' type='text' onChange={(e: any) => this.onRowFieldChange(original, 'channel', e.target.value)} />
            )
        },
        { Header: 'Time of Creation', accessor: 'createdAt', className: 'center', minResizeWidth: 20 },
        { Header: 'Time of Update', accessor: 'updatedAt', className: 'center', minResizeWidth: 20 },
        {
            Header: 'Reserver Fullname', id: 'fullName', minResizeWidth: 20, sortable: false, accessor: (reservationEntity: ReservationEntity) => {
                if (reservationEntity.reservers.length === 0) {
                    return '';
                }
                return reservationEntity.reservers[0].fullName;
            }, className: 'center'
        },
        {
            Header: 'Reserver Phone', id: 'phone', minResizeWidth: 20, sortable: false, accessor: (reservationEntity: ReservationEntity) => {
                if (reservationEntity.reservers.length === 0) {
                    return '';
                }
                return reservationEntity.reservers[0].phone;
            }, className: 'center'
        },
        {
            Header: 'Reserver Username', id: 'userName', minResizeWidth: 20, sortable: false, accessor: (reservationEntity: ReservationEntity) => {
                if (reservationEntity.reservers.length === 0) {
                    return '';
                }
                return reservationEntity.reservers[0].userName;
            }, className: 'center'
        }
    ];

    constructor(props: ViewAllReservationsProps) {
        super(props);
        this.state = {
            reservationToView: null
        };
    }

    public render() {
        if (this.state.reservationToView) {
            return <ViewReservation isVisible={true} entity={this.state.reservationToView} onBackClicked={this.onBackFromViewDetailsClicked}/>;
        }

        return (
            <ViewAllCrud<ReservationEntity>
                title={localizer.text('reserve.viewAll')}
                columns={this.columns}
                entityFetcher={appController.reservationsFetcher}
                entityName='reservation'
                ref={(e: any) => this._tableRef = e}
                onDataFetched={this.onReservationsFetched}
                deleteEnabled={false}
            />
        );
    }

    private onReservationsFetched = (reservations: ReservationEntity[]) => {
        for (let index = 0; index < reservations.length; index++) {
            const reservation = reservations[index];
            reservation.from = new Date(reservation.from);
            reservation.to = new Date(reservation.to);
        }
        return reservations;
    }

    private onReservationStatusSelected = (row: ReservationEntity, index: number) => {
        row.status = index;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }

    private onRowFieldChange = (row: ReservationEntity, fieldName: string, value: any) => {
        (row as any)[fieldName] = value;
        if (this._tableRef) {
            this._tableRef.onEntityModified(row);
        }
    }

    private onDetailsClicked = async (entity: ReservationEntity) => {
        console.log('OnDetails Clicked:', entity);
        const reservationToView = await EntityFetcher.fetch<ReservationEntity>(appController.reservationsFetcher, entity.id as any, shared.busyFunction);
        console.log('fetched:', reservationToView);
        if (reservationToView) {
            reservationToView.from = new Date(reservationToView.from);
            reservationToView.to = new Date(reservationToView.to);
            this.setState({
                reservationToView
            });
        }
    }

    private onBackFromViewDetailsClicked = () => {
        this.setState({
                reservationToView: null
            });
    }
}

export default ViewAllReservations;
