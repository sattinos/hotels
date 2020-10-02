import ModalBG from "./modalBG";

export interface ModalDialogBoxProps extends React.Props<ModalDialogBoxProps>{
    blurBG?: boolean;
    isVisible: boolean;
    bgColor?: string;
    padding?: number;
}

const ModalDialogBox: React.SFC<ModalDialogBoxProps> = (props: ModalDialogBoxProps) => {
    return (
        <ModalBG isVisible={props.isVisible}>
            <div className='container'>
                <div className='box'>
                    {props.children}
                </div>
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;                }

                .box {
                    background-color: ${props.bgColor || '#FFFFFF'};
                    padding: ${props.padding || 20}px;
                }
            `}
            </style>
        </ModalBG>
    );
}

export default ModalDialogBox;
