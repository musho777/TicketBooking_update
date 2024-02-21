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
import { PuffLoader } from 'react-spinners';
import { MD5 } from 'crypto-js';

export const BuyTickets = () => {
    const ids = useParams()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const getSinglPage = useSelector((st) => st.getSinglPage)
    let { recomended } = getSinglPage?.events
    const { language } = useSelector((st) => st.StaticReducer)
    const [data, setData] = useState({ name: '', description: '', hall: '', place: '' })
    let { event } = getSinglPage?.events
    const [open, setOpen] = useState(false)
    const [paronyanSeans, setParonyanSeans] = useState('')
    const [date, setDate] = useState()
    const [id, setId] = useState('')
    useEffect(() => {
        const parts = ids.id.split(':');
        setId(parts[0])
        setParonyanSeans(parts[1])
    }, [ids])
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const handleZoomIn = () => {
        setValue({
            scale: value.scale + 0.1,
            translation: value.translation

        })
    };

    const tickets = useSelector((st) => st.tiketsForBuy)

    const [total, setTotal] = useState(0)
    const [value, setValue] = useState({
        scale: 0.206,
        translation: { x: 0, y: 0 }
    });


    useEffect(() => {
        if (event?.sessions[0]?.hallId?._id == '65ce79ca603a99ef4d2ba0a3') {
            setValue({
                scale: 0.206,
                translation: { x: 100, y: 0 }
            })
        }
        let date = new Date(event?.sessions[0]?.date)
        let mount = date.getMonth() + 1
        let day = date.getDate()
        if (mount < 10) {
            mount = `0${mount}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        setDate(`${day}.${mount}`)
    }, [event])


    const handleZoomOut = () => {
        if (value.scale - 0.1 > 0.1)
            setValue({
                scale: value.scale - 0.1,
                translation: value.translation
            })
    };
    useEffect(() => {
        if (id) {
            dispatch(GetSinglPage(id))
        }
    }, [id])
    useEffect(() => {
        let price = 0
        tickets.tickets?.map((elm, i) => {
            price += +elm.price
        })
        setTotal(price)
    }, [tickets])

    useEffect(() => {
        if (!getSinglPage.events?.event
            ?.isParonyanEvent) {
            let item = { ...data }

            if (language === 'am') {
                item.name = getSinglPage?.events?.event?.title
                item.description = getSinglPage.events.event?.description
                item.hall = getSinglPage.events.event?.sessions[0]?.hallId?.hall
                item.place = getSinglPage.events.event?.sessions[0]?.hallId?.place
            }
            else if (language === 'ru') {
                item.name = getSinglPage.events.event?.title_ru
                item.description = getSinglPage.events.event?.description_ru
                item.hall = getSinglPage.events.event?.sessions[0]?.hallId.hall_ru
                item.place = getSinglPage.events.event?.sessions[0]?.hallId?.place_ru

            }
            else if (language === 'en') {
                item.name = getSinglPage.events.event?.title_en
                item.description = getSinglPage.events.event?.description_en
                item.hall = getSinglPage.events.event?.sessions[0]?.hallId.hall_en
                item.place = getSinglPage.events.event?.sessions[0]?.hallId?.place_en

            }
            setData(item)
        }

    }, [language, getSinglPage])


    function truncateText(text) {
        if (text?.length > 13) {
            return text.substring(0, 10) + '...';
        } else {
            return text;
        }
    }
    if (getSinglPage?.loading) {
        return (
            <div className='loading'>
                <PuffLoader color="#FEE827" />
            </div>
        )
    }
    return <div className='container'>
        {open && <CartPopup
            open={open}
            type='openBuy'
            setOpen={() => {
                setOpen(false)
            }}
        >
            <BuyNow
                isParonyanEvent={getSinglPage.events?.event
                    ?.isParonyanEvent}
                paronyanSeans={paronyanSeans}
                event_id={getSinglPage?.events?.event?.ParonyanEventId}
                grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                open={open} />
        </CartPopup >}
        {id == '65d21c1851424e16acf107d4' && <div className='ticketPrice'>
            <div style={{ backgroundColor: '#ee9dd6' }}>10000</div>
            <div style={{ backgroundColor: '#18ff00' }}>15000</div>
            <div style={{ backgroundColor: "#79caff" }}>20000</div>
            <div style={{ backgroundColor: "#ff8d24" }}>25000</div>
            <div style={{ backgroundColor: "#dee362" }}>30000</div>
            <div style={{ backgroundColor: "#7d4e5a" }}>35000</div>
            <div style={{ backgroundColor: "#930b92" }}>40000</div>
            <div style={{ backgroundColor: "#5c99d4" }}>45000</div>
            <div style={{ backgroundColor: '#f43b45' }}>50000</div>
        </div>}
        <div className='BuyTicketsWrapper'>

            <div className='BuyTicketsCard' id='mobileBuyTicketsCard'>
                <img src={`${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`} />
                <div className='BuyTicketsCardInfo'>
                    <div>
                        <p className='BuyTicketTitle'>{data?.name}</p>
                        {/* <p className='BuyTickeDescription'>{truncateText(data?.description)}</p> */}
                    </div>
                    <div className='BuyTicketDate'>
                        <CalendarSvg1 />
                        <p className='BuyTicketDateMonth'>
                            {date}
                        </p>
                        <div></div>
                        <p className='BuyTicketDateTime'>{getSinglPage.events.event?.sessions[0]?.time}</p>
                    </div>
                    <div className='BuyTicketDateLocation'>
                        <LocationSvg1 />
                        <p>{data.place} {data.hall}</p>
                    </div>
                </div>
            </div>

            <div className='HallWrapper'>
                <div className="zoom-controls">
                    <button onClick={handleZoomIn}>+</button>
                    <button onClick={handleZoomOut}>-</button>
                    <button onClick={() => setValue({
                        scale: 0.13,
                        translation: { x: 70, y: 25 }
                    })}>
                        <Restart />
                    </button>
                </div>
                <div className='Hall'>
                    <ZoomMap
                        event={event}
                        value={value}
                        setValue={(e) => setValue(e)}
                        getSinglPage={getSinglPage}
                        paronyanSeans={paronyanSeans}
                        open={open}
                        isParonyanEvent={getSinglPage.events?.event?.isParonyanEvent}
                    />
                </div>
            </div>
            {id == '65d21c1851424e16acf107d4' && <div className='ticketPriceMobile'>
                <div style={{ backgroundColor: '#ee9dd6' }}>10000</div>
                <div style={{ backgroundColor: '#18ff00' }}>15000</div>
                <div style={{ backgroundColor: "#79caff" }}>20000</div>
                <div style={{ backgroundColor: "#ff8d24" }}>25000</div>
                <div style={{ backgroundColor: "#dee362" }}>30000</div>
                <div style={{ backgroundColor: "#7d4e5a" }}>35000</div>
                <div style={{ backgroundColor: "#930b92" }}>40000</div>
                <div style={{ backgroundColor: "#5c99d4" }}>45000</div>
                <div style={{ backgroundColor: '#f43b45' }}>50000</div>
            </div>}

            <div className='BuyTicketsCardWrapper'>
                <div className='BuyTicketsCard'>
                    <img src={`${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`} />
                    <div className='BuyTicketsCardInfo'>
                        <div>
                            <p className='BuyTicketTitle'>{data.name}</p>
                            {/* <p className='BuyTickeDescription'>{truncateText(data.description)}</p> */}
                        </div>
                        <div className='BuyTicketDate'>
                            <div>
                                <CalendarSvg1 />
                            </div>
                            <p className='BuyTicketDateMonth'>   {date} </p>
                            <div className='LineBuyTicketDate'></div>
                            <p className='BuyTicketDateTime'>{getSinglPage.events.event?.sessions[0]?.time}</p>
                        </div>
                        <div className='BuyTicketDateLocation'>
                            <LocationSvg1 />
                            <p>{data.place}  {data.hall}</p>
                        </div>
                    </div>
                </div>
                <div className='Tickets'>
                    <div className='TicketsHeader'>
                        <p>{t('Ticket')}</p>
                        <p>{t('Price')}</p>
                    </div>
                    <div className='TicketBody'>
                        {
                            tickets?.tickets?.map((elm, i) => {
                                return <div className='TikcetsWrapper'>
                                    <div className='TicketDiv'>
                                        <div className='TicketInfoo'>
                                            <p>{elm?.parterre && t('Parterre')} {elm?.lodge && t('Lodge')} {elm?.amphitheater && t('Amphitheater')} {elm?.stage && 'Stage'}</p>
                                            <div>
                                                <p>{t('Line')}: <span>{elm.row}</span></p>
                                                <p>{t('Place')}: <span>
                                                    {elm.seat}
                                                </span></p>
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
                            <p className='Totalp'>{t('TOTALLY')}</p>
                            <p className='ToatalPricep'>{total} AMD</p>
                        </div>
                        <div className='totalLine' />
                        <div className='BuyTicketButtonWrapper'>
                            <button
                                disabled={tickets?.tickets?.length == 0}
                                className={tickets?.tickets?.length == 0 && 'disableButton'} onClick={() => setOpen(true)}>{t('Next')}</button>
                        </div>
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
                            const dateObject = new Date(elm.sessions[0]?.date);
                            let day = dateObject.getDate();
                            let month = dateObject.getMonth();
                            var currentDayOfWeek = daysOfWeek[dateObject?.getDay()];
                            if (elm?.sessions.length)
                                return <TopEvents
                                    key={i}
                                    image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                                    title={elm?.title}
                                    category={elm.category}
                                    location={elm?.sessions[0]?.hallId?.location}
                                    location_en={elm?.sessions[0]?.hallId?.location_en}
                                    location_ru={elm?.sessions[0]?.hallId?.location_ru}
                                    data={elm}
                                    day={day}
                                    id={elm._id}
                                    time={elm?.sessions[0]?.time}
                                    months={months[month]}
                                    currentDayOfWeek={currentDayOfWeek}
                                    price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
                                />
                        })}
                    </div>
                </div>
            }
        </div>
    </div >
}

