import * as React from 'react';
import LoadingIndicator from './loadingIndicator';
import { Switch, Route } from 'react-router';

import localizer from '../controller/lib/localization/localizer';
import { DialogBox } from './dialogBox';
import { appRoutes, RouteConfig, loginRoutes } from '../routes';

import './signPage/style.less';
import { shared } from './shared';
import { Callback } from '../model/types';
import { storage } from './storage';
import SideMenu from './sideMenu';
import { ToolDataMenuItem } from '../model/sideMenu';
import accountsFetcher from '../controller/network/accountsFetcher';
import { paths } from '../paths';
import './style.less';
import AppHeader from './appHeader';
import AppFooter from './appFooter';
import config, { RunMode } from '../config';

export interface MainProps {
    s?: string;
}

export interface MainState {
    isBusy: boolean;
    isAlertVisible: boolean;
    alertTxt: string;
    onOkTapped: Callback;
    onCancelTapped?: Callback;
}

class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            isBusy: false,
            isAlertVisible: false,
            alertTxt: '',
            onOkTapped: this.hideAlert
        };
    }

    componentDidMount = async () => {
        console.log('set shared stuff...:');
        console.log(shared);
        shared.busyFunction = this.setBusy;
        shared.alertFunction = this.alert;
        shared.hideAlert = this.hideAlert;
        shared.update = this.forceUpdate.bind(this);

        let needRender = false;
        if (!storage.userProfile && localStorage.userProfile) {
            storage.userProfile = JSON.parse(localStorage.userProfile);
            needRender = true;
            console.log('main componentDidMount userProfile:', storage.userProfile);
        }
        if (!storage.clickedItem && localStorage.clickedItem) {
            storage.clickedItem = JSON.parse(localStorage.clickedItem);
            shared.isMenuOpen = true;
            console.log('onSideMenuClick');
            console.log('storage userProfile:', storage.userProfile);
            return await this.onSideMenuClick(storage.clickedItem as any);
        }
        if (needRender) {
            console.log('main componentDidMount need render');
            this.forceUpdate();
        }
    }

    render() {
        return (
            <React.Suspense fallback={<LoadingIndicator visible={true} />}>
                {this.renderRoutes(loginRoutes)}
                {this.renderApp()}
                <LoadingIndicator visible={this.state.isBusy} />
                <DialogBox
                    text={this.state.alertTxt}
                    isVisible={this.state.isAlertVisible}
                    okText={localizer.text('common.ok')}
                    cancelText={this.state.onCancelTapped ? localizer.text('common.cancel') : undefined}
                    onCancelTapped={this.state.onCancelTapped}
                    okDisabled={false}
                    onOkTapped={this.state.onOkTapped}
                />
            </React.Suspense>
        );
    }


    public renderRoutes = (routes: RouteConfig[], renderNoMatch: boolean = false) => {
        const components = [];
        for (let index = 0; index < routes.length; index++) {
            const route = routes[index];
            components.push(
                <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
            );
        }
        if (renderNoMatch) {
            components.push(
                <Route key={`${routes[0].path}_1`} component={() =>
                    <div>
                        <h3 className='paddedBox'>
                            Todo: <span className='paddedBox'>
                                add a new page for this route: <code>{location.pathname}</code>                                
                            </span>
                            
                        </h3>
                    </div>}
                />
            );
        }
        return (
            <Switch>
                {components}
            </Switch>
        );
    }

    public setBusy = (isBusy: boolean) => {
        this.setState({
            isBusy
        });
    }

    public alert = (alertTxt: string, onOkTapped?: () => void, onCancelTapped?: () => void) => {
        const state: any = {
            isAlertVisible: true,
            alertTxt
        };
        if (onOkTapped) {
            state.onOkTapped = () => {
                onOkTapped();
                this.hideAlert();
            };
        } else {
            state.onOkTapped = this.hideAlert;
        }

        if (onCancelTapped) {
            state.onCancelTapped = () => {
                onCancelTapped();
                this.hideAlert();
            };
        } else {
            state.onCancelTapped = undefined;
        }
        this.setState(state);
    }

    public hideAlert = () => {
        this.setState({
            isAlertVisible: false,
            alertTxt: ''
        });
    }

    private renderHeader = () => {
        const toolUser = storage.userProfile;
        if (!toolUser) {
            return null;
        }
        return (
            <Route render={(props: any) =>
                <AppHeader
                    avatarIcon={toolUser.filename}
                    onProfileClicked={() => this.onProfileClicked(props.history)} />
            }
            />
        );
    }

    private renderApp() {
        const toolUser = storage.userProfile;
        if (!toolUser) {
            console.log('no tool user');
            return null;
        }
        const className = shared.isMenuOpen ? 'formSlideOpen' : 'formSlideClose';
        return (
            <div id='app'>
                {this.renderHeader()}
                <div id='appBody'>
                    {this.renderSideMenu()}
                    <div id='mainContents' className={`${className}`}>
                        {this.renderRoutes(appRoutes, true)}
                    </div>
                </div>
                <AppFooter />
            </div>
        );
    }

    private renderSideMenu = () => {
        const userProfile = storage.userProfile;
        if (!userProfile) {
            return null;
        }
        return (
            <Route render={(props: any) =>
                <SideMenu
                    width={220}
                    menus={userProfile.menus}
                    slideTimeSeconds={0.25}
                    onClick={this.onSideMenuClick}
                    onLogoutClicked={() => this.onLogoutClicked(props.history)} />
            }
            />
        );
    }

    private onSideMenuClick = async (item: ToolDataMenuItem) => {
        shared.busyFunction(true);
        storage.clickedItem = item;
        localStorage.clickedItem = JSON.stringify(item);
        shared.busyFunction(false);
    }

    private onLogoutClicked = async (history: any) => {
        shared.busyFunction(true);
        try {
            localStorage.clear();
            storage.userProfile = undefined;
            if (config.RunMode !== RunMode.ParcelServer) {
                await accountsFetcher.logout();
            }
            shared.busyFunction(false);
            history.push(paths.signIn);
        } catch (err) {
            console.log('onLogoutClicked(err):', err);
            shared.busyFunction(false);
        }
    }

    private onProfileClicked = async (history: any) => {
        try {
            history.push(paths.profile);
        } catch (err) {
            console.log('onProfileClicked(err):', err);
        }
    }
}

export default Main;