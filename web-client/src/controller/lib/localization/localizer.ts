const localization = require('../../../assets/localization/localization.json');

class Localizer {
    public readonly languageKeys = ['en', 'ar'];

    private _languageKey: string = 'en';

    public set currentLanguage(language: string) {
        this._languageKey = language;
    }

    public get currentLanguage() {
        return this._languageKey;
    }

    public get currentLanguageIndex() {
        return this.languageKeys.indexOf(this._languageKey);
    }

    public text(key: string) {
        try {
            if (localization[key]) {
                return localization[key][this._languageKey];
            }
            // console.log(`failed to find localization text for key: ${key}`);
            return key;
        } catch (err) {
            console.log('localization text(err): ', err);
            return key;
        }
    }
    public isRtl() {
        return this._languageKey === 'ar';
    }
}
const localizer = new Localizer();
export default localizer;
