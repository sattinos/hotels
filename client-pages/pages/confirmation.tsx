import * as React from 'react';
import HeaderImage from "../components/headerImage";
import StagesSection, { Stage } from "../components/stagesSection";
import localizer from "../controller/lib/localization/localizer";
import SearchSummary from "../components/searchSummary";
import SummaryTable from "../components/summaryTable";
import FlexTable from "../components/informationTable/flexTable";
import { FlexRowProps } from "../components/informationTable/flexRow";
import Button from "../components/button";
import { CustomerReserveResponse } from '../controller/network/flatTypeFetcher';
import { paths } from '../components/paths';
import { withRouter } from 'next/router';
import { UserRequest } from '../model/flatType';
import BasePage from '.';
import { ReservationEntity } from '../model/reservationEntity';
import { daysBetweenTwoDates } from '../controller/lib/dateHelper';
import { appController } from '../controller/appController';

export interface ConfirmationPageState {
    isBusy: boolean;
    customerReserveResponse: CustomerReserveResponse | null;
    assistanceNumber: string;
    userRequest: UserRequest | null;
}

class ConfirmationPage extends React.Component<any, ConfirmationPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userRequest: null,
            customerReserveResponse: null,
            isBusy: false,
            assistanceNumber: '92005465432'
        };
    }

    componentDidMount() {
        this.setState({
            isBusy: true
        });
        const { router } = this.props;
        router.prefetch(paths.confirmation);
        const customerReserveResponse = JSON.parse(localStorage.getItem('customerReserveResponse') || '');

        const userRequest = JSON.parse(localStorage.getItem('userPreference') || '');
        userRequest.from = new Date(userRequest.from);
        userRequest.to = new Date(userRequest.to);

        this.setState({
            customerReserveResponse,
            userRequest,
            isBusy: false
        });
        appController.updateView = this.forceUpdate.bind(this);
    }

    render() {
        const userProfile = this.state.userRequest;
        const customerReserveResponse = this.state.customerReserveResponse;
        if ((userProfile === null) || (customerReserveResponse === null)) {
            return <BasePage isBusy={true} />;
        }

        const infoHeadersColor = '#080808';
        const headerStyle = {
            color: infoHeadersColor, fontSize: 22, isBold: false, textAlign: localizer.isRtl ? 'right' : 'left'
        };
        const informationHeaders: FlexRowProps = {
            cells: [
                { text: localizer.text('confirmation.info.name'), ...headerStyle, flex: 1 },
                { text: localizer.text('confirmation.info.phoneNo'), ...headerStyle, flex: 1 },
                { text: localizer.text('confirmation.info.city'), ...headerStyle, flex: 1 }
            ]
        };

        // TODO: discuss hard coding of Country/City info. not found before
        const profileCells: FlexRowProps = {
            cells: [
                { text: customerReserveResponse.fullName || '', color: infoHeadersColor, fontSize: 22, isBold: true, flex: 1, textAlign: localizer.isRtl ? 'right' : 'left' },
                { text: customerReserveResponse.phoneNo as any || '', color: infoHeadersColor, fontSize: 22, isBold: true, flex: 1, textAlign: localizer.isRtl ? 'right' : 'left' },
                { text: customerReserveResponse.city  || '', color: infoHeadersColor, fontSize: 22, isBold: true, flex: 1, textAlign: localizer.isRtl ? 'right' : 'left' }
            ]
        };
        return (
            <BasePage isBusy={this.state.isBusy}>
                <div className='container'>
                    <HeaderImage />
                    <StagesSection stage={Stage.confirmation} />
                    <div className={`noPrint thanksDivFixed ${localizer.cssClass('thanksDiv')}`}>
                        {localizer.text('confirmDiv.thanks')}
                    </div>

                    <div className={`reservationNumberDivFixed ${localizer.cssClass('reservationNumberDiv')}`}>
                        {`${localizer.text('information-page.rn')}`}
                        <span className='reservationNumberDivFixed emphasis'>{(customerReserveResponse.reservation as ReservationEntity).id}</span>
                    </div>

                    <SearchSummary
                        beforeFromText={localizer.text('information-page.bf').replace('{0}', daysBetweenTwoDates(userProfile.from, userProfile.to))}
                        from={userProfile.from}
                        afterFromText={localizer.text('information-page.af')}
                        to={userProfile.to}
                        afterToText={localizer.text('search-page.av3')}
                    />

                    <SummaryTable userRequest={userProfile} />

                    <div className='yourInfoDiv'>
                        <FlexTable noHR rows={[informationHeaders]} />
                        <FlexTable noHR rows={[profileCells]} hrColor={'black'} />
                    </div>

                    <div className={`noPrint helpDivFixed ${localizer.cssClass('helpDiv')}`}>
                        {localizer.text('confirmation.help.title')}
                        <div className='emphasis'>{this.state.assistanceNumber}</div>
                    </div>

                    <div className='noPrint printBtnDiv'>
                        <Button text={localizer.text('confirmation.printBtn')} enabled={true} onClick={() => window.print()} />
                    </div>

                    <style jsx>{`
                .container {
                    position: relative;
                    margin: 0 auto;
                    text-align: center;
                }
                

                .thanksDivFixed {
                    color: #000AFF;
                    padding: 20px;
                    font-weight: bold;
                    font-size: 30px;
                }

                .thanksDiv {
                    text-align: left;
                }

                .thanksDivRtl {
                    text-align: right;
                    direction: rtl;
                }

                .reservationNumberDivFixed {
                    color: black;
                    padding: 20px;
                    font-size: 36px;
                }

                .reservationNumberDiv {
                    text-align: left;
                }

                .reservationNumberDivRtl {
                    text-align: right;
                }

                .emphasis {
                    font-weight: bold;
                }

                .yourInfoDiv {
                }

                .yourInfoDivRtl {
                    direction: rtl;
                }

                .helpDivFixed {
                    padding: 20px;
                    color: #080808;
                    font-size: 36px;
                    display: inline-block;
                    width: 60%;
                    box-sizing: border-box;
                }

                .helpDiv {
                    text-align: left;
                }

                .helpDivRtl {
                    text-align: right;
                    direction: rtl;
                    float: right;
                }

                .printBtnDiv {
                    float: right;
                    display: inline-block;
                    width: 40%;
                    box-sizing: border-box;
                    padding: 20px; 
                }

                @media only screen and (max-width: 1005px) {
                    .container {
                        background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 81%, rgb(226, 226, 226, 0.5) 100%);
                    }

                    .thanksDivFixed {
                        font-size: 6vw;
                    }

                    .reservationNumberDivFixed {
                        font-size: 6vw;
                    }

                    .helpDivFixed {                     
                        font-size: 5vw;
                        display: block;
                        width: 100%;
                    }

                    .printBtnDiv {
                        display: block;
                        width: 100%;
                        box-sizing: border-box;
                    }
                }
            `}
                    </style>
                </div>
            </BasePage>
        );
    }
}

export default withRouter(ConfirmationPage);
