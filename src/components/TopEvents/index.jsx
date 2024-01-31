import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetTopEvents } from "../../services/action/action"
import { TopEvents } from "./TopEvents"
import { useTranslation } from "react-i18next"
import './styles.css'
import { ShowAllButton } from "../Button/ShowAllButton"

export const TopEventsComponent = () => {
    const topEvents = useSelector((st) => st.topEvents)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    useEffect(() => {
        dispatch(GetTopEvents())
    }, [])

    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <div>
        <div className='EventTitle'>
            <h2>{t('TopEvents')}</h2>
        </div>
        <div className="TopEventWrapper">
            {
                topEvents?.events.length > 0 && topEvents?.events.map((elm, i) => {
                    const dateObject = new Date(elm.sessions[0]?.date);
                    let day = dateObject.getDate();
                    let month = dateObject.getMonth();
                    var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
                    return <TopEvents
                        key={i}
                        day={day}
                        id={elm?._id}
                        image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                        title={elm.title}
                        category={elm.category}
                        location={elm?.sessions[0]?.hallId?.location}
                        location_en={elm?.sessions[0]?.hallId?.location_en}
                        location_ru={elm?.sessions[0]?.hallId?.location_ru}
                        data={elm}
                        time={elm?.sessions[0]?.time}
                        months={months[month]}
                        currentDayOfWeek={currentDayOfWeek}
                        price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
                    />
                })}
        </div>
        <div className="ShowAllButtonWrappr">
            <ShowAllButton />
        </div>
    </div>
}