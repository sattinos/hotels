import * as React from 'react';
import { withRouter } from 'next/router';
import HeaderImage from "../components/headerImage";
import StagesSection, { Stage } from "../components/stagesSection";
import SearchSummary from "../components/searchSummary";
import localizer from "../controller/lib/localization/localizer";
import LabelInput from "../components/labelInput";
import SummaryTable from "../components/summaryTable";
import { UserRequest, ExtendedFlatTypeEntity } from "../model/flatType";
import { paths } from '../components/paths';
import BasePage from '.';
import { daysBetweenTwoDates } from '../controller/lib/dateHelper';
import Button from '../components/button';
import LabledNumberInput from '../components/labledNumberInput';
import MsisdnHelper from '../controller/lib/msisdnHelper';
import ConfirmBox from '../components/confirmBox';
import { DesiredReservationChunk } from '../model/reservationEntity';
import { flatTypeFetcher, CustomerReserveResponse } from '../controller/network/flatTypeFetcher';
import accountsFetcher from '../controller/network/accountsFetcher';
import { appController } from '../controller/appController';

export interface InformationPageState {
    isBusy: boolean;
    userRequest: UserRequest | null;
    fullName: string;
    phone: number;
    city: string;
    country: string;
    nextEnabled: boolean;
    isVerifyPhone: boolean;
    showModalMessage: string;
}

class InformationPage extends React.Component<any, InformationPageState> {
    private customerReserveResponse: CustomerReserveResponse = { isSuccess: false };
    constructor(props: any) {
        super(props);
        this.state = {
            isBusy: false,
            userRequest: null,
            fullName: '',
            phone: '' as any,
            city: '',
            country: '',
            nextEnabled: false,
            isVerifyPhone: false,
            showModalMessage: ''
        };
    }

    componentDidMount() {
        const { router } = this.props;
        router.prefetch(paths.information);
        const userPreference = JSON.parse(localStorage.getItem('userPreference') || '');      
        userPreference.from = new Date(userPreference.from);
        userPreference.to = new Date(userPreference.to);
        this.setState({
            userRequest: userPreference,
            isBusy: false
        });
        appController.updateView = this.forceUpdate.bind(this);
    }

    render() {
        const userPreference = this.state.userRequest;
        if (userPreference === null) {
            return <BasePage isBusy={true} />;
        }

        return (
            <BasePage isBusy={this.state.isBusy} message={this.state.showModalMessage} onOkClicked={this.onOkClicked}>
                <div className='container'>
                    <HeaderImage />
                    <StagesSection stage={Stage.information} />
                    <SearchSummary
                        beforeFromText={localizer.text('information-page.bf').replace('{0}', daysBetweenTwoDates(userPreference.from, userPreference.to))}
                        from={userPreference.from}
                        to={userPreference.to}
                        afterFromText={localizer.text('information-page.af')}
                        afterToText={localizer.text('search-page.av3')}
                        onChangeClicked={this.onChangeClicked}
                    />

                    <SummaryTable userRequest={userPreference} onCountChange={this.onCountChange} />

                    <div className={`informationFormFixed ${localizer.cssClass('informationForm')}`}>
                        <div className='formTitle'>{localizer.text('informationForm.title')}</div>
                        <div className='inputs'>
                            <LabelInput placeHolder={localizer.text('informationForm.namePlaceholder')} label={localizer.text('informationForm.name')} value={this.state.fullName} onValueChanged={this.onNameChange} />
                            <LabledNumberInput placeHolder={localizer.text('informationForm.mobilePlaceHolder')} label={localizer.text('informationForm.mobile')} value={this.state.phone} onValueChanged={this.onMobilePhoneChange} />
                            <LabelInput placeHolder={localizer.text('informationForm.cityPlaceHolder')} label={localizer.text('informationForm.city')} value={this.state.city} onValueChanged={this.onCityChange} />
                        </div>
                    </div>

                    <div className='footer'>
                        <Button enabled={this.state.nextEnabled} text={localizer.text('confirmDiv.nextText')} onClick={this.onNextClicked} />
                        <div className='moreFlatsDiv' onClick={this.onAddMoreFlatsClicked} >{localizer.text('confirmDiv.moreFlats')}</div>
                    </div>

                    <ConfirmBox isVisible={this.state.isVerifyPhone} userPhoneNo={this.state.phone} onConfirmTapped={this.onConfirmTapped} onSendAgainTapped={this.onSendAgainTapped} onSkipTapped={this.onSkipClicked} />

                    <style jsx>{`
                        .container {
                            position: relative;
                            margin: 0 auto;
                            text-align: center;
                            background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 81%, rgb(226, 226, 226) 100%);
                        }

                        .informationFormFixed {                            
                            padding: 20px;
                        }

                        .informationForm {                            
                            text-align: left;
                        }

                        .informationFormRtl {
                            text-align: right;
                            direction: rtl;
                        }

                        .formTitle {
                            font-size: 4vw;
                        }

                        .inputs {
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                        }

                        .footer {
                            background-color: white;
                            padding: 20px;
                            display: flex;
                            flex-direction: row-reverse;
                        }
                        
                        .moreFlatsDiv {
                            font-size: 22px;
                            color: #000AFF;
                            font-weight: bold;
                            box-sizing: border-box;
                            padding: 14px 40px;
                            cursor: pointer;
                        }
                        
                        .nextDiv {
                            color: #FFFFFF;
                            font-size: 26px;
                            background-color: #000AFF;
                            font-weight: bold;
                            box-sizing: border-box;
                            width: 280px;
                            padding: 10px;
                        }
                        
                        @media only screen and (min-width: 750px) {
                            .formTitle {
                                font-size: 30px;
                            }
                        }

                        @media only screen and (max-width: 870px) {
                            .moreFlatsDiv {
                                width: 40%;
                                font-size: 3vw;
                                padding: 10px;
                            }

                            .nextDiv {
                                width: 30%;
                                font-size: 3vw;
                            }
                        }
                    `}</style>
                </div>
            </BasePage>
        );
    }

    onChangeClicked = () => {
        const { router } = this.props;
        router.push(paths.search);
    }

    onCountChange = (extendedFlat: ExtendedFlatTypeEntity, count: number) => {
        extendedFlat.selectedCount = count;
        const userPreference = this.state.userRequest;
        this.setState({
            userRequest: userPreference
        });
        localStorage.setItem('userPreference', JSON.stringify(userPreference));
    }

    onNextClicked = async () => {
        const userRequest = this.state.userRequest;
        if (userRequest === null) {
            return;
        }
        let isBusy = true;
        this.setState({
            isBusy
        });
        const desiredChunks = this.grabDesiredChunks(userRequest);
        this.customerReserveResponse = await flatTypeFetcher.customerReserve(userRequest.from, userRequest.to, desiredChunks, -1, 'internet', this.state.fullName, this.state.phone, this.state.city);
        isBusy = false;
        if (this.customerReserveResponse.isSuccess) {
            this.setState({
                isBusy,
                isVerifyPhone: true
            });
        } else {
            this.setState({
                isBusy: false,
                showModalMessage: localizer.text('common.fail-tryagain')
            });
        }
    }

    grabDesiredChunks = (userRequest: UserRequest) => {
        const desiredChunks: DesiredReservationChunk[] = [];
        for (let index = 0; index < userRequest.extendedFlats.length; index++) {
            desiredChunks.push({
                countToReserve: userRequest.extendedFlats[index].selectedCount,
                flatType: userRequest.extendedFlats[index].flatTypeEntity.type
            });
        }
        return desiredChunks;
    }

    onAddMoreFlatsClicked = () => {
        const { router } = this.props;
        router.push(paths.flats);
    }

    onNameChange = (name: string) => {
        this.setState({
            fullName: name
        }, () => this.validate());
    }

    onMobilePhoneChange = (phoneNo: number) => {
        this.setState({
            phone: phoneNo
        }, () => this.validate());
    }

    onCityChange = (city: string) => {
        this.setState({
            city
        }, () => this.validate());
    }

    validate = () => {
        let nextEnabled = this.state.fullName.length > 0 && this.state.city.length > 0;
        const isPhoneValid = MsisdnHelper.validateMsisdn(this.state.phone.toString());
        nextEnabled = nextEnabled && isPhoneValid;

        this.setState({
            nextEnabled
        });
    }

    onConfirmTapped = async (otp: number) => {
        this.setState({
            isBusy: true
        });
        const result = await accountsFetcher.verify(this.state.phone as any, otp);
        this.setState({
            isBusy: false
        });
        if (result && result.isSuccess) {
            this.moveToNextPage();
        } else {
            this.setState({
                showModalMessage: localizer.text('common.fail-tryagain')
            });
        }
    }

    onSendAgainTapped = () => {
        // 
    }

    onOkClicked = () => {
        this.setState({
            showModalMessage: ''
        });
    }

    onSkipClicked = () => {
        this.moveToNextPage();
    }

    moveToNextPage = () => {
        const userPreference = this.state.userRequest;
        if (userPreference) {
            this.customerReserveResponse.city = this.state.city;
            this.customerReserveResponse.country = this.state.country;
            this.customerReserveResponse.fullName = this.state.fullName;
            this.customerReserveResponse.phoneNo = this.state.phone;
            localStorage.setItem('userPreference', JSON.stringify(userPreference));
            localStorage.setItem('customerReserveResponse', JSON.stringify(this.customerReserveResponse));
            const { router } = this.props;
            router.push(paths.confirmation);
        }
    }
}

export default withRouter(InformationPage);
