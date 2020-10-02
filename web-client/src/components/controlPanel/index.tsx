import * as React from 'react';
import Row from '../lib/row';
import localizer from '../../controller/lib/localization/localizer';

import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { RoundBtn } from '../lib/roundButton';
import { Redirect } from 'react-router';
import { paths } from '../../paths';

// tslint:disable-next-line: interface-over-type-literal
type selectType = { value: any, label: string };

const choices: selectType[] = [
    { label: 'Beds', value: paths.vaBed },
    { label: 'Rooms', value: paths.vaRoom },
    { label: 'Flats', value: paths.vaFlatType },
    { label: 'Reservations', value: paths.vaReservation }
];

export interface ControlPanelProps {
    s?: string;
}

export interface ControlPanelState {
    activeRoute: string;
    submitTapped: boolean;
}

class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {
            activeRoute: '',
            submitTapped: false
        };
    }

    render() {
        if ((this.state.activeRoute.length > 0) && this.state.submitTapped) {
            return <Redirect to={this.state.activeRoute} />;
        }
        return (
            <div className='center form'>
                <h1>
                    {localizer.text('cp.title')}
                </h1>
                <div id='rowDiv'>
                    <Row isRtl={true} name={localizer.text('cp.task')}>
                        <Select options={choices} onChange={(value: ValueType<selectType>) => this.onSelectChange(value)} />
                    </Row>
                </div>
                <div id='itemDiv'>
                    <RoundBtn text={localizer.text('submit')} disabled={false} onClick={this.onSubmitClicked} />
                </div>
            </div>
        );
    }

    private onSelectChange = (value: ValueType<selectType>) => {
        if (!value) {
            return;
        }
        const newV: selectType = value as selectType;
        this.setState({
            activeRoute: newV.value
        });
    }

    private onSubmitClicked = () => {
        if (this.state.activeRoute.length > 0) {
            this.setState({
                submitTapped: true
            });
        }
    }
}

export default ControlPanel;
