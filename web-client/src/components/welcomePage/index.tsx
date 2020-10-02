import * as React from 'react';
import './style.less';
import localizer from '../../controller/lib/localization/localizer';

export default () => {
    console.log('welcome js page render...');
    return (
        <div id={'welcomeDiv'} className='center'>
            {localizer.text('welcome.title')}
        </div>
    );
};
