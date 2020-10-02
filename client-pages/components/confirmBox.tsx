import * as React from 'react';
import ModalDialogBox from "./modalDialogBox";
import localizer from "../controller/lib/localization/localizer";
import Button from "./button";
import LabledNumberInput from './labledNumberInput';

export interface ConfirmBoxProps {
    isVisible: boolean;
    userPhoneNo: number;
    onConfirmTapped: (pinCode: number) => void;
    onSkipTapped: () => void;
    onSendAgainTapped: () => void;
}

export interface ConfirmBoxState {
    pinCode: number;
}

class ConfirmBox extends React.Component<ConfirmBoxProps, ConfirmBoxState> {
    constructor(props: ConfirmBoxProps) {
        super(props);
        this.state = {
            pinCode: '' as any
        };
    }

    render() {
        return (
            <ModalDialogBox isVisible={this.props.isVisible}>
                <div className='container'>
                    <div className='title'>
                        {localizer.text('confirmBox.title')}
                    </div>

                    <div className='text'>
                        {localizer.text('confirmBox.text').replace('{0}', this.props.userPhoneNo)}
                    </div>

                    <div className={localizer.cssClass('inputDiv')}>
                        <LabledNumberInput placeHolder={localizer.text('confirmBox.inputPlaceHolder')} label={localizer.text('confirmBox.verify')} value={this.state.pinCode} onValueChanged={this.onPinCodeChanged} />
                    </div>                   

                    <div className='noSMSDiv' onClick={(_e: any) => this.props.onSendAgainTapped()}>
                        {localizer.text('confirmBox.noSms')}
                    </div>

                    <div className='btnDiv'>
                        <Button marginRight={20} id="confirmBtn" width={200} onClick={() => this.props.onConfirmTapped(this.state.pinCode)} enabled={this.state.pinCode > 999} text={localizer.text('confirmBox.btn')} />
                        <Button id="skipBtn" width={150} onClick={() => this.props.onSkipTapped()} enabled={true} text={localizer.text('confirmBox.skip')} />
                    </div>
                </div>
                <style jsx>{`
                .container {
                    padding: 5px 15px;
                }

                .title {
                    color: #000AFF;
                    font-size: 30px;
                }

                .text {
                    color: #080808;
                    padding: 10px 0px;
                }

                .inputDiv {
                }

                .inputDivRtl {
                    direction: rtl;
                }

                .noSMSDiv {
                    padding: 10px 0px;
                    font-weight: bold;
                    color: #000AFF;
                    cursor: pointer;
                }

                .btnDiv {
                    text-align: center;
                    padding: 10px;
                }                
            `}</style>
            </ModalDialogBox>
        );
    }

    onPinCodeChanged = (pinCode: number) => {
        if( pinCode > 9999 ) {
            return;
        }
        this.setState({
            pinCode
        });
    }
}

export default ConfirmBox;
