import { useTranslation } from "react-i18next"
import { WeekCard } from "./card"
import { ShowAllButton } from "../Button/ShowAllButton"
import { LeftSvg, RightSvg } from "../svg"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WeekEvetntApi } from "../../services/action/action"

export const WeekEvents = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
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
                    console.log(elm)
                    return <div>
                        <WeekCard
                            date={elm.date}
                            time={elm.time}
                            id={elm.eventId._id}
                            hall={elm.hallId.hall}
                            hall_en={elm.hallId.hall_en}
                            hall_ru={elm.hallId.hall_ru}
                            title={elm.eventId.title}
                            title_en={elm.eventId.title_en}
                            title_ru={elm.eventId.title_ru}
                            img={`${process.env.REACT_APP_IMAGE}/${elm.eventId.image}`}
                        />
                    </div>
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