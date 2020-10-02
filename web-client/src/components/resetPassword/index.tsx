import * as React from 'react';
import './style.less';
import appController from '../../controller/appController';
import MsisdnHelper from '../../controller/lib/msisdnHelper';
import { CenterHVDiv } from '../lib/centerHVDiv';
import RoundLink from '../lib/roundLink';
import { RoundBtn } from '../lib/roundButton';
import localizer from '../../controller/lib/localization/localizer';
import { shared } from '../shared';
import { Redirect } from 'react-router';
import { paths } from '../../paths';
import config, { RunMode } from '../../config';

interface ResetPageState {
    phoneNo: string;
    resetEnabled: boolean;
    smsSent: boolean;
}

export default class ResetPage extends React.Component<{}, ResetPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            phoneNo: '',
            resetEnabled: false,
            smsSent: false
        };
    }

    public render() {
        if (this.state.smsSent) {
            if (config.RunMode !== RunMode.Production) {
                console.log('signin path: ', paths.signIn);
            }
            return (
                <Redirect to={paths.signIn} />
            );
        }
        return (
            <CenterHVDiv>
                <div className='center' id='ResetPage'>
                    <div className='center formBox'>
                        <div className='center' id='vendorLogo' />
                        <div id='resetPwdTitle' className='textAlignLeft'>
                            {localizer.text('reset.hint1')} {localizer.text('reset.hint2')}
                        </div>
                        <div id='inputBox'>
                            <input className='input' type='tel' placeholder={localizer.text('register.phonePlaceHolder')} onChange={this.onPhoneNoChange} value={this.state.phoneNo} pattern='[0-9]*' />
                        </div>

                        <div>
                            <RoundLink id='backBtn' disabled={false} text={localizer.text('common.back')} to={paths.signIn} />
                            <RoundBtn id='sendBtn' text={localizer.text('reset.resetBtn')} disabled={!this.state.resetEnabled} onClick={this.onResetTapped} />
                        </div>
                    </div>
                </div>
            </CenterHVDiv>
        );
    }

    private onPhoneNoChange = ({ target }: any) => {
        let phoneNo = target.value;
        if (phoneNo === '') {
            this.setState({
                phoneNo
            }, () => {
                this.refresh();
            });
            return;
        }

        const hasZero = (phoneNo.length > 1) && (phoneNo[0] === '0');
        const parsed = Number.parseInt(phoneNo, 10);
        if (!isNaN(parsed)) {
            phoneNo = hasZero ? `0${parsed}` : parsed as any;
            this.setState({
                phoneNo
            }, () => {
                this.refresh();
            });
        }
    }

    private onResetTapped = async () => {
        shared.busyFunction(true);
        const phoneNo = MsisdnHelper.transformToFullNumber(this.state.phoneNo);
        const result = await appController.forgotPassword(phoneNo);
        shared.busyFunction(false);
        shared.alertFunction(result.message, () => {
            if (result.isSuccess) {
                this.setState({
                    smsSent: true
                });
            }
        });
    }

    private refresh() {
        const resetEnabled = MsisdnHelper.validateMsisdn(this.state.phoneNo);
        this.setState({
            resetEnabled
        });
    }
}