import * as React from 'react';
import { ViewAllEntities } from '../entityCRUD/viewAllEntities';
import localizer from '../../controller/lib/localization/localizer';
import appController from '../../controller/appController';
import { ReservationLogEntity } from '../../model/reservationLogEntity';

export interface ViewAllReservationsLogProps {
    s?: string;
}

export interface ViewAllReservationsLogState {
    s?: string;
}

class ViewAllReservationsLog extends React.Component<ViewAllReservationsLogProps, ViewAllReservationsLogState> {
    private columns = [
        { Header: 'Created At', accessor: 'reservationCreatedAt', className: 'center', width: 208 },
        { Header: 'Updated At', accessor: 'reservationUpdatedAt', className: 'center', width: 208 },
        { Header: 'Flats IDs', accessor: 'flatsIDs', className: 'center', width: 80 },
        { Header: 'Status', accessor: 'status', className: 'center' },
        { Header: 'Reservers IDs', accessor: 'reserversIDs', className: 'center' },
        { Header: 'From', accessor: 'from', className: 'center', width: 208 },
        { Header: 'To', accessor: 'to', className: 'center', width: 208 },
        { Header: 'Channel', accessor: 'channel', className: 'center' },
        { Header: 'Action', accessor: 'action', className: 'center' }
    ];

    constructor(props: ViewAllReservationsLogProps) {
        super(props);
    }

    public render() {
        return (
            <ViewAllEntities<ReservationLogEntity>
                title={localizer.text('reservation-log.all')}
                columns={this.columns}
                entityFetcher={appController.reservationsLogsFetcher}
            />
        );
    }
}

export default ViewAllReservationsLog;
