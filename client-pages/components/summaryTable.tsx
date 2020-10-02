import { FlexRowProps } from "./informationTable/flexRow";
import FlexTable from "./informationTable/flexTable";
import OptionsCell from "./optionsCell";
import { UserRequest, ExtendedFlatTypeEntity } from "../model/flatType";
import { generateCountArray } from "../controller/lib/arrayUtils";
import localizer from "../controller/lib/localization/localizer";

export interface SummaryTableProps {
    userRequest: UserRequest;
    onCountChange?: (extendedFlat: ExtendedFlatTypeEntity, count: number) => void;
    flexes?: number[];
}

const SummaryTable: React.SFC<SummaryTableProps> = (props: SummaryTableProps) => {
    const headers: FlexRowProps = {
        cells: [
            { text: localizer.text('summaryTable.flat'), color: '#DAE0EC', fontSize: 22, isBold: false, flex: props.flexes ? props.flexes[0] : 2, textAlign: localizer.isRtl ? 'right' : 'left' },
            { text: localizer.text('summaryTable.perNight'), color: '#DAE0EC', fontSize: 22, isBold: false, flex: props.flexes ? props.flexes[1] : 0.8, textAlign: localizer.isRtl ? 'right' : 'left' },
            { text: localizer.text('summaryTable.quantity'), color: '#DAE0EC', fontSize: 22, isBold: false, flex: props.flexes ? props.flexes[2] : 1, textAlign: localizer.isRtl ? 'right' : 'left' },
            { text: localizer.text('summaryTable.total'), color: '#DAE0EC', fontSize: 22, isBold: false, flex: props.flexes ? props.flexes[3] : 1, textAlign: localizer.isRtl ? 'left' : 'right' }
        ]
    };

    let total = 0;
    const rows: FlexRowProps[] = [];
    for (let index = 0; index < props.userRequest.extendedFlats.length; index++) {
        const extendedFlatEntity = props.userRequest.extendedFlats[index];
        const flatType = extendedFlatEntity.flatTypeEntity;
        const count = extendedFlatEntity.selectedCount;
        if (count === 0) {
            continue;
        }
        const os = generateCountArray(extendedFlatEntity.available, 1);
        const optionIndex = os.indexOf(count);
        total += (flatType.price * count);

        const thirdColumn: any = {
            text: `${count}`,
            color: 'black',
            fontSize: 22,
            isBold: false,
            flex: props.flexes ? props.flexes[2] : 1
        };
        if (props.onCountChange) {
            thirdColumn.render = () => <OptionsCell flex={1} index={optionIndex} options={os} onOptionSelected={(index: number) => props.onCountChange ? props.onCountChange(extendedFlatEntity, os[index]) : ''} />
        }
        rows.push(
            {
                cells: [
                    { text: flatType.name, color: 'black', fontSize: 22, isBold: false, textAlign: localizer.isRtl ? 'right' : 'left', flex: props.flexes ? props.flexes[0] : 2 },
                    { text: `${flatType.price}`, color: 'black', fontSize: 22, isBold: false, textAlign: localizer.isRtl ? 'right' : 'left', flex: props.flexes ? props.flexes[1] : 0.8 },
                    thirdColumn,
                    { text: `${count * flatType.price} SAR`, color: 'black', fontSize: 22, isBold: false, textAlign: localizer.isRtl ? 'left' : 'right', flex: props.flexes ? props.flexes[3] : 1 }
                ]
            }
        );
    }
    const vat = total * .05;
    const finalTotal = vat + total;

    const sumRows: FlexRowProps[] = [
        {
            cells: [
                { text: localizer.text('summaryTable.subTotal'), color: '#DAE0EC', fontSize: 15, isBold: false, textAlign: localizer.isRtl ? 'right' : 'left', flex: 1 },
                { text: `${total} SAR`, color: '#DAE0EC', fontSize: 15, isBold: false, textAlign: localizer.isRtl ? 'left' : 'right', flex: 1 }
            ]
        },
        {
            cells: [
                { text: localizer.text('summaryTable.vat'), color: '#DAE0EC', fontSize: 15, isBold: false, flex: 1, textAlign: localizer.isRtl ? 'right' : 'left' },
                { text: `${vat} SAR`, color: '#DAE0EC', fontSize: 15, isBold: false, textAlign: localizer.isRtl ? 'left' : 'right', flex: 1 }
            ]
        }
    ];

    const finalRows: FlexRowProps[] = [
        {
            cells: [
                { text: localizer.text('summaryTable.total'), color: 'black', fontSize: 22, isBold: true, flex: 1, textAlign: localizer.isRtl ? 'right' : 'left' },
                { text: `${finalTotal} SAR`, color: 'black', fontSize: 22, isBold: true, textAlign: localizer.isRtl ? 'left' : 'right', flex: 1 }
            ]
        }
    ];
    return (
        <div className={localizer.cssClass('mainDiv')}>
            <FlexTable headers={headers} rows={rows} />
            <div className={localizer.cssClass('totalDiv')} >
                <FlexTable rows={sumRows} />
                <FlexTable rows={finalRows} hrColor={'black'} />
            </div>
            <style jsx>{`
                .mainDivRtl {
                    direction: rtl;
                }

                .totalDiv {
                    margin-left: 60%;
                }

                .totalDivRtl {
                    margin-right: 60%;
                }
            `}</style>
        </div>
    );
}

export default SummaryTable;
