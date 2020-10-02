import { ExtendedFlatTypeEntity } from "../../model/flatType";
import ResultImage from "./resultImage";
import config from "../../config";
import Slider from "react-slick";

export interface ResultImagesProps {
    extendedFlat: ExtendedFlatTypeEntity;
    activeColor: string;
    nonActiveColor: string;
}

const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const ResultImages: React.SFC<ResultImagesProps> = (props: ResultImagesProps) => {
    const extendedFlat = props.extendedFlat;
    if (!extendedFlat.flatTypeEntity.images || extendedFlat.flatTypeEntity.images.length === 0) {        
        return null;
    }
    if (extendedFlat.flatTypeEntity.images.length === 1) {
        return (
            <ResultImage
                imageUrl={`${config.baseURL}/${extendedFlat.flatTypeEntity.images[0]}`} />
        );
    }
    const renderedImages: JSX.Element[] = [];
    for (let index = 0; index < extendedFlat.flatTypeEntity.images.length; index++) {
        renderedImages.push(
            <ResultImage
                key={`cImage_${extendedFlat.flatTypeEntity.id}_${index}`}
                imageUrl={`${config.baseURL}/${extendedFlat.flatTypeEntity.images[index]}`} />
        );
    }
    return (
        <div>
            <Slider {...settings}>
                {renderedImages}
            </Slider>
            <style jsx global>{`
                .slick-dots li button:before {
                    color: ${props.nonActiveColor};
                    opacity: 1;
                    font-size: 15px;
                }
                .slick-dots li.slick-active button:before {
                    color: ${props.activeColor};
                    opacity: 1;
                }
            `}
            </style>
        </div>
    );
}

export default ResultImages;
