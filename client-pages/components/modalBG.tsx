import * as React from 'react';

export interface ModalBGProps extends React.Props<ModalBGProps> {
    isVisible: boolean;
    bgColor?: string;
}

const ModalBG: React.SFC<ModalBGProps> = (props: ModalBGProps) => {
    if (!props.isVisible) {
        return null;
    }
    return (
        <div className='modalBG'>
            {props.children}
            <style jsx>{`
                .modalBG {
                    display: block;
                    position: fixed;
                    left: 0;
                    top: 0;
                    background-color: ${props.bgColor || 'rgba(0,0,0,0.72)'};
                    width: 100%;
                    height: 100%;
                    z-index: 12;
                    box-sizing: border-box;
                }
            `}
            </style>
        </div>
    );
}

export default ModalBG;
