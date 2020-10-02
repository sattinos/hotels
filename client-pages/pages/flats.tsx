import * as React from 'react';
import StagesSection, { Stage } from '../components/stagesSection';
import localizer from '../controller/lib/localization/localizer';
import ResultBox from '../components/resultBoxElements';
import SearchSummary from '../components/searchSummary';
import HeaderImage from '../components/headerImage';
import BasePage from '.';
import { UserRequest, ExtendedFlatTypeEntity } from '../model/flatType';
import { withRouter } from 'next/router';
import ConfirmDiv from '../components/confirmDiv';
import { paths } from '../components/paths';
import { appController } from '../controller/appController';

export interface FlatsPageState {
  isBusy: boolean;
  userPreference: UserRequest | null;
}

class FlatsPage extends React.Component<any, FlatsPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isBusy: false,
      userPreference: null
    };
  }

  componentDidMount() {
    const { router } = this.props;
    router.prefetch(paths.flats);
    const userPreference = JSON.parse(localStorage.getItem('userPreference') || '');
    userPreference.from = new Date(userPreference.from);
    userPreference.to = new Date(userPreference.to);
    this.setState({
      userPreference,
      isBusy: false
    });
    appController.updateView = this.forceUpdate.bind(this);
  }

  render() {
    const userPreference = this.state.userPreference;
    if (userPreference === null) {
      return <BasePage isBusy={true} />;
    }

    const resultBoxes: JSX.Element[] = [];
    for (let index = 0; index < userPreference.extendedFlats.length; index++) {
      resultBoxes.push(
        <ResultBox
          key={`resultBox${index}`}
          extendedFlat={userPreference.extendedFlats[index]}
          activeColor='#000AFF'
          nonActiveColor='#DAE0EC'
          onBookRequested={() => this.onBookRequested(userPreference.extendedFlats[index])}
          onCountChanged={(count: number) => this.onCountChange(userPreference.extendedFlats[index], count) }
        />
      );
    }
    return (
      <BasePage isBusy={this.state.isBusy}>
        <div className='container'>
          <HeaderImage />
          <StagesSection stage={Stage.rooms} />
          <SearchSummary
            beforeFromText={localizer.text('search-page.av1')}
            from={userPreference.from}
            afterFromText={localizer.text('search-page.av2')}
            to={userPreference.to}
            afterToText={localizer.text('search-page.av3')}
            onChangeClicked={this.onChangeClicked}
          />
          <div className={`selectTextFixed ${localizer.cssClass('selectText')}`}>{localizer.text('search-page.select')}</div>
          {resultBoxes}
          <ConfirmDiv userRequest={userPreference} onNextClicked={this.onNextClicked} />
          <style jsx>{`
              .container {
                position: relative;
                margin: 0 auto;
                text-align: center;
              }

              .titleDiv {
                position: absolute;
                top: 40px;
                left: 80px;
                font-size: 70px;
                font-weight: bold;
              }

              .selectTextFixed {
                padding: 5px 20px;
                font-size: 25px;
                color: #000AFF;
                font-weight: bolder;
              }

              .selectText {
                text-align: left;
              }

              .selectTextRtl {
                text-align: right;
              }

              @media only screen and (min-width: 600px) {
                .summaryText {
                    font-size: 20px;
                }
              }
          `}
          </style>
        </div>
      </BasePage>
    )
  }

  onChangeClicked = () => {
    const { router } = this.props;
    router.push(paths.search);
  }

  onBookRequested = (extendedFlat: ExtendedFlatTypeEntity) => {
    extendedFlat.selectedCount = 1;
    const userPreference = this.state.userPreference;
    this.setState({
      userPreference
    });
    localStorage.setItem('userPreference', JSON.stringify(userPreference));
  }

  onCountChange = (extendedFlat: ExtendedFlatTypeEntity, count: number) => {
    extendedFlat.selectedCount = count;
    const userPreference = this.state.userPreference;
    this.setState({
      userPreference
    });
    localStorage.setItem('userPreference', JSON.stringify(userPreference));
  }

  onNextClicked = () => {
    const { router } = this.props;
    router.push(paths.information)
  }
}
export default withRouter(FlatsPage);
