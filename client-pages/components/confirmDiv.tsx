import { UserRequest } from "../model/flatType";
import localizer from "../controller/lib/localization/localizer";
import { daysBetweenTwoDates } from "../controller/lib/dateHelper";
import Button from "./button";

export interface ConfirmDivProps {
    userRequest: UserRequest;
    onNextClicked: () => void;
}

const ConfirmDiv: React.SFC<ConfirmDivProps> = (props: ConfirmDivProps) => {
    let total = 0;
    for (let index = 0; index < props.userRequest.extendedFlats.length; index++) {
        total += props.userRequest.extendedFlats[index].selectedCount * props.userRequest.extendedFlats[index].flatTypeEntity.price;
    }
    return ( 
        <div className='container'>
            <div className='leftDiv'>
                {`${localizer.text('confirmDiv.summaryText').replace('{0}', daysBetweenTwoDates(props.userRequest.from, props.userRequest.to ))}`}
                <span className='priceDiv'>
                    {`${total} ${localizer.text('currency.ksa')}`}
                </span>
            </div>           
            <div className='rightDiv'>
                <Button text={localizer.text('confirmDiv.nextText')} onClick={props.onNextClicked} width={200} enabled={total > 0} />
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: row;
                    background-color: #FFFFFF;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                }

                .leftDiv {
                    color: #080808;                                        
                    font-size: 22px;
                }

                .rightDiv {
                }

                .priceDiv {
                    font-weight: bold;
                    font-size: 49px;
                    color: #080808;
                    padding: 0px 10px;
                }

                @media only screen and (max-width: 700px) {
                    .leftDiv {
                        font-size: 2.2vw;
                    }

                    .priceDiv {
                        font-size: 4vw;
                    }
                }
            `}</style>
        </div>
    );
}

export default ConfirmDiv;
