import { useTranslation } from 'react-i18next';
import { Button } from '../Button'
import { CategoryType } from '../CategoryType'
import './styles.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export const TopEvents = ({
    image,
    location,
    location_en,
    location_ru,
    data,
    price,
    category,
    hall,
    hall_ru,
    hall_en,
    id,
    day,
    months,
    time,
    currentDayOfWeek
}) => {
    const { t } = useTranslation();
    const [languageData, setLanguageData] = useState({ title: '', location: '', categorName: '', hall })
    const { language } = useSelector((st) => st.StaticReducer)
    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = data?.title
            item.location = location
            item.categorName = category?.name
            item.hall = hall
        }
        else if (language === 'en') {
            item.title = data?.title_en
            item.location = location_en
            item.categorName = category?.name_en
            item.hall = hall_en

        }
        else if (language === 'ru') {
            item.title = data?.title_ru
            item.location = location_ru
            item.categorName = category?.name_ru
            item.hall = hall_ru
        }
        setLanguageData(item)
    }, [language])

    return <div className='TopEvents'>
        <div className='TypeTopDiv'>
            <CategoryType type={category?._id} name={languageData?.categorName} />
        </div>
        <div className='TopEventsInfo'>
            <div className='TopEventsInfoDiv'>
                <div className='TopEventsInfoDate'>
                    <p>{day}</p>
                </div>
                <div className='TopEventsMonthAndWeek'>
                    <p className='TopEventsMonth'>{months}</p>
                    <div className='TopEventsLine' />
                    <p className='TopEventsWeek'>{currentDayOfWeek}</p>
                </div>
                <p className='TopEventsTime'>{time}</p>
            </div>
            <div>
                <p className='TopEventsInfoPlace'>{languageData.hall}</p>
            </div>
            <div className='TopEventsInfoLine' />
            <div className='TopEventsDiv'>
                <div className='TopEventsDivDiv'>
                    <p className='TopEventsTeaterName'>{languageData?.location}</p>
                    <p className='TopEventsName'>{languageData?.title}</p>
                </div>
                <p className='TopEventsPrice'>{price}</p>
            </div>
            <div className='TopEventsInfoLine2' />
            <div className='TopEventsButton'>
                <Button
                    onClick={() => window.location = `/BuyTickets/${id}`}
                    title={t('BuyNow')} />
            </div>
        </div>
        <img src={image} />
    </div>
}