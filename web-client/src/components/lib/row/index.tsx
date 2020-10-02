import * as React from 'react';
import './style.less';

export interface RowProps {
    name: string;
    isRtl?: boolean;
    className?: string;
    leftClassName?: string;
    rightClassName?: string;
}

class Row extends React.Component<RowProps, {}> {
    constructor(props: RowProps) {
        super(props);
    }

    public render() {
        if (this.props.isRtl) {
            return this.renderRtl();
        }

        let leftClassName = 'c40 center floatLeft rowLabel';
        if (this.props.leftClassName) {
            leftClassName += ` ${this.props.leftClassName}`;
        }
        let rightClassName = 'c60 center floatRight';
        if (this.props.rightClassName) {
            rightClassName += ` ${this.props.rightClassName}`;
        }
        return (
            <div className={this.props.className || 'fullRow'}>
                <div className={leftClassName}>
                    {this.props.name}
                </div>
                <div className={rightClassName}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private renderRtl() {
        let leftClassName = 'c60 center floatLeft';
        if (this.props.leftClassName) {
            leftClassName += ` ${this.props.leftClassName}`;
        }
        let rightClassName = 'c40 center floatRight rowLabel';
        if (this.props.rightClassName) {
            rightClassName += ` ${this.props.rightClassName}`;
        }
        return (
            <div className={this.props.className || 'fullRow'}>
                <div className={leftClassName}>
                    {this.props.children}
                </div>

                <div className={rightClassName}>
                    {this.props.name}
                </div>
            </div>
        );
    }
}

export default Row;
