export interface ButtonProps {
    text: string;
    fontSize?: number;
    bgColor?: string;
    width?: number;
    padding?: number;
    isBold?: boolean;
    color?: string;
    onClick: () => void;
    enabled: boolean;
    id?: string;
    marginLeft?: number;
    marginRight?: number;
}

const onClick = (props: ButtonProps) => {
    if(!props.enabled) {
        return;
    }
    props.onClick();
}

const Button: React.SFC<ButtonProps> = (props: ButtonProps) => {
    let width = 280;
    if( props.width ) {
        width = props.width;
    }
    const bgColor = props.enabled ? (props.bgColor || '#000AFF') : 'grey' ;
    return (<button id={`btn${props.id}`} onClick={() => onClick(props)} >
        {props.text}
        <style>{`
            #btn${props.id} {
                    color: ${props.color || '#FFFFFF'};
                    font-size: ${props.fontSize || 22}px;
                    background-color: ${bgColor};
                    font-weight: ${props.isBold || false};
                    box-sizing: border-box;
                    width: ${width}px;
                    padding: ${props.padding || 10}px;
                    margin-left: ${props.marginLeft || 0}px;
                    margin-right: ${props.marginRight || 0}px;
                    
            }
        `}
        </style>
    </button>);
}

export default Button;
