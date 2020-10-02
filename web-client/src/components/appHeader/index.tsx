import * as React from 'react';
import './style.less';
import { shared } from '../shared';
import config from '../../config';

export interface AppHeaderProps {
    avatarIcon: any;
    onProfileClicked: () => void;
}

export interface AppHeaderState {
    s?: string;
}

class AppHeader extends React.Component<AppHeaderProps, AppHeaderState> {
    constructor(props: AppHeaderProps) {
        super(props);
    }

    render() {
        return (
            <div id='appHeader'>
                <div id='logoDiv'></div>
                <div id='slideMenuKey' onClick={() => shared.toggleMenu() }>&#9776;</div>
                <div id='profileDiv' onClick={() => this.props.onProfileClicked()}>
                    <img id='avatar' src={`${config.baseURL}/${this.props.avatarIcon}` } />
                </div>
            </div>
        );
    }
}

export default AppHeader;