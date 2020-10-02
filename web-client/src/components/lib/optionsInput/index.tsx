import * as React from 'react';
import './style.less';

export interface OptionsInputProps {
    title: string;
    options: string[];
    index: number;
    className?: string;
    OnOptionSelected: (index: number) => void;
}

export class OptionsInput extends React.Component<OptionsInputProps, {}> {
    constructor(props: OptionsInputProps) {
        super(props);
   }

    public render() {
        const options = this.props.options.map((option: string, index: number) =>
            <option value={index} key={index}>{option}</option>
        );
        let cn = 'center roundedOptionInput nl fillContainer';
        if ( this.props.className ) {
            cn += ` ${this.props.className}`;
        }
        return (
            <select
                className={cn}
                name={this.props.title}
                onChange={this.onChange}
                value={this.props.index}
            >
                {options}
            </select>
        );
    }

    private onChange = async (element: any) => {
        const activeIndex = element.target.value;
        this.props.OnOptionSelected(activeIndex);
    }
}
