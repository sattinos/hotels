import { Callback } from '../model/types';

export const shared = {
    busyFunction: (_isBusy: boolean) => {
        //
    },
    alertFunction: (_text: string, _onOkTapped?: Callback, _onCancellTapped?: Callback) => {
        //
    },
    hideAlert: () => {
        //
    },
    // This function will be set from main page to re-render the whole page
    // Then it can be blindly called from children
    update: () => {
        //
    },

    toggleMenu: () => {
        //
    },

    entityID: -1,

    entityName: '',

    isMenuOpen: true
};
