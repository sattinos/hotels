import { UserResultCode } from './controller/network/accountsFetcher';
import localizer from './controller/lib/localization/localizer';

export const userProfileMessages: any = {};
userProfileMessages[UserResultCode.phoneUsed] = localizer.text('register.phoneUsed');
userProfileMessages[UserResultCode.userNameUsed] = localizer.text('register.userNameFound');
userProfileMessages[UserResultCode.success] = localizer.text('register.verify-success');
userProfileMessages[UserResultCode.unknown] = localizer.text('common.unknown-error');
