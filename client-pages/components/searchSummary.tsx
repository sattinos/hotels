import { format } from 'date-fns'
import localizer from '../controller/lib/localization/localizer';

export interface SearchSummaryProps {
    beforeFromText: string;
    from: Date;
    afterFromText: string;
    to: Date;
    afterToText: string;
    onChangeClicked?: () => void;
}

const SearchSummary: React.SFC<SearchSummaryProps> = (props: SearchSummaryProps) => {
    return (
        <div className={`summaryTextFixed ${localizer.cssClass('summaryText')}`}>
            <span className='avText'>{props.beforeFromText}</span>
            <span className='dateText'>{format(props.from, 'DD/MM/YYYY')}</span>
            <span className='avText'>{props.afterFromText}</span>
            <span className='dateText'>{format(props.to, 'DD/MM/YYYY')}</span>
            {props.onChangeClicked ? <span className='avText changeText' onClick={props.onChangeClicked}>{props.afterToText}</span> : null}
            <style jsx>{`
                .summaryTextFixed {
                    box-sizing: border-box;    
                    padding: 5px 20px;
                    color: black;
                    font-size: 3.4vw;
                }

                .summaryText {
                    text-align: left;                    
                }

                .summaryTextRtl {
                    text-align: right;                    
                }

                .avText {
                }

                .dateText {
                    padding: 0px 10px;           
                    font-weight: bolder;
                }

                .changeText {
                    color: #000AFF;
                    cursor: pointer;
                }

                @media only screen and (min-width: 600px) {
                    .summaryTextFixed {
                        font-size: 20px;
                    }
                }
          }
      `}</style>
        </div>
    );
}

export default SearchSummary;
