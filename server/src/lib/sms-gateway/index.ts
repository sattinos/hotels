import * as querystring from 'querystring';
import axios from 'axios';
import mobilyWSConfig from './config';
import { Logger } from '@nestjs/common';

export interface SMSSendInfo {
    result: number;
    MessageAr: string;
    MessageEn: string;
}

export interface BalanceInfo {
    Balance: string;
}

interface ETRespose<T> {
    Response: T;
    ResponseStatus: 'Success' | 'failed';
    status: number;     // 1 if connected, otherwise fail
    Data: T;
    Error: any;
}

class ExpertTexting {
    public async sendSMS(to: string, sms: string, isUnicode: boolean = false): Promise<ETRespose<SMSSendInfo> | null> {
        try {
            const params: any = {
                username: mobilyWSConfig.username,
                password: mobilyWSConfig.password,
                api_key: mobilyWSConfig.api_key,
                from: 'DEFAULT',
                to,
                text: sms
            };
            if (isUnicode) {
                params.type = 'unicode';
            }
            const urlEncodedParameters = querystring.stringify(params);
            const res = await axios({
                method: 'post',
                url: `${mobilyWSConfig.baseUrl}${mobilyWSConfig.sendSmsPath}`,
                data: urlEncodedParameters
            });
            return res.data;
        } catch (err) {
            Logger.error(`sendSMS(err): ${err.message}`);
            return null;
        }
    }

    public async checkBalance(): Promise<ETRespose<BalanceInfo> | null> {
        try {
            const url = `${mobilyWSConfig.baseUrl}${mobilyWSConfig.checkBalance}`;
            const res = await axios({
                method: 'get',
                url,
                params: {
                    username: mobilyWSConfig.username,
                    password: mobilyWSConfig.password,
                    api_key: mobilyWSConfig.api_key,
                }
            });
            return res.data;
        } catch (err) {
            Logger.error(`checkBalance(err): ${err.message}`);
            return null;
        }
    }
}

const expertTexting = new ExpertTexting();
export default expertTexting;