export type Callback = () => void;
export type BusyFunc = (isBusy: boolean) => void;
export type AlertFunc = (alertTxt: string, onOkTapped?: Callback) => void;