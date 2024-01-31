import { useEffect, useState } from 'react'
import { WeekEventSvg, WeekEventSvgM } from '../svg'
import './styles.css'
import { useSelector } from 'react-redux'
export const WeekCard = ({
    title,
    title_en,
    title_ru,
    hall,
    hall_en,
    hall_ru,
    time,
    date
}) => {
    const [languageData, setLanguageData] = useState({ title: '', location: '', hall: '' })
    const { language } = useSelector((st) => st.StaticReducer)
    function truncateText(text) {
        if (text?.length > 13) {
            return text.substring(0, 10) + '...';
        } else {
            return text;
        }
    }
    console.log(date)

    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = title
            item.hall = hall
        }
        else if (language === 'en') {
            item.title = title_en
            item.hall = hall_en

        }
        else if (language === 'ru') {
            item.title = title_ru
            item.hall = hall_ru
        }
        console.log(title, title_en, title_ru)
        setLanguageData(item)
    }, [language])
    return <div className='WeekCard'>
        <div className='WeekCardImg'>
            <img src={require('../../assets/3.png')} />
        </div>
        <div className='WeekcardIfno'>
            <p className='WeekcardIfnoTitle'>{truncateText(languageData.title)}</p>
            <p className='WeekCardDate'>
                {date?.slice(0, 10)} {time}
            </p>
            <p className='WeekCardPlace'>{truncateText(languageData.hall)}</p>
        </div>
        <div className='WeekcardLine' />
        <div className='WeekcardLineSvg'>
            <WeekEventSvg />
        </div>
        <div className='WeekcardLineSvgM'>
            <WeekEventSvgM />
        </div>
    </div>
}