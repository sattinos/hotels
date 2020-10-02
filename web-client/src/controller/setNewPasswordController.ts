import accountsFetcher from './network/accountsFetcher';
import localizer from './lib/localization/localizer';

class SetNewPasswordController {
    private _resetToken: string = '';

    public fetchReferralInfo() {
        const refInfoElement = document.getElementById('refInfo');
        if (refInfoElement) {
            try {
                const refJson = JSON.parse(refInfoElement.innerText);
                this._resetToken = refJson.resetToken;
            } catch (ex) {
                console.log('fetchReferralInfo(err):');
                console.log(ex);
            }
        }
    }

    public async setNewPassword(newPassword: string) {
        try {
            const result = await accountsFetcher.setNewPassword(this._resetToken, newPassword);
            if (!result || result.isSuccess === false) {
                return {
                    isSuccess: false,
                    message: localizer.text('dialog.generalFail')
                };
            }
            return {
                isSuccess: true,
                message: localizer.text('dialog.setSucceeded')
            };
        } catch (error) {
            console.log('setNewPassword(err):', error);
            return {
                isSuccess: false,
                message: localizer.text('dialog.generalFail')
            };
        }
    }
}
const setNewPasswordController = new SetNewPasswordController();
export default setNewPasswordController;
