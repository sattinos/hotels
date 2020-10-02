export interface ResultImageProps {
    imageUrl: string;
}

const ResultImage: React.SFC<ResultImageProps> = (props: ResultImageProps) => {
    return (
        <div className={`Image`}>
            <style jsx>{`
                .Image {
                    background: url(${props.imageUrl});
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    height: 210px;
                    width: 100%;
                }
            `}
            </style>
        </div>
    );
}

export default ResultImage;