import * as React from 'react';
import './style.less';

interface ModalBGProps {
    isVisible: boolean;
    onClick?: () => void;
}

export default class ModalBG extends React.Component<ModalBGProps, any> {
    public render() {
        if (!this.props.isVisible) {
            return null;
        }

        return (
            <div className='modalBG' onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}