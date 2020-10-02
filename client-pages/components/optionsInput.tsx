import * as React from 'react';

export interface OptionsInputProps {
    options: string[];
    index: number;
    OnOptionSelected?: (index: number) => void;
}

const OptionsInput: React.SFC<OptionsInputProps> = (props: OptionsInputProps) => {
    const options = props.options.map((option: string, index: number) =>
        <option value={index} key={index}>{option}</option>
    );
    return (
        <select
            className='select'
            onChange={(element: any) => {
                if(props.OnOptionSelected) {
                    const intValue = parseInt(element.target.value);
                    props.OnOptionSelected(intValue)}
                }
            }                
            value={props.index}
        >
            {options}
            <style jsx>{`
                .select {
                    width: 100%;
                    height: 100%;
                    border-color: #DAE0EC;
                    outline: none;
                    display: inline-block;
                }
            `}</style>
        </select>
    );
}

export default OptionsInput;