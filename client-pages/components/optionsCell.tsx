import OptionsInput from "./optionsInput";
import { toStringArray } from "../controller/lib/arrayUtils";

export interface OptionsCellProps {
    options: number[];
    onOptionSelected: (index: number) => void;
    index: number;
    flex: number;
}

const OptionsCell: React.SFC<OptionsCellProps> = (props: OptionsCellProps) => {
    const os: string[] = toStringArray(props.options);
    return (
        <div className='optionsCell'>
            <div className='optionsContainer'>
                <div className='optionsItem'>
                    <OptionsInput options={os} index={props.index} OnOptionSelected={props.onOptionSelected} />
                </div>
            </div>
            <style jsx>{`
                .optionsCell {
                    flex: ${props.flex};
                    box-sizing: border-box;
                }

                .optionsContainer {
                    box-sizing: border-box;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }

                .optionsItem {
                    width: 60px;
                }               

            `}</style>
        </div>
    );
}

export default OptionsCell;