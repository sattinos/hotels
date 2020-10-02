import localizer from "../controller/lib/localization/localizer";
import LanguageDropMenu from "./languageDropMenu";

const HeaderImage = () => {
    return (
        <div className='noPrint' id='imageDiv'>
            <div className={`languageDivFixed ${localizer.cssClass('languageDiv')}`}>
                <LanguageDropMenu />
            </div>

            <style jsx>{`
                #imageDiv {
                    background: url(${`/static/mainPage.jpeg`});
                    background-repeat: no-repeat;
                    background-size: cover;
                    height: 160px;
                    position: relative;
                }

                .languageDivFixed {
                    position: absolute;
                    top: 10px;
                }

                .languageDiv {
                    right: 10px;
                }

                .languageDivRtl {
                    left: 10px;
                }
            `}</style>
        </div>
    );
}

export default HeaderImage;