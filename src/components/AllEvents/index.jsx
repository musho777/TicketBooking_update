import './styles.css'
import { useEffect } from "react"
import { EachTicket } from "../EachTicket"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetParonyanEvents, GetRandomEvents } from "../../services/action/action"
import { ShowAllButton } from '../Button/ShowAllButton'
import { useNavigate } from 'react-router-dom'
import { SuccessSinglPage } from '../../services/action/SuccessAction'

export const ALLEvents = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getRandomEvents)
    const { paronyanEvents } = useSelector((st) => st)
    const navigation = useNavigate()

    useEffect(() => {
        dispatch(GetRandomEvents(1))
        dispatch(GetParonyanEvents())
    }, [dispatch])


    return (
        <div>
            <div className='EventTitle'>
                <h2>{t('AllEvents')}</h2>
            </div>
            <div className="Allevents">
                {events?.events?.length > 0 && events?.events?.map((elm, i) => {
                    const dateObject = new Date(elm?.sessions[0]?.date)
                    let day = dateObject.getDate()
                    let month = dateObject.getMonth() + 1
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    if (month <= 9) {
                        month = `0${month}`
                    }
                    if (elm?.sessions?.length > 0 && i < 8)
                        return (
                            <EachTicket
                                key={i}
                                id={elm?._id}
                                onClick={() => window.location = `/Single/${elm?._id}`}
                                location={elm?.sessions[0]?.hallId?.location}
                                location_en={elm?.sessions[0]?.hallId?.location_en}
                                location_ru={elm?.sessions[0]?.hallId?.location_ru}
                                title={elm?.title}
                                title_ru={elm?.title_ru}
                                title_en={elm?.title_en}
                                category_en={elm?.category.name_en}
                                category_ru={elm?.category.name_ru}
                                category={elm?.category.name}
                                time={elm?.sessions[0]?.time}
                                image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                                date={`${day}-${month}-${dateObject.getFullYear()}, ${elm.sessions[0]?.time}`}
                                price={`${elm?.sessions[0]?.priceStart} - ${elm?.sessions[0]?.priceEnd} AMD`}
                            />
                        )
                })}
                {paronyanEvents?.events?.result?.map((elm, i) => {
                    if (events?.events?.length < 8 && 8 - events?.events?.length > i)
                        return <EachTicket
                            key={i}
                            location={elm?.group_name}
                            location_en={'H. Paronyan State Theater'}
                            location_ru={'A.Государственный театр Пароняна'}
                            title={elm?.name}
                            onClick={() => {
                                dispatch(SuccessSinglPage({
                                    location: elm?.group_name,
                                    location_en: 'H. Paronyan State Theater',
                                    location_ru: 'A.Государственный театр Пароняна',
                                    title: elm?.name,
                                    title_ru: elm?.name,
                                    title_en: elm?.name,
                                    date: elm.time.replace(/<div[^>]*>|<\/div>|<br>/g, ''),
                                    image: elm.img,
                                    id: elm?.id
                                }))
                                navigation(`/Single/paronyan${elm?.id}`)
                            }}
                            title_ru={elm?.name}
                            title_en={elm?.name}
                            date={elm.time.replace(/<div[^>]*>|<\/div>|<br>/g, '')}
                            image={elm.img}
                            price={``}
                        />
                })}
            </div>
            <div className="ShowAllButtonWrappr">
                <ShowAllButton onClick={() => window.location = '/allEvents'} />
            </div>
        </div>
    )
}