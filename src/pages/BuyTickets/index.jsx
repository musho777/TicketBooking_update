import { useEffect, useState } from 'react';
import { CalendarSvg, CalendarSvg1, ClearSvg, LocationSvg, LocationSvg1, Restart } from '../../components/svg'
import { ZoomMap } from '../../components/ZoomMap/ZoomMap'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { TopEvents } from '../../components/TopEvents/TopEvents';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GetSinglPage, RemoveTicketsAction } from '../../services/action/action';
import { CartPopup } from '../../components/popup/cart';
import { BuyNow } from '../../components/BuyNow';
export const BuyTickets = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const getSinglPage = useSelector((st) => st.getSinglPage)
    let { recomended } = getSinglPage?.events
    const { language } = useSelector((st) => st.StaticReducer)
    const [data, setData] = useState({ name: '', description: '', hall: '' })
    let { event } = getSinglPage?.events
    const [open, setOpen] = useState(false)
    const [scale, setScale] = useState(1);
    const handleZoomIn = () => {
        setScale(scale * 1.2);
    };
    const tickets = useSelector((st) => st.tiketsForBuy)
    const [total, setTotal] = useState(0)

    const handleZoomOut = () => {
        setScale(scale / 1.2);
    };
    useEffect(() => {
        dispatch(GetSinglPage(id))
    }, [])
    useEffect(() => {
        let price = 0
        tickets.tickets?.map((elm, i) => {
            price += +elm.price
        })
        setTotal(price)
    }, [tickets])

    useEffect(() => {
        let item = { ...data }

        if (language === 'am') {
            item.name = getSinglPage?.events?.event?.title
            item.description = getSinglPage.events.event?.description
            item.hall = getSinglPage.events.event?.sessions[0]?.hallId.hall
        }
        else if (language === 'ru') {
            item.name = getSinglPage.events.event?.title_ru
            item.description = getSinglPage.events.event?.description_ru
            item.hall = getSinglPage.events.event?.sessions[0]?.hallId.hall_ru



        }
        else if (language === 'en') {
            item.name = getSinglPage.events.event?.title_en
            item.description = getSinglPage.events.event?.description_en
            item.hall = getSinglPage.events.event?.sessions[0]?.hallId.hall_en
        }
        setData(item)
    }, [language, getSinglPage])


    function truncateText(text) {
        if (text?.length > 13) {
            return text.substring(0, 10) + '...';
        } else {
            return text;
        }
    }
    return <div className='container'>
        <CartPopup
            open={open}
            type='openBuy'
            setOpen={() => setOpen(false)}
        >
            <BuyNow />
        </CartPopup >
        <div className='BuyTicketsWrapper'>
            <div className='HallWrapper'>
                <div className="zoom-controls">
                    <button onClick={handleZoomIn}>+</button>
                    <button onClick={handleZoomOut}>-</button>
                    <button onClick={() => setScale(1)}>
                        <Restart />
                    </button>
                </div>
                <div className='Hall'>
                    <ZoomMap
                        event={event}
                        setScale={(e) => setScale(e)} scale={scale}
                        getSinglPage={getSinglPage}
                    />
                </div>
            </div>
            <div className='BuyTicketsCardWrapper'>
                <div className='BuyTicketsCard'>
                    <img src={`${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`} />
                    <div className='BuyTicketsCardInfo'>
                        <div>
                            <p className='BuyTicketTitle'>{data.name}</p>
                            <p className='BuyTickeDescription'>{truncateText(data.description)}</p>
                        </div>
                        <div className='BuyTicketDate'>
                            <CalendarSvg1 />
                            <p className='BuyTicketDateMonth'>{new Date(getSinglPage.events.event?.sessions[0].date).getDate()}.{new Date(getSinglPage.events.event?.sessions[0].date).getMonth() + 1}.{new Date(getSinglPage.events.event?.sessions[0].date).getFullYear()} </p>
                            <div></div>
                            <p className='BuyTicketDateTime'>{getSinglPage.events.event?.sessions[0].time}</p>
                        </div>
                        <div className='BuyTicketDateLocation'>
                            <LocationSvg1 />
                            <p>{data.hall}</p>
                        </div>
                    </div>
                </div>
                <div className='Tickets'>
                    <div className='TicketsHeader'>
                        <p>Տոմս</p>
                        <p>Գինը</p>
                    </div>
                    <div className='TicketBody'>
                        {
                            tickets?.tickets?.map((elm, i) => {
                                return <div className='TikcetsWrapper'>
                                    <div className='TicketDiv'>
                                        <div className='TicketInfoo'>
                                            <p>{elm?.parterre && t('Parterre')} {elm?.lodge && t('Lodge')} {elm?.amphitheater && t('Amphitheater')} {elm?.stage && 'Stage'}</p>
                                            <div>
                                                <p>{t('Line')}: {elm.row}</p>
                                                <p>{t('Place')}: {elm.seat}</p>
                                            </div>
                                        </div>
                                        <p className='TicketPrcie'>{elm.price} AMD</p>
                                        <div className='ClewarTicet' onClick={() => dispatch(RemoveTicketsAction(elm))}>
                                            <ClearSvg />
                                        </div>
                                    </div>
                                </div>
                            })
                        }


                        <div className='TotalPrice'>
                            <p className='Totalp'>ԸՆԴԱՄԵՆԸ</p>
                            <p className='ToatalPricep'>{total} AMD</p>
                        </div>
                        <div className='totalLine' />
                        {tickets?.tickets?.length && <div className='BuyTicketButtonWrapper'>
                            <button onClick={() => setOpen(true)}>Հաջորդ</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        <div>
            {
                recomended?.length > 0 &&
                <div className='EventTitle'>
                    <h2>{t('RecommendTickets')}</h2>
                    <div className='RecDiv'>
                        {recomended.map((elm, i) => {
                            return <TopEvents
                                key={i}
                                image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                                title={elm?.title}
                                category={elm.category}
                                location={elm?.sessions[0]?.hallId?.location}
                                location_en={elm?.sessions[0]?.hallId?.location_en}
                                location_ru={elm?.sessions[0]?.hallId?.location_ru}
                                data={elm}
                                price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
                            />
                        })}
                    </div>
                </div>
            }
        </div>
    </div >
}