import { ToolDataMenuItem } from '../model/sideMenu';
import { UserProfile } from '../model/userProfile';

class Storage {
    public userProfile: UserProfile | undefined = undefined;
    public clickedItem: ToolDataMenuItem | undefined = undefined;
}

export const storage = new Storage();
