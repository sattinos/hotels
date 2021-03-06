import axios from 'axios';
import { EntityFetcher } from './entityFetcher';
import { FlatTypeEntity } from '../../model/flatType';
import { ReservationEntity, DesiredReservationChunk } from '../../model/reservationEntity';
import { ReservedFlatEntity } from '../../model/reservedFlatEntity';
import config, { ServerPaths } from '../../config';

class FlatTypeFetcher extends EntityFetcher<FlatTypeEntity> {

    public async getFlatType(type: string, isLog?: boolean): Promise<FlatTypeEntity> {
        try {
            const url = `${this.baseUrl}${this.path}/getFlatType`;
            const response = await axios({
                method: 'get',
                url,
                params: {
                    type
                }
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.getFlatType (err):', error);
            throw error;
        }
    }

    public async getTypes(isLog?: boolean): Promise<string[]> {
        try {
            const url = `${this.baseUrl}${this.path}/getFlatTypes`;
            const response = await axios({
                method: 'get',
                url
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.getTypes (err):', error);
            return [];
        }
    }

    public async getTotalFlats(type: string, isLog?: boolean): Promise<number> {
        try {
            const url = `${this.baseUrl}${this.path}/getTotalFlats`;
            const response = await axios({
                method: 'get',
                url,
                params: {
                    type
                }
            });
            if (isLog) {
                console.log('url:', url);
                console.log('params:', type);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.getTotalFlats (err):', error);
            return 0;
        }
    }

    public async getAvailableFlatsCount(forDate: Date, toDate: Date, type: string, isLog?: boolean): Promise<number> {
        try {
            const url = `${this.baseUrl}${this.path}/getAvailableFlatsCount`;
            const response = await axios({
                method: 'get',
                url,
                params: {
                    type,
                    for: forDate,
                    to: toDate
                }
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.getAvailableFlatsCount (err):', error);
            return 0;
        }
    }

    public async reserve(from: Date,
        to: Date,
        desiredChunks: DesiredReservationChunk[],
        reserverID: number,
        channel: string,
        fullName: string,
        phone: number,
        city: string,
        isLog?: boolean): Promise<ReservationEntity> {
        try {
            const url = `${this.baseUrl}${this.path}/reserve`;
            const response = await axios({
                method: 'post',
                url,
                data: {
                    from,
                    to,
                    desiredChunks,
                    reserverID,
                    channel,
                    fullName,
                    city,
                    phone
                }
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.reserve (err):', error);
            throw new Error(error.message);
        }
    }

    public async customerReserve(from: Date, to: Date, desiredChunks: DesiredReservationChunk[], reserverID: number, channel: string, fullName: string, phone: number, city: string, isLog?: boolean) : Promise<CustomerReserveResponse> {
        try {
            const url = `${this.baseUrl}${this.path}/customerReserve`;
            const response = await axios({
                method: 'post',
                url,
                data: {
                    from,
                    to,
                    desiredChunks,
                    reserverID,
                    channel,
                    fullName,
                    city,
                    phone
                }
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.reserve (err):', error);
            throw new Error(error.message);
        }

    }

    public async modify(reservationID: number,
        from: Date,
        to: Date,
        desiredChunks: DesiredReservationChunk[],
        reserverID: number,
        channel: string,
        isLog?: boolean): Promise<ReservationEntity> {
        try {
            const url = `${this.baseUrl}${this.path}/${reservationID}`;
            const response = await axios({
                method: 'put',
                url,
                data: {
                    from,
                    to,
                    desiredChunks,
                    reserverID,
                    channel
                }
            });
            if (isLog) {
                console.log('url:', url);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.modify (err):', error);
            throw new Error(error.message);
        }
    }

    public async getReservedFlatsFor(forDate: Date, type: string, isLog?: boolean): Promise<ReservedFlatEntity[]> {
        try {
            const url = `${this.baseUrl}${this.path}/getReservedFlatsFor`;
            const params = {
                type, for: forDate
            };
            const response = await axios({
                method: 'get',
                url,
                params
            });
            if (isLog) {
                console.log('url:', url);
                console.log('params:', params);
                console.log('date:', response.data);
            }
            return response.data;
        } catch (error) {
            console.log('FlatTypeFetcher.getReservedFlatsFor (err):', error);
            throw new Error(error.message);
        }
    }
}

export const flatTypeFetcher = new FlatTypeFetcher(config.baseURL, config.Network.paths[ServerPaths.flatType]);

export interface CustomerReserveResponse {
  reserverID?: number;
  reservation?: ReservationEntity;
  isOtpSent?: boolean;
  isSuccess: boolean;
  fullName?: string;
  phoneNo?: number;
  city?: string;
  country?: string;
}
