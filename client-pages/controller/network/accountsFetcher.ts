import axios from 'axios';
import { UserProfile } from '../../model/userProfile';
import config from '../../config';
import { CommonResponse } from './networkFetcher';
import { UserRequest } from '../../model/flatType';

export enum UserResultCode {
    userNameUsed,
    phoneUsed,
    notFound,
    success,
    systemError,
    unknown
}

export interface RegisterResponse extends CommonResponse {
    nicknameAlreadyUsed?: boolean;
    phoneAlreadyUsed?: boolean;
}

class AccountsFetcher {
    private _urls = {
        isFound: '/ur/if',
        register: '/ur',
        login: '/ur/lg',
        setProfile: '/ur',
        forgotPassword: '/ur/fp',
        setNewPassword: '/ur/snp',
        logout: '/ur/lt',
        verify: '/ur/vr',
        reserve: ''
    };

    public async isFound(userProfile: UserProfile): Promise<UserResultCode> {
        const url = `${config.Network.baseUrl}${this._urls.isFound}`;
        try {
            const response = await axios({
                method: 'post',
                url,
                data: userProfile
            });
            return response.data;
        } catch (error) {
            console.error('isFound (err):', error);
            return UserResultCode.systemError;
        }
    }

    public async register(userProfile: UserProfile): Promise<UserProfile> {
        const url = `${config.Network.baseUrl}${this._urls.register}`;
        const formData = this.getFormDataFor(userProfile);
        const response = await axios({
            method: 'post',
            url,
            data: formData
        });
        return response.data;
    }

    public async reserve(userRequest: UserRequest): Promise<UserProfile> {
        const url = `${config.Network.baseUrl}${this._urls.reserve}`;
        const response = await axios({
            method: 'post',
            url,
            data: userRequest
        });
        return response.data;
    }

    public async login(userName: string, password: string, token: string): Promise<UserProfile | null> {
        const url = `${config.Network.baseUrl}${this._urls.login}`;
        const response = await axios({
            method: 'post',
            url,
            data: { un: userName, pw: password, token }
        });
        return response.data;
    }

    public async logout() {
        const url = `${config.Network.baseUrl}${this._urls.logout}`;
        const response = await axios({
            method: 'get',
            url
        });
        return response.data;
    }

    public async enterHomePage() {
        const response = await axios({
            method: 'get',
            url: config.Network.baseUrl
        });
        return response.data;
    }

    public async forgotPassword(phoneNo: string): Promise<CommonResponse> {
        const url = `${config.Network.baseUrl}${this._urls.forgotPassword}/${phoneNo}`;
        const response = await axios({
            method: 'get',
            url
        });
        return response.data;
    }

    public async setProfile(profile: UserProfile): Promise<RegisterResponse> {
        const url = `${config.Network.baseUrl}${this._urls.setProfile}/${profile.id}`;
        const formData = this.getFormDataFor(profile);
        const response = await axios({
            method: 'put',
            url,
            data: formData
        });
        return response.data;
    }

    public async setNewPassword(resetToken: string, newPassword: string): Promise<CommonResponse> {
        const url = `${config.Network.baseUrl}${this._urls.setNewPassword}`;
        const response = await axios({
            method: 'post',
            url,
            data: { resetToken, newPassword }
        });
        return response.data;
    }

    public async verify(msisdn: string, otp: number): Promise<CommonResponse> {
        const url = `${config.Network.baseUrl}${this._urls.verify}/${msisdn}/${otp}`;
        const response = await axios({
            method: 'get',
            url
        });
        return response.data;
    }

    getFormDataFor(entity: any) {
        const keys = Object.keys(entity);
        const formData = new FormData();
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (key === 'filename') {
                formData.append(key, entity.filename[0]);
            } else {
                formData.append(key, (entity as any)[key]);
            }
        }
        return formData;
    }
}
const accountsFetcher = new AccountsFetcher();
export default accountsFetcher;
