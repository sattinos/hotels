import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface RoundLinkProps {
    id?: string;
    text: string;
    icon?: any;
    iconID?: string;
    to: string;
    disabled: boolean;
    onClick?: () => void;
}

class RoundLink extends React.Component<RoundLinkProps, {}> {
    constructor(props: RoundLinkProps) {
        super(props);
    }

    public render() {
        let className = 'roundedLink';
        if (this.props.disabled) {
            className += 'Disabled';
            return (
                <span className={className} id={this.props.id}>
                    {this.props.text}
                </span>
            );
        }
        return (
            <NavLink
                className={className}
                id={this.props.id}
                onClick={() => {
                    if (this.props.onClick) {
                        this.props.onClick();
                    }
                }}
                to={`${this.props.to}`}
            >
                {this.props.text}
                {this.renderIcon()}
            </NavLink>
        );
    }

    private renderIcon() {
        if (!this.props.icon) {
            return null;
        }
        return (
            <img id={this.props.iconID} src={this.props.icon} />
        );
    }
}

export default RoundLink;