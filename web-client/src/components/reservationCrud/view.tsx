import * as React from 'react';
import { ReservationEntity, DesiredReservationChunk } from '../../model/reservationEntity';
import './style.less';
import localizer from '../../controller/lib/localization/localizer';
import { RoundBtn } from '../lib/roundButton';
import ReservationViewer from './reservationViewer';
import ModalBG from '../modalBG';

export interface ViewReservationProps {
    entity: ReservationEntity;
    isVisible: boolean;
    onBackClicked: () => void;
}

class ViewReservation extends React.Component<ViewReservationProps, {}> {
    render() {
        return (
            <ModalBG isVisible={this.props.isVisible} >
                <div id='modalViewDiv' className='form center'>
                    <ReservationViewer title={localizer.text('reserve.view')}
                                       entity={this.props.entity}
                                       onNewEntityAvailable={this.onNewEntityAvailable}
                                       readOnly />
                    <div>
                        <RoundBtn text={localizer.text('common.back')} disabled={false} onClick={this.props.onBackClicked} />
                    </div>
                </div>
            </ModalBG>
        );
    }

    onNewEntityAvailable = async (_entity: ReservationEntity, _desiredChunks: DesiredReservationChunk[]) => {
        //
    }
}

export default ViewReservation;
