import { ToolDataMenuItem } from './sideMenu';

export class UserProfile {
    id: number = 0;
    fullName: string = '';
    userName: string = '';
    password: string = '';
    filename: any;
    phone: string = '';
    isVerified: boolean = false;
    token: string = '';
    menus: ToolDataMenuItem[] = [];
}
