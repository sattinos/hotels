export interface CircleProps {
    radius: number;
    text: string;
    title: string;
    isFilled: boolean;    
    thickness: number;
    connectRight?: boolean;
    connectLeft?: boolean;
}

const Circle: React.SFC<CircleProps> = (props: CircleProps) => {
    const iconPadding = props.isFilled ? 0.24 : 0.16;
    const containerHPadding = 0;
    const titleFontSize = props.radius * 0.32;
    const titlePadding = 4;
    const lineWidth = containerHPadding + ( (titlePadding + (titleFontSize * props.title.length)) * 0.5);
    return (
        <div className='container'>
            <div className='icon'>
                {props.text}
                {props.connectRight ? <div className='line rightLine' /> : null}
                {props.connectLeft ? <div className='line leftLine' /> : null}
            </div>
            <div className='title'>{props.title}</div>
            <style jsx>{`
                .container {
                    text-align: center;
                    padding: 10px ${containerHPadding}px;
                    display: inline-block;
                    overflow: hidden;
                    width: 80px;                    
                }

                .icon {
                    height: ${props.radius}px;
                    width: ${props.radius}px;
                    border-radius: 50%;
                    display: inline-block;
                    border-width: ${props.thickness}px;
                    border-style: solid;
                    border-color: black;
                    color: ${props.isFilled ? 'white' : 'black' };
                    ${props.isFilled ? `background-color: black;` : ''}
                    font-size: ${props.radius * 0.45}px;
                    padding-top: ${props.radius * iconPadding}px;
                    box-sizing: border-box;
                    ${props.isFilled ? `font-weight: bold;` : ''}
                    position: relative;
                    z-index: 3;

                }

                .title {
                    padding: ${titlePadding}px;
                    font-size: ${titleFontSize}px;
                    color: black;
                    ${props.isFilled ? `font-weight: bold;` : ''}
                }

                .line {
                    position: absolute;
                    display: inline-block;
                    background-color: black;
                    top: ${props.radius * 0.4}px;
                    width: ${lineWidth}px;
                    height: 4px;
                    z-index: 1;

                }

                .rightLine {
                    left: ${props.radius - 3}px;
                }

                .leftLine {
                    right: ${props.radius - 3}px;
                }
            `}
            </style>
        </div>
    );
}

export default Circle;
