import * as React from 'react';
import { UserProfile } from '../../model/userProfile';
import appController from '../../controller/appController';
import { UserProfileEditor } from '../userProfileEditor';
import accountsFetcher, { UserResultCode } from '../../controller/network/accountsFetcher';
import DigitsInput from '../lib/digitsInput/input';
import { RoundBtn } from '../lib/roundButton';
import localizer from '../../controller/lib/localization/localizer';
import { shared } from '../shared';
import { Redirect } from 'react-router';
import { userProfileMessages } from '../../texts';

import '../../common.less';
import { paths } from '../../paths';

interface RegisterPageState {
    stage: number;
    otp: number;
    isRegistered: boolean;
}

export default class RegisterPage extends React.Component<{}, RegisterPageState> {
    private _profile: UserProfile = new UserProfile();
    private _components: any[];

    constructor(props: {}) {
        super(props);
        this.state = {
            stage: 0,
            otp: 0,
            isRegistered: false
        };
        this._components = [
            this.renderRegisterStage,
            this.renderVerifyStage
        ];
    }

    public renderRegisterStage = () => {
        if (!this._profile) {
            this._profile = new UserProfile();
        }
        const userProfile = this._profile;
        return (
                <div className='center formBox'>
                    <div className='center' id='vendorLogo' />
                    <UserProfileEditor
                        saveTxt={localizer.text('register.save')}
                        title={localizer.text('register.title')}
                        cancelUrl={paths.signIn}
                        profile={userProfile}
                        onOkTapped={this.onRegisterTapped}
                    />
                </div>
        );
    }

    public renderVerifyStage = () => {
        return (
            <div className='center paddedBox'>
                <h1>{localizer.text('register.verifyPhone')}</h1>
                <DigitsInput value={this.state.otp} className='input' placeHolder='' onChange={this.onOtpChange} />
                <RoundBtn text={localizer.text('register.verify')} disabled={this.state.otp < 999} onClick={this.onVerifyClicked} />
            </div>
        );
    }

    public render = () => {
        if (this.state.isRegistered) {
            console.log('redirecting to profile...');
            return (
                <Redirect to='/' />
            );
        }
        return (
            this._components[this.state.stage]()
        );
    }

    private onRegisterTapped = async (userProfile: UserProfile) => {
        shared.busyFunction(true);
        const queryResult = await accountsFetcher.isFound(userProfile);
        shared.busyFunction(false);
        if ((queryResult !== UserResultCode.notFound)) {
            shared.alertFunction(userProfileMessages[queryResult]);
            return;
        }
        shared.busyFunction(true);
        const result = await appController.register(userProfile);
        shared.busyFunction(false);
        if (result) {
            this._profile = result;
            this.setState({
                stage: 1
            });
        }
    }

    private onOtpChange = (otp: number) => {
        this.setState({
            otp
        });
    }

    private onVerifyClicked = async () => {
        shared.busyFunction(true);
        const result = await accountsFetcher.verify(this._profile.phone, this.state.otp);
        shared.busyFunction(false);
        if (result && result.isSuccess) {
            shared.alertFunction(userProfileMessages[UserResultCode.success], () => {
                this.setState({
                    isRegistered: true
                });
            });
        } else {
            shared.alertFunction(userProfileMessages[UserResultCode.unknown]);
        }
    }
}
