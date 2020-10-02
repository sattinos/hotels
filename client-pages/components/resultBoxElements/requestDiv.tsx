import { ExtendedFlatTypeEntity } from "../../model/flatType";
import ReserveBtn from "./reserveBtn";
import ChooseCountBtn from "./chooseCountBtn";

export interface RequestDivProps {
    extendedFlat: ExtendedFlatTypeEntity;
    onBookRequested: () => void;
    onCountChanged: (count: number) => void;
}

const RequestDiv: React.SFC<RequestDivProps> = (props: RequestDivProps) => {
    let contents = null;
    if (!props.extendedFlat.selectedCount || (props.extendedFlat.selectedCount === 0)) {
        contents = <ReserveBtn extendedFlat={props.extendedFlat} onBookRequested={props.onBookRequested} />;
    } else {
        contents = <ChooseCountBtn extendedFlat={props.extendedFlat} onCountChanged={props.onCountChanged}  />;
    }
    return (
        <div>
            {contents}
            <style jsx>{`
            `}
            </style>
        </div>
    );
}

export default RequestDiv;
