export default class MsisdnHelper {
    public static transformToFullNumber(msisdn: string) {
        MsisdnHelper._ksaPhoneNumberPattern.lastIndex = 0;
        const matches = MsisdnHelper._ksaPhoneNumberPattern.exec(msisdn);
        if (matches && matches.length === 8) {
            const transformed = `9665${matches[7]}`;
            return transformed;
        }
        return '';
    }

    public static validateMsisdn(msisdn: string) {
        MsisdnHelper._ksaPhoneNumberPattern.lastIndex = 0;
        return MsisdnHelper._ksaPhoneNumberPattern.test(msisdn);
    }

    private static readonly _ksaPhoneNumberPattern = /^((\+\+966)?|(00966)?|(966)?|(0)?)(5)(\d{8})$/g;
}
