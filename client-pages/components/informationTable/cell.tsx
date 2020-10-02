import { ReactElement } from "react";

export interface CellProps {
    text: string;
    color?: string;
    fontSize: number;
    isBold: boolean;
    paddingLeft?: number;
    paddingRight?: number;
    render?: () => ReactElement | null;
    textAlign?: string;
    rowCellsCount?: number;
    flex: number;
}

const Cell: React.SFC<CellProps> = (props: CellProps) => {
    if (props.render) {
        return props.render();
    }

    return (
        <div className={'cell'}>
            {props.text}
            <style jsx>{`
                .cell {
                    color:${props.color || 'black'};
                    font-size: 2.4vw;
                    font-weight: ${props.isBold ? 'bold' : 'normal'};
                    padding-left: ${props.paddingLeft || 0}px;
                    padding-right: ${props.paddingRight || 0}px;
                    flex: ${props.flex};
                    display: inline-block;
                    text-align: ${props.textAlign || 'left'};
                }
                
                @media only screen and (min-width: 750px) {
                 .cell {
                    font-size: 18px;
                 }
                }
            `}</style>
        </div>
    );
}

export default Cell;