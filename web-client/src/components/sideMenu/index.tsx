import * as React from 'react';
import './style.less';
import { ToolDataMenuItem } from '../../model/sideMenu';
import Menu from './menu';
import { shared } from '../shared';

export interface SideMenuProps {
    width: number;
    menus: ToolDataMenuItem[];
    slideTimeSeconds: number;
    onClick: (data: ToolDataMenuItem) => void;
    onLogoutClicked: (history: any) => void;
}

const texts = {
    logout: 'logout'
};

export default class SideMenu extends React.Component<SideMenuProps, {}> {
    private sideBarStyle: any;

    constructor(props: SideMenuProps) {
        super(props);
        this.sideBarStyle = {
            width: `${this.props.width}px`,
        };
    }

    public componentDidMount() {
        shared.toggleMenu = this.toggle;
    }

    public render = () => {
        const menuItems = this.props.menus.map((menu: ToolDataMenuItem) =>
            <Menu key={`mainMenu_${menu.id}`} data={menu} onClick={(data: ToolDataMenuItem) => this.props.onClick(data)} />
        );
        return (
            <>
                <div id='sideMenu' style={this.sideBarStyle}>
                    <div id='sideMenuScrollable'>
                        {menuItems}
                    </div>
                    <div id='sideMenuFooter'>
                        {shared.isMenuOpen ?
                            <div id='logoutDiv' onClick={this.props.onLogoutClicked}>{texts.logout}</div>
                            : null}
                    </div>
                </div>

            </>
        );
    }

    public toggle = () => {
        if (shared.isMenuOpen) {
            this.onCloseTaped();
        } else {
            this.onNavBtnTaped();
        }
    }

    private onCloseTaped = () => {
        this.sideBarStyle = {
            width: '0px',
        };
        shared.isMenuOpen = false;
        shared.update();
    }

    private onNavBtnTaped = () => {
        shared.isMenuOpen = true;
        shared.update();
        this.sideBarStyle = {
            width: `${this.props.width}px`,
        };
    }
}
