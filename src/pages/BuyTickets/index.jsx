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
    const [data, setData] = useState({ name: '', description: '', hall: '' })
    let { event } = getSinglPage?.events
    const [open, setOpen] = useState(false)
    const [paronyanSeans, setParonyanSeans] = useState('')

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
    const [scale, setScale] = useState(1);
    const handleZoomIn = () => {
        setValue({
            scale: value.scale + 0.4,
            translation: value.translation

        })
    };
    const returnTickets = () => {

        const keys = "hYDepOnSarMi";
        const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
        const requestType = "backTickets";
        const params = {
            group_id: "12",
            timeline_id: paronyanSeans,
            event_id: getSinglPage?.events?.event?.ParonyanEventId,
            order_id: "442"
        };

        const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

        sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();

        const data = {
            "data": [
                {
                    "LevelId": "3",
                    "Places": [
                        {
                            "Row": "1",
                            "Seat": "1"
                        },
                        {
                            "Row": "1",
                            "Seat": "2"
                        },
                    ]
                },
            ]
        };
        sortedParams.data = JSON.stringify(data);


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(sortedParams)
        };

        fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    useEffect(() => {
        returnTickets()
    }, [])

    const tickets = useSelector((st) => st.tiketsForBuy)

    const [total, setTotal] = useState(0)
    const [value, setValue] = useState({
        scale: 0.4,
        translation: { x: 90, y: 35 }
    });


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
                // backBookTikets()
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
        <div className='BuyTicketsWrapper'>
            {!getSinglPage.events?.event
                ?.isParonyanEvent ?

                <div className='BuyTicketsCard' id='mobileBuyTicketsCard'>
                    <img src={`${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`} />
                    <div className='BuyTicketsCardInfo'>
                        <div>
                            <p className='BuyTicketTitle'>{data?.name}</p>
                            <p className='BuyTickeDescription'>{truncateText(data?.description)}</p>
                        </div>
                        <div className='BuyTicketDate'>
                            <CalendarSvg1 />
                            <p className='BuyTicketDateMonth'>{new Date(getSinglPage.events.event?.sessions[0]?.date).getDate()}.{new Date(getSinglPage.events.event?.sessions[0]?.date).getMonth() + 1}.{new Date(getSinglPage.events.event?.sessions[0]?.date).getFullYear()} </p>
                            <div></div>
                            <p className='BuyTicketDateTime'>{getSinglPage.events.event?.sessions[0]?.time}</p>
                        </div>
                        <div className='BuyTicketDateLocation'>
                            <LocationSvg1 />
                            <p>{data.hall}</p>
                        </div>
                    </div>
                </div> :
                <div className='BuyTicketsCard' id='mobileBuyTicketsCard'>
                    <img src={getSinglPage.events.event.ParonyanImg} />
                    <div className='BuyTicketsCardInfo'>
                        <div>
                            <p className='BuyTicketTitle'>{truncateText(getSinglPage.events.event.ParonyanName)}</p>
                            <p className='BuyTickeDescription'>{truncateText(getSinglPage.events.event?.ParonyanText?.replace(/<\/?p>/g, ''))}</p>
                        </div>
                        <div className='BuyTicketDate'>
                            <CalendarSvg1 />
                            <p id="paronyan" className='BuyTicketDateMonth' dangerouslySetInnerHTML={{ __html: getSinglPage.events.event?.ParonyanTime }} />
                            <div></div>
                        </div>
                        <div className='BuyTicketDateLocation'>
                            <LocationSvg1 />
                            <p>{getSinglPage.events.event.ParonyanGroup_name}</p>

                        </div>
                    </div>
                </div>
            }
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
                        value={value}
                        setValue={(e) => setValue(e)}
                        getSinglPage={getSinglPage}
                        paronyanSeans={paronyanSeans}
                        open={open}
                        isParonyanEvent={getSinglPage.events?.event
                            ?.isParonyanEvent}
                    />
                </div>
            </div>
            {!getSinglPage.events?.event
                ?.isParonyanEvent ?

                <div className='BuyTicketsCardWrapper'>
                    <div className='BuyTicketsCard'>
                        <img src={`${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`} />
                        <div className='BuyTicketsCardInfo'>
                            <div>
                                <p className='BuyTicketTitle'>{data.name}</p>
                                <p className='BuyTickeDescription'>{truncateText(data.description)}</p>
                            </div>
                            <div className='BuyTicketDate'>
                                <div>
                                    <CalendarSvg1 />
                                </div>
                                <p className='BuyTicketDateMonth'>{new Date(getSinglPage.events.event?.sessions[0]?.date).getDate()}.{new Date(getSinglPage.events.event?.sessions[0]?.date).getMonth() + 1}.{new Date(getSinglPage.events.event?.sessions[0]?.date).getFullYear()} </p>
                                <div className='LineBuyTicketDate'></div>
                                <p className='BuyTicketDateTime'>{getSinglPage.events.event?.sessions[0]?.time}</p>
                            </div>
                            <div className='BuyTicketDateLocation'>
                                <LocationSvg1 />
                                <p>{data.hall}</p>
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
                </div> : <div className='BuyTicketsCardWrapper'>
                    <div className='BuyTicketsCard'>
                        <img src={getSinglPage.events.event.ParonyanImg} />
                        <div className='BuyTicketsCardInfo'>
                            <div>
                                <p className='BuyTicketTitle'>{truncateText(getSinglPage.events.event.ParonyanName)}</p>
                                <p className='BuyTickeDescription'>{truncateText(getSinglPage.events.event?.ParonyanText?.replace(/<\/?p>/g, ''))}</p>
                            </div>
                            <div className='BuyTicketDate'>
                                <div>
                                    <CalendarSvg1 />
                                </div>
                                <p id="paronyan" className='BuyTicketDateMonth' dangerouslySetInnerHTML={{ __html: getSinglPage.events.event.ParonyanTime }} />
                            </div>
                            <div className='BuyTicketDateLocation'>
                                <LocationSvg1 />
                                <p>{getSinglPage.events.event.ParonyanGroup_name}</p>
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
            }
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