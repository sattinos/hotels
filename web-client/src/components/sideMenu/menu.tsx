import * as React from 'react';
import { ToolDataMenuItem } from '../../model/sideMenu';
import { Link } from 'react-router-dom';
import { storage } from '../storage';

export interface MenuProps {
    data: ToolDataMenuItem;
    onClick: (data: ToolDataMenuItem) => void;
}

interface MenuState {
    isCollapsed: boolean;
    style: any;
}

const menuItemHeight = 36;

class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            isCollapsed: false,
            style: {}
        };
    }

    /*
    public componentDidMount() {
        if (this.subItemsDivElement) {
            console.log('clientHeight', this.subItemsDivElement.clientHeight);
            const maxHeight = this.subItemsDivElement.clientHeight;
            this.setState({
                style: {
                    maxHeight
                }
            });
        } else {
            console.log('no subItems');
        }
    }
    */
   public componentDidMount() {
       console.log('componentDidMount');
       
        if (this.props.data.subMenus) {
            const maxHeight = this.props.data.subMenus.length * menuItemHeight;
            this.setState({
                style: {
                    maxHeight
                }
            });
        }
    }

    public render() {
        const clickedItem = storage.clickedItem;
        const subMenus = this.props.data.subMenus;
        if (subMenus) {
            const menuItems = subMenus.map((itemConfig: ToolDataMenuItem) =>
                <Link to={itemConfig.to as any} key={`menu_${itemConfig.name}`} onClick={() => this.props.onClick(itemConfig)}>
                    <div className={itemConfig.className + ((clickedItem && (itemConfig.id === clickedItem.id)) ? ' active' : '')}>
                        {itemConfig.name}
                    </div>
                </Link>
            );

            const style = this.state.isCollapsed ? {} : this.state.style;

            const childrenClass = this.state.isCollapsed ? 'collapsable collapsed' : 'collapsable block';
            return (
                <div>
                    <div className={this.props.data.className} onClick={this.onMenuClicked}>
                        {this.props.data.name}
                    </div>
                    <div className={childrenClass} style={style}>
                        {menuItems}
                    </div>
                </div>
            );
        }
    }

    private onMenuClicked = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }
}

export default Menu;
