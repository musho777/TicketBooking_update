import './style.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Date, Location, LocationSvg, TicketIcon } from '../svg'

export const EachTicket = ({ id, date, price, data, marginTrue }) => {
    const navigation = useNavigate()
    const [languageData, setLanguageData] = useState({ title: '', location: '', categorName: '' })
    const { language } = useSelector((st) => st.StaticReducer)
    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = data?.title
            item.location = data?.sessions[0]?.hallId?.location
            item.categorName = data.category.name
        }
        else if (language === 'en') {
            item.title = data?.title_en
            item.location = data?.sessions[0]?.hallId?.location_en
            item.categorName = data.category.name_en

        }
        else if (language === 'ru') {
            item.title = data?.title_ru
            item.location = data?.sessions[0]?.hallId?.location_ru
            item.categorName = data.category.name_ru
        }
        setLanguageData(item)
    }, [language, data])

    return (
        <div className='ticket' id={marginTrue ? 'left' : ''} onClick={() => navigation(`/Single/${id}`)}>
            <div className='TicketInfodiv'>
                <div className='TicketInfo'>
                    <div>
                        <p className='ticketTitle'>ԲԱՆԱԼԻ ԵՐՅՈՒՍԻ ՀԱՄԱՐ</p>
                        <p className='TicketData'>24.02.24 19:00</p>
                    </div>
                    <div className='TicketTeater'>
                        <LocationSvg />
                        <p>գոյ թատրոն</p>
                    </div>
                    <p className='TicketPrice'>1500-5000 AMD</p>
                </div>
                <div className='TicketInfoLine' />
            </div>
            <img alt='' className='Ticketimg' src={`${process.env.REACT_APP_IMAGE}/${data.image}`} />
        </div>
        // <div className='ticket' id={marginTrue ? 'left' : ''} onClick={() => navigation(`/Single/${id}`)}>
        //     <div>
        //         <img alt='' className='Ticketimg' src={`${process.env.REACT_APP_IMAGE}/${data.image}`} />
        //     </div>
        //     <div className='ticketText'>
        //         <div className='ticketTextWrapper1'>
        //             <p className='ticketTitle'>{languageData?.title}</p>
        //             <p className='ticketTitleCategoru'>
        //                 {languageData.categorName}
        //             </p>
        //         </div>
        //         <div className='ticketTextWrapper'>
        //             <Date />
        //             <p className='ticketTextp'>{date}</p>
        //         </div>
        //         <div className='ticketTextWrapper'>
        //             <Location />
        //             <p className='ticketTextp'>{languageData?.location}</p>
        //         </div>
        //         <div className='ticketTextWrapper'>
        //             <TicketIcon />
        //             <p className='ticketTextp'>{price}</p>
        //         </div>
        //     </div>
        // </div>
    )
}