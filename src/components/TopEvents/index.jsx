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

    return <div>
        <div className='EventTitle'>
            <h2>{t('TopEvents')}</h2>
        </div>
        <div className="TopEventWrapper">
            {
                topEvents?.events.length > 0 && topEvents?.events.map((elm, i) => {
                    const dateObject = new Date(elm.sessions[0]?.date);
                    let day = dateObject.getDate();
                    let month = dateObject.getMonth() + 1;
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    if (month <= 9) {
                        month = `0${month}`
                    }
                    if (i == 0) {
                        console.log(elm)
                    }
                    return <TopEvents
                        key={i}
                        image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                        title={elm.title}
                        category={elm.category}
                        location={elm?.sessions[0]?.hallId?.location}
                        location_en={elm?.sessions[0]?.hallId?.location_en}
                        location_ru={elm?.sessions[0]?.hallId?.location_ru}
                        data={elm}
                        price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
                    />
                })}
        </div>
        <div className="ShowAllButtonWrappr">
            <ShowAllButton />
        </div>
    </div>
}