export interface LabelInputProps {
    label: string;
    value: string;
    onValueChanged: (value: string) => void;
    isRtl?: boolean;
    placeHolder?: string;
}

const LabelInput: React.SFC<LabelInputProps> = (props: LabelInputProps) => {
    return (
        <div className='containerDiv'>
            <div className='labelDiv'>{props.label}</div>
            <div className='inputDiv'>
                <input placeholder={props.placeHolder || ''} className='input' value={props.value} onChange={ (e: any) => props.onValueChanged(e.target.value) }/>
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

                .input {
                    border-style: solid;
                    border-color: #DAE0EC;
                    font-size: 16px;
                    width: 100%;
                    height: 100%;
                    padding: 10px;
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

export default LabelInput;