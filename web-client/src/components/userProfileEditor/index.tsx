import * as React from 'react';
import './style.less';
import { UserProfile } from '../../model/userProfile';
import { FileUploader } from '../lib/fileUploader';
import { RoundBtn } from '../lib/roundButton';
import RoundLink from '../lib/roundLink';
import localizer from '../../controller/lib/localization/localizer';
import RegexHelper from '../../controller/lib/regexHelper';
import MsisdnHelper from '../../controller/lib/msisdnHelper';
import { isStringValid } from '../../controller/lib/validators';
import config from '../../config';

export interface UserProfileEditorProps {
    title: string;
    saveTxt: string;
    profile: UserProfile;
    onOkTapped: (prof: UserProfile) => void;
    onCancelTapped?: () => void;
    cancelUrl?: string;
}

export interface UserProfileEditorState {
    profile: UserProfile;
    clickEnabled: boolean;
}

export class UserProfileEditor extends React.Component<UserProfileEditorProps, UserProfileEditorState> {
    private _fileUploader: FileUploader | undefined = undefined;
    private _chosenFile: File | undefined = undefined;

    constructor(props: UserProfileEditorProps) {
        super(props);
        this.state = {
            profile: this.props.profile,
            clickEnabled: false
        };
        /*
        setTimeout(() => {
            const profile = this.state.profile;
            Object.assign(profile, {
                fullName: 'sample name',
                userName: 'u123',
                password: '14444444444',
                phone: '0543202636',
                isVerified: false,
                token: ''
            });
            this.setState({ profile });
        }, 200);
        */
    }

    public componentDidMount() {
        this.refresh();
    }

    public render() {
        return (
            <div className='center' id='registerPage'>
                <div className='formTitle textAlignLeft'>{this.props.title}</div>
                <div id='inputBox'>
                    <input className='input' type='text' value={this.state.profile.fullName} placeholder={localizer.text('register.fullName')} onChange={this.onFullNameChange} />
                    <input className='input' type='text' value={this.state.profile.userName} placeholder={localizer.text('register.userName')} onChange={this.onUserNameChange} />
                    <input className='input' type='password' value={this.state.profile.password} placeholder={localizer.text('register.password')} onChange={this.onPasswordChange} />
                    <input className='input' type='tel' value={this.state.profile.phone} placeholder={localizer.text('register.phonePlaceHolder')} onChange={this.onPhoneChange} pattern='[0-9]*' />
                    {this.renderImageView()}
                    <div id='photoRow'>
                        <RoundBtn id='chooseBtn' disabled={false} text={localizer.text('register.choose')} onClick={this.onChooseClicked} />
                    </div>
                    <FileUploader onFilesChosen={this.onFilesChosen} ref={(uploader: FileUploader) => this._fileUploader = uploader} />
                    <div id='registerDiv'>
                        {this.renderCancelBtn()}
                        <RoundBtn disabled={!this.state.clickEnabled} onClick={this.onClickTapped} text={this.props.saveTxt} />
                    </div>
                </div>
            </div>
        );
    }

    private renderCancelBtn = () => {
        if (!this.props.cancelUrl) {
            return null;
        }
        return (
            <RoundLink id='backBtn' disabled={false} text={localizer.text('common.back')} to={this.props.cancelUrl} />
        );
    }

    private renderImageView = () => {
        if (!isStringValid(this.state.profile.filename)) {
            return null;
        }
        const url = this._chosenFile ? URL.createObjectURL(this._chosenFile) : `${config.baseURL}/${this.state.profile.filename}`;
        return (
            <div id='photoDiv' className='center'>
                <br />
                <img src={url} onClick={this.onChooseClicked} id={'photoViewer'} />
            </div>
        );
    }

    private onChooseClicked = () => {
        if (this._fileUploader) {
            this._fileUploader.open();
        }
    }

    private onFilesChosen = (files: File[]) => {
        if (files.length < 1) {
            return;
        }
        const profile = this.state.profile;
        profile.filename = files;
        this._chosenFile = files[0];
        this.setState({
            profile
        }, () => {
            this.refresh();
        });
    }

    private onPhoneChange = ({ target }: any) => {
        const profile = this.state.profile;
        let phoneNumber = target.value;
        if (phoneNumber === '') {
            profile.phone = phoneNumber;
            this.setState({
                profile
            }, () => {
                this.refresh();
            });
            return;
        }

        const hasZero = (phoneNumber.length > 1) && (phoneNumber[0] === '0');
        const parsed = Number.parseInt(phoneNumber, 10);
        if (!isNaN(parsed)) {
            phoneNumber = hasZero ? `0${parsed}` : parsed as any;
            profile.phone = phoneNumber;
            this.setState({
                profile
            }, () => {
                this.refresh();
            });
        }
    }

    private onPasswordChange = ({ target }: any) => {
        const profile = this.state.profile;
        profile.password = target.value;
        this.setState({
            profile
        }, () => {
            this.refresh();
        });
    }

    private onFullNameChange = async ({ target }: any) => {
        const profile: UserProfile = this.state.profile;
        profile.fullName = target.value;

        this.setState({
            profile
        }, () => {
            this.refresh();
        });
    }

    private onUserNameChange = ({ target }: any) => {
        let userName: string = target.value;
        if ((userName.length > 0) && !RegexHelper.IsUserName(userName)) {
            return;
        }
        userName = userName.toLowerCase();
        const profile = this.state.profile;
        profile.userName = userName;
        this.setState({
            profile
        }, () => {
            this.refresh();
        });
    }

    private onClickTapped = async () => {
        if (!this.state.clickEnabled) {
            return;
        }
        const profile = { ... this.state.profile };
        profile.phone = MsisdnHelper.transformToFullNumber(profile.phone);
        this.props.onOkTapped(profile);
    }

    private refresh() {
        const isPhoneValid = MsisdnHelper.validateMsisdn(this.state.profile.phone);
        const clickEnabled = (this.state.profile.userName.length > 0) &&
            (this.state.profile.fullName.length > 0) &&
            isPhoneValid &&
            (this.state.profile.password.length > 6) &&
            !!this.state.profile.filename;
        this.setState({
            clickEnabled
        });
    }
}