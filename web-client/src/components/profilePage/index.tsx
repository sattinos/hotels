import * as React from 'react';
import LoadingIndicator from '../loadingIndicator/index';
import appController from '../../controller/appController';
import { UserProfile } from '../../model/userProfile';
import { DialogBox } from '../dialogBox';
import { UserProfileEditor } from '../userProfileEditor';
import { storage } from '../storage';
import { shared } from '../shared';
import localizer from '../../controller/lib/localization/localizer';

export interface ProfilePageState {
    isBusy: boolean;
    isAlertVisible: boolean;
    alertTxt: string;
    onOkTapped: () => void;
    isConfirm: boolean;
}

export default class ProfilePage extends React.Component<{}, ProfilePageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isBusy: false,
            isAlertVisible: false,
            alertTxt: '',
            onOkTapped: this.onOkTapped,
            isConfirm: false
        };
    }

    public render() {
        const userProfile = storage.userProfile;
        if (!userProfile) {
            return null;
        }
        return (
            <div>
                <UserProfileEditor
                    saveTxt={localizer.text('profilePage.save')}
                    title={localizer.text('profilePage.editProfile')}
                    profile={userProfile}
                    onOkTapped={this.onSaveTapped}
                />
                <LoadingIndicator visible={this.state.isBusy} />
                {this.renderAlert()}
            </div>
        );
    }

    public setBusy(isBusy: boolean) {
        this.setState({
            isBusy
        });
    }

    private onSaveTapped = async (userProfile: UserProfile) => {
        this.setBusy(true);
        console.log('onSaveTapped: ', userProfile);
        const response = await appController.setProfile(userProfile);
        this.setBusy(false);
        this.alert(response.message, () => {
            if (response.isSuccess) {
                shared.update();
            }
        });
    }

    private onOkTapped = () => {
        this.hideAlert();
    }

    private onConfirmTapped = async () => {
        this.setBusy(true);
        const result = await appController.logout();
        if (result.isSuccess) {
            window.location.href = '/';
        }
        this.setBusy(false);
    }

    private renderAlert() {
        if (this.state.isConfirm) {
            return (
                <DialogBox
                    text={this.state.alertTxt}
                    isVisible={this.state.isAlertVisible}
                    okText={localizer.text('dialog.ok')}
                    cancelText={localizer.text('dialog.cancel')}
                    okDisabled={false}
                    onOkTapped={this.onConfirmTapped}
                    onCancelTapped={() => this.hideAlert()}
                />
            );
        }
        return (
            <DialogBox
                text={this.state.alertTxt}
                isVisible={this.state.isAlertVisible}
                okText={localizer.text('dialog.ok')}
                okDisabled={false}
                onOkTapped={() => this.hideAlert()}
            />
        );
    }

    private alert(alertTxt: string, onOkTapped?: () => void) {
        const state: any = {
            isAlertVisible: true,
            alertTxt,
            isConfirm: false
        };
        if (onOkTapped) {
            state.onOkTapped = () => {
                onOkTapped();
                this.setState({
                    onOkTapped: this.onOkTapped
                });
            };
        }
        this.setState(state);
    }

    private hideAlert() {
        this.setState({
            isAlertVisible: false,
            alertTxt: ''
        });
    }
}
