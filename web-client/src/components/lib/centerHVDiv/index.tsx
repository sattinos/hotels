import * as React from 'react';
import './style.less';

export class CenterHVDiv extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='centerHVParent' >
                <div className='centerHV'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
