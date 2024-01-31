import './style.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocationSvg } from '../svg'

export const EachTicket = ({
    id, data, marginTrue,
    location,
    location_en,
    location_ru,
    title,
    title_ru,
    title_en,
    category,
    category_ru,
    category_en,
    image,
    price,
    time,
    date,
    type,
    onClick
}) => {
    const navigation = useNavigate()
    const [languageData, setLanguageData] = useState({ title: '', location: '', categorName: '' })
    const { language } = useSelector((st) => st.StaticReducer)
    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = title
            item.location = location
            item.categorName = category
        }
        else if (language === 'en') {
            item.title = title_en
            item.location = location_en
            item.categorName = category_en

        }
        else if (language === 'ru') {
            item.title = title_ru
            item.location = location_ru
            item.categorName = category_ru
        }
        setLanguageData(item)
    }, [language, data])

    return (
        <div className='ticket' id={marginTrue ? 'left' : ''} onClick={onClick}>
            <div className='TicketInfodiv'>
                <div className='TicketInfo'>
                    <div>
                        <p className='ticketTitle'>{languageData.title}</p>
                        <p className='TicketData'>{date} {time}</p>
                    </div>
                    <div className='TicketTeater'>
                        <LocationSvg />
                        <p>{languageData.location}</p>
                    </div>
                    <p className='TicketPrice'>{price}</p>
                </div>
                <div className='TicketInfoLine' />
            </div>
            <img alt='' className='Ticketimg' src={image} />
        </div>
    )
}