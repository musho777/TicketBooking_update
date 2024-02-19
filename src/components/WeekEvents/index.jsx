import { useTranslation } from "react-i18next"
import { WeekCard } from "./card"
import { ShowAllButton } from "../Button/ShowAllButton"
import { LeftSvg, RightSvg } from "../svg"
import { useSelector } from "react-redux"

export const WeekEvents = () => {
    const { t } = useTranslation()
    const { getWeekEvent } = useSelector((st) => st)

    return <div className="WeekEvents">
        <div className="container">
            <div className='WeekEventTitle'>
                <h2>{t('WEEKLYEVENTS')}</h2>
                <div className="WeekArrow">
                    <RightSvg />
                    <LeftSvg />
                </div>
            </div>
            <div className="WeekCardWrapper">
                {getWeekEvent.events.map((elm, i) => {
                    // if (!elm.isParonyanEvent) {
                    return <div>
                        <WeekCard
                            date={elm.date}
                            time={elm.time}
                            id={elm.eventId?._id}
                            hall={elm?.hallId?.hall}
                            hall_en={elm.hallId?.hall_en}
                            hall_ru={elm.hallId?.hall_ru}
                            place={elm.hallId.place}
                            place_en={elm.hallId.place_en}
                            place_ru={elm.hallId.place_ru}
                            title={elm.eventId?.title}
                            title_en={elm.eventId?.title_en}
                            title_ru={elm.eventId?.title_ru}
                            img={`${process.env.REACT_APP_IMAGE}/${elm.eventId?.image}`}
                        />
                    </div>
                    // }
                    // else {
                    //     const matchResult = elm.ParonyanTime.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                    //     const day = matchResult[1];
                    //     const divContent = matchResult[3];
                    //     const parser = new DOMParser();
                    //     const doc = parser.parseFromString(divContent, "text/html");
                    //     const divElement = doc.body.firstChild;
                    //     divElement.removeChild(divElement.querySelector('br'));
                    //     const linesArray = Array.from(divElement.childNodes)
                    //         .filter(node => node.nodeType === 3)
                    //         .map(node => node.textContent.trim());
                    //     const time = matchResult[5];
                    //     return <div>
                    //         <WeekCard
                    //             // date={elm.ParonyanText}
                    //             // time={elm.time}
                    //             id={elm.ParonyanEventId}
                    //             hall={elm.ParonyanGroup_name}
                    //             hall_en={elm.ParonyanGroup_name}
                    //             hall_ru={elm.ParonyanGroup_name}
                    //             title={elm?.ParonyanName}
                    //             title_en={elm.ParonyanName}
                    //             title_ru={elm.ParonyanName}
                    //             img={elm.ParonyanImg}
                    //             time={`${day}-${linesArray[0]}-${2024}, ${time}`}
                    //         />
                    //     </div>
                    // }

                })
                }
            </div>
            <div className="ShowAllButtonWrappr">
                {getWeekEvent.events > 8 &&
                    <ShowAllButton onClick={() => window.location = '/allWeekEvents'} />
                }
            </div>
        </div>
    </div>
}