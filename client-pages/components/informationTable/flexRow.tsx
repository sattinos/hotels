import Cell, { CellProps } from "./cell";

export interface FlexRowProps {
    cells: CellProps[];
}

const FlexRow: React.SFC<FlexRowProps> = (props: FlexRowProps) => {
    const renderedHeaders: JSX.Element[] = [];
    for (let index = 0; index < props.cells.length; index++) {
        const element =
            <Cell
                key={index}
                {...props.cells[index]}
                rowCellsCount={props.cells.length}
             />;
        renderedHeaders.push(element);
    }

    return (
        <div className='flexRow'>
            {renderedHeaders}
            <style jsx>{`
                .flexRow {
                    display: flex;
                    margin: 4px 0px;
                    align-items: center;
                }            
            `}</style>
        </div>
    );
}

export default FlexRow;
