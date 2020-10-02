import * as React from 'react';

export interface DigitsInputProps {
    id?: string;
    className: string;
    value: number;
    placeHolder: string;
    readOnly?: boolean;
    onChange: (number: number) => void;
}

export interface DigitsInputState {
    s?: string;
}

class DigitsInput extends React.Component<DigitsInputProps, DigitsInputState> {
    constructor(props: DigitsInputProps) {
        super(props);
        this.state = { s: ''  };
    }
    render() {
        return <input className={this.props.className} id={this.props.id}
                type='tel'
                pattern='[0-9]*'
                value={this.props.value}
                placeholder={this.props.placeHolder}
                readOnly={this.props.readOnly || false}
                onChange={this.onChangeHandler} />;
    }

    private onChangeHandler = ({ target }: any) => {
        const number = target.value;
        if (number === '') {
            this.props.onChange(number);
            return;
        }

        let hasPoint = false;
        for (let index = 0; index < number.length; index++) {
            const digit = number[index];
            if ( (digit <= '9') && (digit >= '0') ) {
                continue;
            }
            if ( (digit === '.') && !hasPoint )  {
                hasPoint = true;
                continue;
            }
            return;
        }
        this.props.onChange(number);
    }
}

export default DigitsInput;