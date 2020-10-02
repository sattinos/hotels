import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../resetPassword/style.less';
import { Header } from '../header';
import LoadingIndicator from '../loadingIndicator/index';
import setNewPasswordController from '../../controller/setNewPasswordController';
import { DialogBox } from '../dialogBox';
import localizer from '../../controller/lib/localization/localizer';

export interface ResetPasswordResponsePageState {
    newPassword: string;
    setEnabled: boolean;
    isDone: boolean;
    isBusy: boolean;
    isAlertVisible: boolean;
    alertTxt: string;
}

export class ResetPasswordResponsePage extends React.Component<any, ResetPasswordResponsePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            newPassword: '',
            setEnabled: false,
            isDone: false,
            isBusy: false,
            isAlertVisible: false,
            alertTxt: ''
        };
    }

    public render() {
        return (
            <>
                <div className='center' id='ResetPasswordResponsePage'>
                    <Header text={localizer.text('resetResponse.title')} />
                    {this.renderDoneDiv()}
                    {this.renderResetForm()}
                    <LoadingIndicator visible={this.state.isBusy} />
                    <DialogBox
                        text={this.state.alertTxt}
                        isVisible={this.state.isAlertVisible}
                        okText={localizer.text('dialog.ok')}
                        okDisabled={false}
                        onOkTapped={() => this.hideAlert()}
                    />
                </div>
            </>
        );
    }

    private alert(alertTxt: string) {
        this.setState({
            isAlertVisible: true,
            alertTxt
        });
    }

    private hideAlert() {
        this.setState({
            isAlertVisible: false,
            alertTxt: ''
        });
    }

    private renderDoneDiv() {
        if (this.state.isDone) {
            return (
                <div id='doneDiv'>
                    {localizer.text('dialog.setSucceeded')}
                </div>
            );
        }
    }

    private renderResetForm() {
        if (!this.state.isDone) {
            return (
                <>
                    <div id='inputBox'>
                        <input className='input' type='text' placeholder={localizer.text('resetResponse.title')} onChange={this.onNewPasswordChange} />
                    </div>
                    <div>
                        <button id='sendBtn' className='roundedBtn' disabled={!this.state.setEnabled} onClick={this.onSetTapped}>{localizer.text('resetResponse.resetBtn')}</button>
                    </div>
                </>
            );
        }
    }

    private onNewPasswordChange = ({ target }: any) => {
        this.setState({
            newPassword: target.value
        }, () => {
            this.refresh();
        });
    }

    private onSetTapped = async () => {
        this.setBusy(true);
        const result = await setNewPasswordController.setNewPassword(this.state.newPassword);
        this.setBusy(false);
        this.alert(result.message);
        if (result.isSuccess) {
            this.setState({
                isDone: true
            });
        }
    }

    private setBusy(isBusy: boolean) {
        this.setState({ isBusy });
    }

    private refresh() {
        const setEnabled = (this.state.newPassword.length > 5);
        this.setState({
            setEnabled
        });
    }
}

setNewPasswordController.fetchReferralInfo();

ReactDOM.render(
    <ResetPasswordResponsePage />,
    document.getElementById('root')
);
