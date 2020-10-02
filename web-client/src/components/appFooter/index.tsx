import * as React from 'react';
import './style.less';
import { storage } from '../storage';
import { shared } from '../shared';
import localizer from '../../controller/lib/localization/localizer';

export interface AppFooterProps {
    s?: string;

}

export interface AppFooterState {
    s?: string;
}

class AppFooter extends React.Component<AppFooterProps, AppFooterState> {
    constructor(props: AppFooterProps) {
        super(props);
    }

    render() {
        const toolUser = storage.userProfile;
        if (!toolUser) {
            return null;
        }
        return (
            <div id={`appFooter${shared.isMenuOpen ? '' : 'SlideClose'}`}>{localizer.text('common.copyRights')}</div>
        );
    }
}

export default AppFooter;
