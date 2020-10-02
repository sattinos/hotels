import { lazy } from 'react';
import { paths } from './paths';

export interface RouteConfig {
    component: React.ComponentType<any>;
    path: string;
    exact?: boolean;
    routes?: RouteConfig[];
}

export const loginRoutes: RouteConfig[] = [
    {
        path: paths.signIn, exact: true, component: lazy(() => import(
            /* webpackChunkName: "sign" */
            /* webpackMode: "lazy" */
            './components/signPage'))
    },
    {
        path: paths.signUp, exact: true, component: lazy(() => import(
            /* webpackChunkName: "register" */
            /* webpackMode: "lazy" */
            './components/registerPage'))
    },
    {
        path: paths.reset, exact: true, component: lazy(() => import(
            /* webpackChunkName: "reset" */
            /* webpackMode: "lazy" */
            './components/resetPassword'))
    }
];

export const appRoutes: RouteConfig[] = [    
    {
        path: paths.welcome, exact: true, component: lazy(() => import(
            /* webpackChunkName: "welcome" */
            /* webpackMode: "lazy" */
            './components/welcomePage'))
    }
    ,{
        path: paths.profile, exact: false, component:  lazy(() => import(
            /* webpackChunkName: "profile" */
            /* webpackMode: "lazy" */
            './components/profilePage'))
    },
    {
        path: paths.vaBed, exact: false, component: lazy(() => import(
            /* webpackChunkName: "va-bed" */
            /* webpackMode: "lazy" */
            './components/bedCrud/viewAll'))
    },
    {
        path: paths.crBed, exact: false, component: lazy(() => import(
            /* webpackChunkName: "cr-bed" */
            /* webpackMode: "lazy" */
            './components/bedCrud/create'))
    },
    {
        path: paths.upBed, exact: false, component: lazy(() => import(
            /* webpackChunkName: "up-bed" */
            /* webpackMode: "lazy" */
            './components/bedCrud/update'))
    },
    {
        path: paths.vaRoom, exact: false, component: lazy(() => import(
            /* webpackChunkName: "va-room" */
            /* webpackMode: "lazy" */
            './components/roomCrud/viewAll'))
    },
    {
        path: paths.crRoom, exact: false, component: lazy(() => import(
            /* webpackChunkName: "cr-room" */
            /* webpackMode: "lazy" */
            './components/roomCrud/create'))
    },
    {
        path: paths.upRoom, exact: false, component: lazy(() => import(
            /* webpackChunkName: "up-room" */
            /* webpackMode: "lazy" */
            './components/roomCrud/update'))
    },

    {
        path: paths.vaFlatType, exact: false, component: lazy(() => import(
            /* webpackChunkName: "va-flatType" */
            /* webpackMode: "lazy" */
            './components/flatTypeCrud/viewAll'))
    },
    {
        path: paths.crFlatType, exact: false, component: lazy(() => import(
            /* webpackChunkName: "cr-flatType" */
            /* webpackMode: "lazy" */
            './components/flatTypeCrud/create'))
    },
    {
        path: paths.upFlatType, exact: false, component: lazy(() => import(
            /* webpackChunkName: "up-flatType" */
            /* webpackMode: "lazy" */
            './components/flatTypeCrud/update'))
    },
    {
        path: paths.vaReservation, exact: false, component: lazy(() => import(
            /* webpackChunkName: "va-reservation" */
            /* webpackMode: "lazy" */
            './components/reservationCrud/viewAll'))
    },
    {
        path: paths.crReservation, exact: false, component: lazy(() => import(
            /* webpackChunkName: "cr-reservation" */
            /* webpackMode: "lazy" */
            './components/reservationCrud/create'))
    },
    {
        path: paths.upReservation, exact: false, component: lazy(() => import(
            /* webpackChunkName: "cr-reservation" */
            /* webpackMode: "lazy" */
            './components/reservationCrud/update'))
    }
];
