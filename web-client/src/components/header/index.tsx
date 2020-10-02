import * as React from 'react';
import './style.less';

export interface HeaderProps {
    text: string;
}

export class Header extends React.Component<HeaderProps, any> {
    constructor(props: HeaderProps) {
        super(props);
    }

    public render() {
        return (
            <div className='textAlignLeft' id='headerDiv'>
                <div id='headerTxt'>{this.props.text}</div>
            </div>
        );
    }
}
