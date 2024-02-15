import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessSinglPage } from '../../services/action/SuccessAction';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CategoryType } from '../../components/CategoryType';
export const Card = ({
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
    currentDayOfWeek,
    type = true,
    time2,
    month1,
    year
}) => {
    function truncateText(text) {
        if (text?.length > 15) {
            return text.substring(0, 14) + '...';
        }
        else {
            return text;
        }
    }
    const { t } = useTranslation();
    const [languageData, setLanguageData] = useState({ title: '', location: '', categorName: '', hall })
    const { language } = useSelector((st) => st.StaticReducer)
    const dispatch = useDispatch()
    const navigation = useNavigate()
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

    const handelClick = () => {
        if (!type) {
            dispatch(SuccessSinglPage({
                event: {
                    location: location,
                    location_en: 'H. Paronyan State Theater',
                    location_ru: 'A.Государственный театр Пароняна',
                    title: data?.title,
                    title_ru: data?.title_ru,
                    title_en: data?.title_en,
                    date: time2.replace(/<div[^>]*>|<\/div>|<br>/g, ''),
                    image: image,
                    id: id,
                    type: 'paronyan'
                }
            }))
            navigation(`/Single/${id}`)
        }
        else {
            window.location = `/Single/${id}`
        }

    }

    return <div className='TopEvents' id={'AllEventsWrapperCard'}>
        <div className='TypeTopDiv'>
            <CategoryType type={category?._id} name={languageData?.categorName} />
        </div>
        <div className='TopEventsInfo' id={'AllEventsInfo'}>
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
                <p className='TopEventsInfoPlace'>{languageData?.hall}</p>
            </div>
            <div className='TopEventsInfoLine' />
            <div className='TopEventsDiv'>
                <div className='TopEventsDivDiv'>
                    <p className='TopEventsTeaterName'>{languageData?.location}</p>
                    <p className='TopEventsName'>{truncateText(languageData?.title)}</p>
                </div>
                <p className='TopEventsPrice'>{price}</p>
            </div>
            <div className='TopEventsInfoLine2' />
            <div className='TopEventsButton'>
                <Button
                    onClick={() => handelClick()}
                    title={t('BuyNow')} />
            </div>
        </div>
        <div className='AllEventsCardWrapper'>
            <img src={image} />
            <div className='AllEventsCardWrapperInfo'>
                <p className='AllEventsCardWrapperInfoTitle'>{truncateText(languageData.title)}</p>
                <p className='AllEventsCardWrapperInfoTitleDate'>{day}.{month1}.{year} {time}</p>
                <p className='AllEventsCardWrapperInfoTitleDateTeter'>{languageData?.hall}</p>
            </div>
        </div>
    </div>
}