import * as React from 'react';

export interface ErrorBoundaryState {
    hasError: boolean;
    error: any;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: '' };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    public componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.log('componentDidCatch(error):');
        console.log(error);
        console.log(errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong: {this.state.error}</h1>;
        }

        return this.props.children;
    }
}