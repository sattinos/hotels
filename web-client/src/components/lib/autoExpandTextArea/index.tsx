import * as React from 'react';

export interface AutoExpandAreaProps {
    className: string;
    placeholder: string;
    value: string;
    onTextChange: (newValue: string) => void;
}

interface AutoExpandAreaState {
    style: any;
}

export class AutoExpandArea extends React.Component<AutoExpandAreaProps, AutoExpandAreaState> {
    private _element: any;

    constructor(props: AutoExpandAreaProps) {
        super(props);
        this.state = {
            style: {
                height: 'auto',
                padding: '10px'
            }
        };
        this._element = null;
    }

    public componentDidMount() {
        this.autoExpand();
    }

    public render() {
        return (
            <textarea
                className={this.props.className}
                placeholder={this.props.placeholder}
                onKeyDown={this.onKeyDown}
                style={this.state.style}
                ref={(element) => { this._element = element; }}
                value={this.props.value}
                onChange={this.onChange}
            />
        );
    }

    private onChange = (value: any) => {
        const text = value.target.value;
        this.props.onTextChange(text);
    }

    private onKeyDown = (_e: any) => {
        if (this._element !== null) {
            this.autoExpand();
        }
    }

    private autoExpand() {
        setTimeout(() => {
            this.setState({
                style: {
                    height: `auto`
                }
            }, () => {
                this.setState({
                    style: {
                        height: `${this._element.scrollHeight}px`
                    }
                });
            });
        }, 10);
    }
}
