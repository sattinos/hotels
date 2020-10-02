import { ExtendedFlatTypeEntity } from "../../model/flatType";
import OptionsInput from "../optionsInput";
import { toStringArray, generateCountArray } from "../../controller/lib/arrayUtils";
import localizer from "../../controller/lib/localization/localizer";

export interface ChooseCountBtnProps {
    extendedFlat: ExtendedFlatTypeEntity;
    onCountChanged: (count: number) => void;
}

const ChooseCountBtn: React.SFC<ChooseCountBtnProps> = (props: ChooseCountBtnProps) => {
    const os: string[] = toStringArray(generateCountArray(props.extendedFlat.available));   
    return (
        <div className='btnDiv'>
            <div className='btnSelected'>
                <span className='btnTextSelected'>
                    {localizer.text('chooseCountBtn.selectedText')}
                </span>
                <span className='btnIconSelectedSpan'>
                    <img className='btnIconSelected' src={'/static/img/tick.svg'} />
                </span>
            </div>
            <div className={`flatDivFixed ${localizer.cssClass('flatDiv')}`}>
               <OptionsInput options={os} index={props.extendedFlat.selectedCount} OnOptionSelected={props.onCountChanged} />
            </div>
            <div className='hotelIconDiv'>
                <img className='hotelIcon' src={'/static/img/hotel.svg'} />
            </div>

            <style jsx>{`
                .btnDiv {
                     height: 42px;
                     box-sizing: border-box;
                     display: flex;
                     flex-direction: row-reverse;
                 }

                .btnSelected {
                    font-size: 18px;
                    box-sizing: border-box;
                    padding: 4px 10px;
                    background-color: #099032;
                    color: #FFFFFF;
                    display: flex;
                    flex-direction: row;         
                    justify-content: space-between;
                    align-items: center;
                    width: 160px;
                }

                .btnText {
                    font-weight: normal;
                    padding-right: 40px;
                    text-align: left;
                }

                .btnIcon {
                    display: inline-box;
                    width: 12px;
                    height: 12px;
                    box-sizing: border-box;
                }
                                
                .btnIconSelectedSpan {
                    margin: 8px 0px 0px 0px;
                }

                .btnIconSelected {
                    box-sizing: border-box;
                    width: 20px;
                    height: auto;
                }


                .hotelIconDiv {
                    border-style: solid;
                    border-color: #DAE0EC;
                    border-width: 2px;
                    padding: 6px;
                }

                .hotelIcon {
                    width: 25px;
                    height: 25px;
                }

                .flatDivFixed {
                    border-style: solid;
                    border-color: #DAE0EC;
                    border-width: 2px;
                    padding-right: 4px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    padding-left: 5px;
                    display: flex;
                    color: black;
                }

                .flatDiv {
                    border-left-style: none;       
                    margin-right: 5px;             
                }

                .flatDivRtl {
                    border-right-style: none;
                    margin-left: 5px;             
                }

                .flatCountItem {
                    
                }

                .flatArrowItem {
                    padding-left: 4px;
                }

                .arrowIcon {
                    width: 12px;
                }

                @media only screen and (max-width: 900px) {
                    .btnDiv {
                        height: 62px;
                        padding-top: 20px;
                        justify-content: center;
                    }                    
                }
            `}
            </style>
        </div>
    );
}

export default ChooseCountBtn;
