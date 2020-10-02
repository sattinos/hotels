import DigitsInput from "./digitsInput";

export interface LabelInputProps {
    label: string;
    value: number;
    onValueChanged: (value: number) => void;
    isRtl?: boolean;
    placeHolder?: string;
}

const LabledNumberInput: React.SFC<LabelInputProps> = (props: LabelInputProps) => {
    return (
        <div className='containerDiv'>
            <div className='labelDiv'>{props.label}</div>
            <div className='inputDiv'>
                <DigitsInput placeHolder={props.placeHolder || ''} value={props.value} onChange={ (e: number) => props.onValueChanged(e) }/>
            </div>
            <style jsx>{`
                .containerDiv {
                    width: 380px;
                    margin: 10px;
                }

                .labelDiv {                    
                    color: #080808;
                }

                .inputDiv {
                    padding: 0px;        
                }

                @media only screen and (max-width: 870px) {
                 .containerDiv {
                    width: 100%;
                    margin: 10px 0px;
                }
            `}
            </style>
        </div>
    );
}

export default LabledNumberInput;
/*

                .input {
                    border-style: solid;
                    border-color: #DAE0EC;
                    font-size: 24px;
                    width: 100%;
                    height: 100%;
                }

*/
