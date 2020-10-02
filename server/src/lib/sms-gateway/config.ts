class MobilyWsConfig {
    baseUrl: string;
    checkBalance: string;
    sendStatus: string;
    sendSmsPath: string;

    username: string;
    password: string;
    api_key: string;
}

const mobilyWSConfig = new MobilyWsConfig();

mobilyWSConfig.baseUrl = 'https://www.alfa-cell.com/api';

mobilyWSConfig.checkBalance = '/balance.php';
mobilyWSConfig.sendStatus = '/sendStatus.php';
mobilyWSConfig.sendSmsPath = '/msgSend.php';

mobilyWSConfig.username = 'username_here';
mobilyWSConfig.password = 'password_here';
mobilyWSConfig.api_key = 'apikey_here';

export default mobilyWSConfig;

try {
    // tslint:disable-next-line:no-var-requires
    require('./config.prod');
} catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
}