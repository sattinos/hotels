import FlexRow, { FlexRowProps } from "./flexRow";

export interface FlexTableProps {
    headers?: FlexRowProps;
    rows: FlexRowProps[];
    hrColor?: string;
    noHR?: boolean;
}

const FlexTable: React.SFC<FlexTableProps> = (props: FlexTableProps) => {
    const renderedRows = [];
    for (let index = 0; index < props.rows.length; index++) {
        const row = props.rows[index];
        renderedRows.push(
            <FlexRow key={index} cells={row.cells} />
        );
    }
    const headerElement = props.headers ? <FlexRow cells={props.headers.cells} /> : null;
    return (
        <div className='container'>
            {headerElement}
            {props.noHR ? null : <hr className='hr' />}            
            {renderedRows}
            <style jsx>{`
                .container {
                    padding: 5px 20px;
                }
                .hr {
                    border-color: ${props.hrColor || '#DFE4EE'} ;
                }
            `}</style>
        </div>
    );
}

export default FlexTable;
/*
    .cell {
        color: #211A1A;
        font-size: 22px;
        font-weight: bold;
    }
*/
