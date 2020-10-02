import * as React from 'react';
import RegexHelper from '../../controller/lib/regexHelper';
import { CenterHVDiv } from '../lib/centerHVDiv';
import RoundLink from '../lib/roundLink';
import { NavLink, Redirect } from 'react-router-dom';
import { RoundBtn } from '../lib/roundButton';
import localizer from '../../controller/lib/localization/localizer';

import './style.less';
import appController from '../../controller/appController';
import { shared } from '../shared';
import { paths } from '../../paths';
import { storage } from '../storage';

interface SignPageState {
    userName: string;
    password: string;
    signEnabled: boolean;
}

export default class SignPage extends React.Component<{}, SignPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            signEnabled: false
        };
    }    

    public render() {
        if (storage.userProfile) {
            return (
                <Redirect to={paths.welcome} />
            );
        }
        return (
            <CenterHVDiv>
                <div className='center formBox'>
                    <div className='center' id='vendorLogo' />
                    <div className='textAlignLeft'>
                        <div id='signTitle'>{localizer.text('sign.title')}</div>
                        {this.renderUserNameRow()}
                        {this.renderPasswordRow()}
                    </div>
                    <div>
                        <RoundBtn disabled={!this.state.signEnabled} onClick={this.onSigninTapped} text={localizer.text('sign.signBtn')} />
                        <RoundLink id='signupBtn' disabled={false} text={localizer.text('sign.signUp')} to={paths.signUp} />
                    </div>
                    <NavLink id='forgotPwdTxt' to={paths.reset}>
                        {localizer.text('sign.forgotPwd')}
                    </NavLink>
                </div>
            </CenterHVDiv>
        );
    }

    private renderUserNameRow = () => {
        return (
            <div className='inputRow'>
                <div>
                    {localizer.text('sign.userName')}
                </div>
                <div>
                    <input className='input' type='text' placeholder={localizer.text('sign.userName')} onChange={this.onUserNameChange} value={this.state.userName} />
                </div>
            </div>
        );
    }

    private renderPasswordRow = () => {
        return (
            <div className='inputRow'>
                <div>
                    {localizer.text('sign.password')}
                </div>
                <div>
                    <input className='input' type='password' placeholder={localizer.text('sign.password')} onChange={this.onPasswordChange} value={this.state.password} />
                </div>
            </div>
        );
    }

    private onUserNameChange = ({ target }: any) => {
        this.setState({
            userName: target.value.toLowerCase()
        }, () => {
            this.refresh();
        });
    }

    private onPasswordChange = ({ target }: any) => {
        this.setState({
            password: target.value
        }, () => {
            this.refresh();
        });
    }

    private onSigninTapped = async () => {
        if (!this.state.signEnabled) {
            return;
        }
        shared.busyFunction(true);
        const loginResult = await appController.login(this.state.userName, this.state.password, '');
        if (!loginResult.isSuccess) {
            shared.alertFunction(loginResult.message);
        } else {
            shared.isMenuOpen = true;
        }
        shared.busyFunction(false);
    }

    private refresh() {
        this.setState({
            signEnabled: this.state.userName.length > 0 &&
                this.state.password.length > 0 &&
                RegexHelper.IsUserName(this.state.userName)
        });
    }
    /*
    // TODO: remove this method
    private hackSignIn() {
        setTimeout(() => {
            console.log('Time to login');
            this.setState({
                userName: 'u1234',
                password: '123',
                signEnabled: true
            }, async () => {
                await this.onSigninTapped();
            });
        }, 1000);
    }
    */
}
