import * as React from 'react';
import './style.less';

export interface ProgressBarProps {
    value: number;
}

export interface ProgressBarState {
    style: any;
}

export default class ProgressBar extends React.Component<ProgressBarProps, any> {
    public constructor(props: ProgressBarProps) {
        super(props);
        const style = this.getInlineStyle();
        this.state = {
            style
        };
    }

    public componentWillReceiveProps() {
        const style = this.getInlineStyle();
        this.setState({
            style
        });
    }

    public render() {
        if (this.props.value < 0) {
            return null;
        }
        return (
            <div className='progressBg'>
                <div className='barBg'>
                    <div className='bar' style={this.state.style}>
                    </div>
                    <div className='progressText center'>
                        {`${Math.round(this.props.value * 100)}%`}
                    </div>
                </div>
            </div>
        );
    }

    private getInlineStyle() {
        return {
            width: `${Math.round(this.props.value * 100)}%`
        };
    }
}
