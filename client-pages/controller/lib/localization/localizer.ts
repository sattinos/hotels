const localization = require('../../../static/localization/localization.json');

class Localizer {
    public readonly languageKeys = ['English', 'Arabic', /* New Language */];

    private _languageKey: string = 'English';

    public set currentLanguage(language: string) {
        this._languageKey = language;
    }

    public get currentLanguage() {
        return this._languageKey;
    }

    public get currentLanguageIndex() {
        return this.languageKeys.indexOf(this._languageKey);
    }

    public set currentLanguageIndex(index: number) {
        this.currentLanguage = this.languageKeys[index];
    }

    public text(key: string, forceLanguageKey?: string) {
        try {
            if (localization[key]) {
                return localization[key][forceLanguageKey || this._languageKey];
            }
            return key;
        } catch (err) {
            console.log('localization text(err): ', err);
            return key;
        }
    }

    public cssClass(inputClass: string) {
        if (this.isRtl) {
            return `${inputClass}Rtl`;
        }
        return inputClass;
    }

    public get rtlString() {
        return this.isRtl ? 'Rtl' : '';
    }

    public get isRtl() {
        return this._languageKey === 'Arabic';
    }
}
const localizer = new Localizer();
export default localizer;
