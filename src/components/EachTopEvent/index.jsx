import './style.css'
import { Button } from '../Button'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const EachTopEvent = ({ id, image, location, location_en, location_ru, date, price, data }) => {
    const { t } = useTranslation()
    const { language } = useSelector((st) => st.StaticReducer)
    const [languageData, setLanguageData] = useState({ title: '', location: '', categorName: '' })
    const [hover, setHover] = useState(false)
    const [hover1, setHover1] = useState(false)

    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = data?.title
            item.location = location
            item.categorName = data.category.name
        }
        else if (language === 'en') {
            item.title = data?.title_en
            item.location = location_en
            item.categorName = data.category.name_en

        }
        else if (language === 'ru') {
            item.title = data?.title_ru
            item.location = location_ru
            item.categorName = data.category.name_ru
        }
        setLanguageData(item)
    }, [language])

    useEffect(() => {
        if (hover) {
            const timeoutId = setTimeout(() => {
                setHover1(true)

            }, 400);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        else {
            setHover(false)
            setHover1(false)
        }

    }, [hover])

    return (
        <div className='eachTopEvent' onClick={() => window.location = (`/Single/${id}`)}>
            <div className='topEventImage'>
                <img alt='' src={image} />
            </div>
            <div onMouseEnter={() => {
                setHover(true)
                setHover1(true)
            }} onMouseLeave={() => {
                setHover(false)
                setHover1(false)

            }
            } id={hover ? 'hovertopEventDetails' : ''} className='topEventDetails'>
                {hover &&
                    <div className='ticketTitleCategoruDiv'>
                        <h3>{languageData?.title}</h3>
                        <div className='ticketTitleCategoru'>
                            {languageData.categorName}
                        </div>
                    </div>}
                {hover1 && <div className='topEventDetailsInfo'>
                    <span>{languageData?.location}</span>
                    <span>{date}</span>
                    <span>{price}</span>
                </div>}
            </div>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                    setHover(false)
                    setHover1(false)
                }

                } className='buttonEachEventDiv'>
                <button className='buttonEachEvent' onClick={() => window.location = (`/Single/${id}`)}>{t('BuyTicket')}</button>
            </div>
        </div>
    )
}