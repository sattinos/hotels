import DayPickerInput from 'react-day-picker/DayPickerInput';
import localizer from '../controller/lib/localization/localizer';

export interface DateBoxProps {
    onDateChosen: (date: Date) => void;
    title: string;
    value: Date;
}

const DateBox: React.SFC<DateBoxProps> = (props: DateBoxProps) => {
    return (
        <div className='dateBox'>
            <div className='dateBoxTitle'>
                {props.title}
            </div>
            <div className={localizer.cssClass('calendarBox')}>
                <div className={`calendarDivFixed ${localizer.cssClass('calendarDiv')}`}>
                    <img className='icon' src='/static/img/calendar-alt.svg' alt='vendor image' />
                </div>
                <DayPickerInput value={props.value} format='' onDayChange={(date: Date) => props.onDateChosen(date)} />
            </div>
            <style jsx>{`
                .dateBox {
                    display: inline-block;
                    font-weight: normal;
                    font-size: 22px;
                    color: #080808;
                }

                .dateBoxTitle {           
                }

                .calendarBoxRtl {
                    display: flex;
                }

                .calendarDivFixed {
                    width: 48px;
                    height: 48px;
                    border:2px solid #DAE0EC;
                    display: inline-block;
                    float: left;
                    box-sizing: border-box;
                }

                .calendarDiv {
                    border-right-width: 0px;
                }

                .calendarDivRtl {
                    border-left-width: 0px;
                }

                .icon {
                    width: 60%;
                    height: auto;
                    text-align: center;
                    padding: 6px 8px;
                }

                .dayPickerInput {
                    display: inline-block;
                    background-color: green;
                }

                @media only screen and (max-width: 900px) {
                    .dateBox {
                        display: flex;
                        justify-content: center;
                    }

                    .dateBoxTitle {    
                        display: inline-block;       
                        float: left;
                        padding: 9px;
                        min-width: 100px;
                    }

                    .calendarBox {
                        display: inline-block;
                    }
                }
            }
        `}</style>

            <style jsx global>{`
            .DayPickerInput {
                height: 48px;
                padding: 0px;
                display: inline-block;
                border: 2px solid #DAE0EC;
                float: left;            
                box-sizing: border-box;
            }

            .DayPickerInput > input {
                height: 100%;
                width: 130px;
                box-sizing: border-box;
                border-style: none;
                text-align: center;
            }

            .DayPickerInput-OverlayWrapper {
                position: relative;
            }

            .DayPickerInput-Overlay {
                position: absolute;
                left: -100px;
                z-index: 1;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            }    
    `}</style>
        </div>
    )
}

export default DateBox;