import * as React from 'react';
import './style.less';

export interface IconProps {
    className?: string;
    src: any;
    enabled: boolean;
    onClick?: () => void;
}

export class Icon extends React.Component<IconProps, {}> {
    constructor(props: IconProps) {
        super(props);
    }

    public render() {
        let cssClass = (this.props.enabled || (this.props.enabled === undefined)) ? 'iconEnabled' : 'iconDisabled';
        if (this.props.className && this.props.className.length > 0) {
            cssClass += ` ${this.props.className}`;
        }
        return (
            <img src={this.props.src} className={cssClass} onClick={this.onClick} />
        );
    }

    private onClick = (_e: any) => {
        if (this.props.enabled && this.props.onClick) {
            this.props.onClick();
        }
    }
}
