import Circle from "./circle";
import localizer from "../controller/lib/localization/localizer";

export enum Stage {
    search,
    rooms,
    information,
    confirmation
}

export interface StagesSectionProps {
    s?: string;
    stage: Stage;
}

const StagesSection: React.SFC<StagesSectionProps> = (props: StagesSectionProps) => {
    return (
        <div className={`noPrint stagesDivFixed ${localizer.cssClass('stagesDiv')}`}>
            <Circle isFilled={props.stage === Stage.search} radius={38} text={'1'} thickness={2} title={localizer.text('stages-search')} connectRight={!localizer.isRtl} connectLeft={localizer.isRtl} />
            <Circle isFilled={props.stage === Stage.rooms} radius={38} text={'2'} thickness={2} title={localizer.text('stages-rooms')} connectRight={true} connectLeft={true} />
            <Circle isFilled={props.stage === Stage.information} radius={38} text={'3'} thickness={2} title={localizer.text('stages-information')} connectRight={true} connectLeft={true} />
            <Circle isFilled={props.stage === Stage.confirmation} radius={38} text={'4'} thickness={2} title={localizer.text('stages-confirmation')} connectRight={localizer.isRtl} connectLeft={!localizer.isRtl} />
            <style jsx>{`
                .stagesDivFixed {
                    box-sizing: border-box;
                    padding: 5px 0px;
                }

                .stagesDiv {
                }

                .stagesDivRtl {
                    direction: rtl;
                }
            `}</style>
        </div>
    );
}

export default StagesSection;
