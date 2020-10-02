import * as React from 'react';
import OptionsInput from './optionsInput';
import localizer from '../controller/lib/localization/localizer';
import { appController } from '../controller/appController';

class LanguageDropMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='noPrint'>
                <OptionsInput index={localizer.currentLanguageIndex}
                              OnOptionSelected={this.onOptionChoosen}
                              options={localizer.languageKeys} />
            </div>
        );
    }

    public onOptionChoosen = (index: number) => {
        localizer.currentLanguageIndex = index;
        appController.updateView();
    }
}

export default LanguageDropMenu;