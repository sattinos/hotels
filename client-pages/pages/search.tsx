import * as React from 'react';
import SearchBox from '../components/searchBox';
import BasePage from './';
import { flatTypeFetcher } from '../controller/network/flatTypeFetcher';
import { ExtendedFlatTypeEntity, UserRequest } from '../model/flatType';
import { ReservationEntity, getDefaultReservation } from '../model/reservationEntity';
import { withRouter } from 'next/router';
import { paths } from '../components/paths';
import LanguageDropMenu from '../components/languageDropMenu';
import { appController } from '../controller/appController';
import localizer from '../controller/lib/localization/localizer';

export interface SearchPageState {
  reservation: ReservationEntity
  isBusy: boolean;
}

class SearchPage extends React.Component<any, SearchPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isBusy: false,
      reservation: getDefaultReservation()
    };
  }

  componentDidMount() {
    const { router } = this.props;
    router.prefetch('/flats');
    appController.updateView = this.forceUpdate.bind(this);
  }

  render() {
    return (
      <BasePage isBusy={this.state.isBusy} >
        <div className='container'>
          <div className={`languageDivFixed ${localizer.cssClass('languageDiv')}`}>
            <LanguageDropMenu />
          </div>
          <div className={`titleDivFixed ${localizer.cssClass('titleDiv')}`}>{localizer.text('search.title')}</div>
          <div className={`joinDivFixed ${localizer.cssClass('joinDiv')}`}>{localizer.text('search.join')}</div>
          <div className={`joinDivFixed2 ${localizer.cssClass('joinDiv2')}`}>{localizer.text('search.join2')}</div>
          <img className='img' src='/static/mainPage.jpeg' alt='vendor image' />
          <SearchBox from={this.state.reservation.from} to={this.state.reservation.to} onFromChosen={this.onFromChosen} onToChosen={this.onToChosen} onSearchTapped={this.onSearchTapped} />
          <style jsx>{`
              .container {
                position: relative;
              }

              .languageDivFixed {
                position: absolute;
                top: 10px;
              }

              .languageDiv {
                right: 10px;
              }

              .languageDivRtl {
                left: 10px;
              }

              .img {
                max-width: 100%;
                height: auto;
              }

              .titleDivFixed {
                  position: absolute;
                  top: 40px;
                  font-size: 50px;
                  font-weight: bold;
              }

              .titleDiv {
                  left: 55px;
              }

              .titleDivRtl {
                  right: 55px;
              }

              .joinDivFixed {
                color: white;
                position: absolute;
                top: 100px;
                font-size: 60px;
                font-weight: bold;
              }

              .joinDiv {
                left: 150px;
              }

              .joinDivRtl {
                right: 150px;
              }

              .joinDivFixed2 {
                color: white;
                position: absolute;
                top: 170px;
                font-size: 60px;
                font-weight: bold;
              }

              .joinDiv2 {
                left: 150px;
                top: 170px;
              }

              .joinDiv2Rtl {
                right: 150px;
                white-space: nowrap;
              }

              @media only screen and (max-width: 650px) {
                .titleDivFixed {
                  font-size: 8vw;
                  top: 6vw;
                }

                .joinDivFixed {
                  font-size: 9vw;
                  top: 16vw;
                }

                .joinDivFixed2 {                      
                  font-size: 8vw;
                  top: 30vw;
                }
              }
          `}</style>
        </div>
      </BasePage>
    );
  }

  onFromChosen = (from: Date) => {
    const reservation = this.state.reservation;
    reservation.from = from;
    this.setState({
      reservation
    });
  }

  onToChosen = (to: Date) => {
    const reservation = this.state.reservation;
    reservation.to = to;
    this.setState({
      reservation
    });
  }

  onSearchTapped = async () => {
    const { router } = this.props;

    this.setState({
      isBusy: true
    });
    const result: ExtendedFlatTypeEntity[] = [];
    const flatTypes = await flatTypeFetcher.getTypes(true);
    for (let flatTypeIndex = 0; flatTypeIndex < flatTypes.length; flatTypeIndex++) {
      const flatType = flatTypes[flatTypeIndex];
      const flatTypeEntity = await flatTypeFetcher.getFlatType(flatType);
      const available = await flatTypeFetcher.getAvailableFlatsCount(this.state.reservation.from, this.state.reservation.to, flatType);
      if (available > 0) {
        result.push({
          flatTypeEntity,
          available,
          selectedCount: 0
        });
      }
    }
    const userPreference: UserRequest = {
      extendedFlats: result,
      from: this.state.reservation.from,
      to: this.state.reservation.to
    }
    localStorage.setItem('userPreference', JSON.stringify(userPreference));
    this.setState({
      isBusy: false
    });
    router.push(paths.flats);
  }
}

export default withRouter(SearchPage);
