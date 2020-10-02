import * as React from 'react';
import './style.less';

export interface RoundBtnProps {
    id?: string;
    text: string;
    disabled: boolean;
    onClick?: () => void;
}

export class RoundBtn extends React.Component<RoundBtnProps, {}> {
    constructor(props: RoundBtnProps) {
        super(props);
    }

    public render() {
        if (this.props.id) {
            return (
                <button
                    className='roundedBtn'
                    id={this.props.id}
                    disabled={this.props.disabled}
                    onClick={() => {
                        if (this.props.onClick) {
                            this.props.onClick();
                        }
                    }}>
                    {this.props.text}
                </button>
            );
        }
        return (
            <button
                className='roundedBtn'
                disabled={this.props.disabled}
                onClick={() => {
                    if (this.props.onClick) {
                        this.props.onClick();
                    }
                }}>
                {this.props.text}
            </button>
        );
    }
}
