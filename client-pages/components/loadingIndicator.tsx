import * as React from 'react';
import ModalBG from "./modalBG";

export interface LoadingIndicatorProps {
    isLoading: boolean;
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (props: LoadingIndicatorProps) => {
    return (
        <ModalBG isVisible={props.isLoading}>
            <div className='LoaderContainer'>
                <div className='Loader' />
            </div>
            <style jsx>{`
                .LoaderContainer {
                    width: 200px;
                    height: 200px;
                    margin: auto;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    position: fixed;
                    padding-top: 40px;
                }

                .Loader {
                    margin: auto;
                    border: 8px solid #f3f3f3; /* Light grey */
                    border-top: 8px solid blue; /* Blue */
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 0.75s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
            </style>
        </ModalBG>
    );
}

export default LoadingIndicator;
