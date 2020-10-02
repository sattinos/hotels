import { UserProfile } from '../model/userProfile';
import accountsFetcher from './network/accountsFetcher';
import { EntityFetcher } from './network/entityFetcher';
import { BedEntity } from '../model/bedEntity';
import config from '../config';
import { RoomEntity } from '../model/roomEntity';
import { ReservationEntity } from '../model/reservationEntity';
import { ReservationLogEntity } from '../model/reservationLogEntity';
import { FlatTypeFetcher } from './network/flatTypeFetcher';
import { PromoCodeEntity } from '../model/promoCodeEntity';
import { storage } from '../components/storage';
import localizer from './lib/localization/localizer';

class AppController {
    private _bedsFetcher = new EntityFetcher<BedEntity>(`${config.Network.baseUrl}`, config.Network.paths[0]);
    private _roomsFetcher = new EntityFetcher<RoomEntity>(`${config.Network.baseUrl}`, config.Network.paths[1]);
    private _flatTypeFetcher = new FlatTypeFetcher(`${config.Network.baseUrl}`, config.Network.paths[2]);
    private _reservationsFetcher = new EntityFetcher<ReservationEntity>(`${config.Network.baseUrl}`, config.Network.paths[3]);
    private _userProfileFetcher = new EntityFetcher<UserProfile>(`${config.Network.baseUrl}`, config.Network.paths[4]);
    private _reservationsLogsFetcher = new EntityFetcher<ReservationLogEntity>(`${config.Network.baseUrl}`, config.Network.paths[5]);
    private _promoCodeFetcher = new EntityFetcher<PromoCodeEntity>(`${config.Network.baseUrl}`, config.Network.paths[6]);

    public get promoCodeFetcher() {
        return this._promoCodeFetcher;
    }

    public get userProfileFetcher() {
        return this._userProfileFetcher;
    }

    public get bedsFetcher() {
        return this._bedsFetcher;
    }

    public get reservationsFetcher() {
        return this._reservationsFetcher;
    }

    public get reservationsLogsFetcher() {
        return this._reservationsLogsFetcher;
    }

    public get roomsFetcher() {
        return this._roomsFetcher;
    }

    public get flatTypeFetcher() {
        return this._flatTypeFetcher;
    }

    public async register(userProfile: UserProfile): Promise<UserProfile | null> {
        try {
            return await accountsFetcher.register(userProfile);
        } catch (err) {
            console.log('register(err):', err);
            return null;
        }
    }

    public async setProfile(userProfile: UserProfile): Promise<{ isSuccess: boolean, message: string }> {
        try {
            const result = await accountsFetcher.setProfile(userProfile);
            if (result.isSuccess === false) {
                let message = localizer.text('dialog.generalFail');
                if (result.phoneAlreadyUsed) {
                    message = localizer.text('dialog.phoneUsed');
                }
                if (result.nicknameAlreadyUsed) {
                    message = localizer.text('dialog.userNameFound');
                }
                return {
                    isSuccess: false,
                    message
                };
            }
            userProfile.filename = (result as any).filename;
            console.log('result:', userProfile);
            localStorage.userProfile = JSON.stringify(userProfile);
            storage.userProfile = userProfile  as any;
            return {
                isSuccess: true,
                message: localizer.text('profilePage.savedSuccessfully')
            };
        } catch (err) {
            console.log('setProfile(err):', err);
            return {
                isSuccess: false,
                message: localizer.text('dialog.generalFail')
            };
        }
    }

    public async login(userName: string, password: string, token: string): Promise<{ message: string, isSuccess: boolean }> {
        try {
            console.log('login controller function');            
            const user = await accountsFetcher.login(userName, password, token);
            if (user) {
                localStorage.userProfile = JSON.stringify(user);
                storage.userProfile = user;
                return {
                    message: '',
                    isSuccess: true
                };
            }
            return {
                message: localizer.text('dialog.invalidCredentials'),
                isSuccess: false
            };
        } catch (err) {
            console.log('appController login(err):', err);
            return {
                message: localizer.text('dialog.generalFail'),
                isSuccess: false
            };
        }
    }

    public async forgotPassword(phoneNo: string): Promise<{ message: string, isSuccess: boolean }> {
        try {
            const result = await accountsFetcher.forgotPassword(phoneNo);
            if (!result || result.isSuccess === false) {
                return {
                    message: localizer.text('dialog.generalFail'),
                    isSuccess: false
                };
            }
            return {
                isSuccess: true,
                message: localizer.text('dialog.resetSucceeded')
            };
        } catch (error) {
            console.log('forgotPassword(err):', error);
            return {
                message: localizer.text('dialog.generalFail'),
                isSuccess: false
            };
        }
    }

    public async logout() {
        try {
            const result = await accountsFetcher.logout();
            if (!result || !result.isSuccess) {
                return {
                    message:  localizer.text('dialog.generalFail'),
                    isSuccess: false
                };
            }
            return {
                isSuccess: true,
                message: ''
            };
        } catch (err) {
            console.log('logout(err):', err);
            return {
                message: localizer.text('dialog.generalFail'),
                isSuccess: false
            };
        }
    }
}
const appController = new AppController();
export default appController;
