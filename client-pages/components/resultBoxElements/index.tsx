import { ExtendedFlatTypeEntity } from "../../model/flatType";
import localizer from "../../controller/lib/localization/localizer";
import RequestDiv from "./requestDiv";
import ResultImages from "./resultImages";
import RoomInfo from "./roomInfo";

export interface ResultBoxProps {
    extendedFlat: ExtendedFlatTypeEntity;
    activeColor: string;
    nonActiveColor: string;
    onBookRequested: () => void;
    onCountChanged: (count: number) => void;
}

const ResultBox: React.SFC<ResultBoxProps> = (props: ResultBoxProps) => {
    return (
        <div className={`searchResultFixed ${localizer.cssClass('searchResult')}`}>
            <div className='searchResultCarousel'>
                <ResultImages extendedFlat={props.extendedFlat} activeColor={props.activeColor} nonActiveColor={props.nonActiveColor} />
            </div>
            <div className='textBox'>
                <div className='textInfoDiv'>
                    <div className='textInfoDiv1'>
                        <div className='nameAreaDiv'>
                            <div className='flatNameDiv'>{props.extendedFlat.flatTypeEntity.name}</div>
                            <div className='flatAreaDiv'>{props.extendedFlat.flatTypeEntity.area}m</div>
                        </div>
                        <div className={`${localizer.cssClass('flatDescDiv')}`}>
                            {props.extendedFlat.flatTypeEntity.description}
                        </div>
                    </div>
                    <div className={`textInfoDiv2Fixed ${localizer.cssClass('textInfoDiv2')}`}>
                        <div className='priceDiv'>{`${props.extendedFlat.flatTypeEntity.price} ${localizer.text('currency.ksa')}`}</div>
                        <div className='perNightDiv'>{localizer.text('resultBox.perNight')}</div>
                    </div>
                </div>
                <hr />
                <div className='roomsDiv'>
                    <div className='includedRoomsRow'>
                        <RoomInfo rooms={props.extendedFlat.flatTypeEntity.bedRooms} />
                        <RoomInfo rooms={props.extendedFlat.flatTypeEntity.livingRooms} />
                    </div>
                    <div className='includedRoomsRow'>
                        <RoomInfo rooms={props.extendedFlat.flatTypeEntity.bathRooms} />
                        <RoomInfo rooms={props.extendedFlat.flatTypeEntity.kitchens} />
                    </div>
                </div>
                <RequestDiv extendedFlat={props.extendedFlat} onBookRequested={props.onBookRequested} onCountChanged={props.onCountChanged} />
            </div>
            <style jsx>{`
                .searchResultFixed {
                    display: flex;
                    height: 250px;
                    background-color: #FFFFFF;
                    margin: 30px 20px;
                    -webkit-box-shadow: 5px 11px 93px -8px rgba(0,0,0,0.32);
                    -moz-box-shadow: 5px 11px 93px -8px rgba(0,0,0,0.32);
                    box-shadow: 5px 11px 93px -8px rgba(0,0,0,0.32);
                }

                .searchResult {
                }

                .searchResultRtl {
                    direction: rtl;
                }

                .searchResultCarousel {
                    height: 100%;
                    width: 330px;
                }

                hr {
                    width: 100%;
                }

                .textBox {
                    flex-grow: 1;
                    padding: 10px 30px;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                }

                .dotsClass {
                    background-color: green;
                }

                 .textInfoDiv {
                     flex: 1.2;
                     display: flex;
                 }

                 .textInfoDiv1 {
                     flex: 4;
                 }

                 .nameAreaDiv {
                     display: flex;
                 }

                 .flatNameDiv  {
                    font-size: 26px;
                    font-weight: bold;
                    color: #080808;
                 }

                 .flatAreaDiv {
                     padding: 8px 30px;
                     color: #B3B3B3;
                 }

                 .flatDescDiv {
                     color: #B3B3B3;
                 }

                 .flatDescDivRtl {
                     color: #B3B3B3;
                     text-align: right;

                 }

                 .textInfoDiv2Fixed {
                     flex: 1;
                 }

                 .textInfoDiv2 {
                     text-align: right;
                 }

                 .textInfoDiv2Rtl {
                     text-align: left;
                 }

                 .priceDiv {
                     color: #099032;
                     font-size: 18px;
                 }

                 .perNightDiv {
                     color: #B3B3B3;
                     font-size: 16px;
                 }

                 .roomsDiv {
                     flex: 2;
                 }

                 .includedRoomsRow {
                     display: flex;
                     font-size: 14px;
                     color: #080808;
                 }
                @media only screen and (max-width: 900px) {
                    .searchResultFixed {
                        flex-direction: column;
                        height: auto;
                    }

                    .searchResultCarousel {
                        display: block;
                        width: auto;
                        flex-basis: 230px;
                    }

                    .textBox {
                        padding: 20px 10px;
                    }

                    .textInfoDiv2 {
                        flex: 1.5;
                    }
                }              
            `}
            </style>
        </div>
    );
}

export default ResultBox;
