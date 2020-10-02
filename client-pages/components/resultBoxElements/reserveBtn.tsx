import { ExtendedFlatTypeEntity } from "../../model/flatType";
import localizer from "../../controller/lib/localization/localizer";

export interface ReserveBtnProps {
    extendedFlat: ExtendedFlatTypeEntity;
    onBookRequested: () => void;
}

const ReserveBtn: React.SFC<ReserveBtnProps> = (props: ReserveBtnProps) => {
    return (
        <div className={`btnDivFixed ${localizer.cssClass('btnDiv')}`}>
            <button className='btn' onClick={props.onBookRequested}>
                <span className={`btnTextFixed ${localizer.cssClass('btnText')}`}>
                    {localizer.text('resultBox.btn')}
                </span>
                <img className='btnIcon' src={'/static/img/add.svg'} />
            </button>

            <style jsx>{`
                 .btnDivFixed {
                     height: 42px;
                     box-sizing: border-box;
                     display: flex;
                     flex-direction: row-reverse;
                 }                

                .btn {
                    background-color: #000AFF;
                    color: white;
                    padding: 4px 10px;
                    font-size: 20px;
                    box-sizing: border-box;
                }

                .btnTextFixed {
                    font-weight: normal;
                    text-align: left;
                }

                .btnText {
                    padding-right: 40px;                    
                }

                .btnTextRtl {
                    padding-left: 40px;                    
                }

                .btnIcon {
                    width: 12px;
                    height: 12px;
                    box-sizing: border-box;
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

export default ReserveBtn;
