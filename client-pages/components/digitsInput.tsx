import * as React from 'react';

export interface DigitsInputProps {
    value: number;
    placeHolder: string;
    readOnly?: boolean;
    onChange: (number: number) => void;
}

class DigitsInput extends React.Component<DigitsInputProps, {}> {
    public render() {
        return (
            <div>
                <input
                    className='input'
                    type='tel'
                    pattern='[0-9]*'
                    value={this.props.value}
                    placeholder={this.props.placeHolder}
                    readOnly={this.props.readOnly || false}
                    onChange={this.onChangeHandler} />

                <style jsx>{`            
                    .input {
                        border-style: solid;
                        border-color: #DAE0EC;
                        width: 100%;
                        height: 100%;
                        font-size: 16px;
                        padding: 10px;
                    }
                `}
                </style>
            </div>
        );
    }

    private onChangeHandler = ({ target }: any) => {
        const number = target.value;
        if (number === '') {
            this.props.onChange(number);
            return;
        }
        for (let index = 0; index < number.length; index++) {
            const digit = number[index];
            if ((digit <= '9') && (digit >= '0')) {
                continue;
            }
            return;
        }
        this.props.onChange(number);
    }
}

export default DigitsInput;