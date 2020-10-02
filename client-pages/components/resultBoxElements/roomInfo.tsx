import { RoomEntity } from "../../model/roomEntity";
import localizer from "../../controller/lib/localization/localizer";

export interface RoomInfoProps {
    rooms: RoomEntity[];
}

const RoomInfo: React.SFC<RoomInfoProps> = (props: RoomInfoProps) => {
    const rooms = props.rooms;
    if (!rooms || rooms.length === 0) {
        return null;
    }
    let text = '';
    if (rooms.length === 1) {
        text = `${rooms[0].name}`;
    } else {
        text = `${rooms.length}x ${rooms[0].name}`;
    }
    return (
        <div className={localizer.cssClass('room')}>
            {text}
            <style jsx>{`                
                 .room {
                     flex: 1;
                 }

                 .roomRtl {
                     flex: 1;
                     text-align: right;
                 }
            `}</style>
        </div>
    );
}

export default RoomInfo;
