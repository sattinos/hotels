export default class RegexHelper {
    public static IsUserName(nickname: string) {
        RegexHelper.latinUserNamePattern.lastIndex = 0;
        return RegexHelper.latinUserNamePattern.test(nickname);
    }
    private static latinUserNamePattern = /^([a-z]|[A-Z])(\w*)$/;
}