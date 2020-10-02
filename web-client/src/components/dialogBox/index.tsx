import * as React from 'react';
import './style.less';
import ModalBG from '../modalBG';
import { RoundBtn } from '../lib/roundButton';

export interface DialogBoxProps {
    text: string;
    okText: string;
    cancelText?: string;
    okDisabled: boolean;
    isVisible: boolean;
    onOkTapped: () => void;
    onCancelTapped?: () => void;
}

export class DialogBox extends React.Component<DialogBoxProps, any> {
    public render() {
        let cancelBtn = null;
        if (this.props.cancelText) {
            cancelBtn = (
                <RoundBtn
                    id='cancelBtn'
                    disabled={false}
                    text={this.props.cancelText}
                    onClick={() => this.onCancelTapped()}
                />
            );
        }

        return (
            <ModalBG isVisible={this.props.isVisible} >
                <div id='boxContainer'>
                    <div className='box'>
                        <div className='boxText'>{this.props.text}</div>
                        {cancelBtn}
                        <RoundBtn
                            id='okBtn'
                            disabled={this.props.okDisabled}
                            text={this.props.okText}
                            onClick={() => this.props.onOkTapped()}
                        />
                    </div>
                </div>
            </ModalBG>
        );
    }

    private onCancelTapped = () => {
        if (this.props.onCancelTapped) {
            this.props.onCancelTapped();
        }
    }
}
