import * as React from 'react';
import DateBox from './dateBox';
import localizer from '../controller/lib/localization/localizer';

export interface SearchBoxProps {
    from: Date;
    to: Date;
    onFromChosen: (v: Date) => void;
    onToChosen: (v: Date) => void;        
    onSearchTapped: () => void;
}

const searchBoxAr = 0.578;
const searchBoxHeight = 300;
const searchDivBorderRadius = 0;

const SearchBox: React.SFC<SearchBoxProps> = (props: SearchBoxProps) => {
    return (
        <div className={`searchBoxFixed ${localizer.cssClass('searchBox')}`}>
            <div id='searchBoxTitle'>{localizer.text('seatchBox.title')}</div>
            <DateBox title={localizer.text('searchBox.checkIn')} onDateChosen={props.onFromChosen} value={props.from} />

            <span className='hSpacer'></span>
            <DateBox title={localizer.text('searchBox.checkOut')} onDateChosen={props.onToChosen} value={props.to} />

            <div className='searchDiv' onClick={props.onSearchTapped}>
                <button className='btn'>
                    <img className='btnIcon' src={'/static/img/search.svg'} />
                    <span className='btnText'>
                        {localizer.text('searchPage.btn')}
                    </span>
                </button>
            </div>

            <style jsx>{`
                .searchBoxFixed {
                    position: absolute;
                    bottom: -100px;
                    background-color: white;
                    height: ${searchBoxHeight}px;
                    width: ${searchBoxHeight / searchBoxAr}px;
                    display: inline-block;
                    box-sizing: border-box;
                    padding: 40px 30px;
                    font-size: 36px;
                    font-weight: bold;
                    -webkit-box-shadow: 1px 10px 100px 0px rgba(0,0,0,0.64);
                    -moz-box-shadow: 1px 10px 100px 0px rgba(0,0,0,0.64);
                    box-shadow: 1px 10px 100px 0px rgba(0,0,0,0.64);
                    border-radius: ${searchDivBorderRadius}px;
                }

                .searchBox {
                    right: 100px;
                }

                .searchBoxRtl {
                    left: 100px;
                    direction: rtl;
                }

                .hSpacer {
                    width: 60px;
                    height: 4px;
                    display: inline-box;
                }

                .searchDiv {
                    padding-top: 30px;
                    display: flex;
                    flex-direction: row-reverse;
                }

                .btn {
                    background-color: #000AFF;
                    color: white;
                    padding: 10px 20px;
                    font-size: 32px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    border-style: none;
                }

                .btnIcon {
                    display: inline-box;
                    width: 36px;
                    height: 36px;
                    box-sizing: border-box;
                    margin: 0px 2px;
                }

                .btnText {
                    margin: 0px 2px;
                }

                @media only screen and (max-width: 900px) {
                    .searchBoxFixed {
                        position: static;
                        display: block;
                        width: 100%;
                        -webkit-box-shadow: none;
                        -moz-box-shadow: none;
                        box-shadow: none;
                        height: auto;
                        padding: 20px 0px;
                        padding-right: 10px;
                        font-size: 26px;
                        background-color: #f5f5f5;
                    }

                    #searchBoxTitle {
                        padding: 10px 10px;
                    }  

                    .searchDiv {
                        justify-content: center;
                    }

                    .hSpacer {
                        display: block;
                        height: 26px;
                    }
                }
            }
        `}</style>
        </div>
    )
}
export default SearchBox;
