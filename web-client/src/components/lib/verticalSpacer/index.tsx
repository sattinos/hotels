import * as React from 'react';

interface VerticalSpacerProps {
    height: number;
}

export class VerticalSpacer extends React.Component<VerticalSpacerProps, {}> {
    public render() {
        return (
            <div style={{ margin: this.props.height }} />
        );
    }
}
