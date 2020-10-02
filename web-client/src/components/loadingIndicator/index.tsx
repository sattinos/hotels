import * as React from 'react';
import './style.less';

export interface LoadingIndicatorProps {
    visible: boolean;
}

export default class LoadingIndicator extends React.Component<LoadingIndicatorProps, any> {
    public constructor(props: LoadingIndicatorProps) {
        super(props);
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <div className='LoaderBG'>
                <div className='LoaderContainer'>
                    <div className='Loader' />
                </div>
            </div>
        );
    }
}
