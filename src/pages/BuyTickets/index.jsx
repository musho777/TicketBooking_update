import { useEffect, useState } from 'react';
import { CalendarSvg, ClearSvg, LocationSvg, LocationSvg1, Restart } from '../../components/svg'
import { ZoomMap } from '../../components/ZoomMap/ZoomMap'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { TopEvents } from '../../components/TopEvents/TopEvents';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GetSinglPage } from '../../services/action/action';
export const BuyTickets = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const getSinglPage = useSelector((st) => st.getSinglPage)
    let { recomended } = getSinglPage?.events

    const [scale, setScale] = useState(1);
    const handleZoomIn = () => {
        setScale(scale * 1.2);
    };

    const handleZoomOut = () => {
        setScale(scale / 1.2);
    };
    useEffect(() => {
        dispatch(GetSinglPage(id))
    }, [])


    return <div className='container'>
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
                    <ZoomMap setScale={(e) => setScale(e)} scale={scale} handleZoomIn={() => handleZoomOut()} handleZoomOut={() => handleZoomOut} />
                </div>
            </div>
            <div className='BuyTicketsCardWrapper'>
                <div className='BuyTicketsCard'>
                    <img src={require('../../assets/4.png')} />
                    <div className='BuyTicketsCardInfo'>
                        <div>
                            <p className='BuyTicketTitle'>միխայիլ շուֆուտինսկի</p>
                            <p className='BuyTickeDescription'>հոբելյանական համերգ</p>
                        </div>
                        <div className='BuyTicketDate'>
                            <CalendarSvg />
                            <p className='BuyTicketDateMonth'>17 Հունվար </p>
                            <div></div>
                            <p className='BuyTicketDateTime'>19:00</p>
                        </div>
                        <div className='BuyTicketDateLocation'>
                            <LocationSvg1 />
                            <p>Կարեն Դեմիրճյանի անվան
                                մարզահամերգային համալիր</p>
                        </div>
                    </div>
                </div>
                <div className='Tickets'>
                    <div className='TicketsHeader'>
                        <p>Տոմս</p>
                        <p>Գինը</p>
                    </div>
                    <div className='TicketBody'>
                        <div className='TikcetsWrapper'>
                            <div className='TicketDiv'>
                                <div className='TicketInfoo'>
                                    <p>Պարտեր</p>
                                    <div>
                                        <p>Շարք: 9</p>
                                        <p>Տեղ: 7</p>
                                    </div>
                                </div>
                                <p className='TicketPrcie'>7000 AMD</p>
                                <div className='ClewarTicet'>
                                    <ClearSvg />
                                </div>
                            </div>
                        </div>
                        <div className='TotalPrice'>
                            <p className='Totalp'>ԸՆԴԱՄԵՆԸ</p>
                            <p className='ToatalPricep'>7000 AMD</p>
                        </div>
                        <div className='totalLine' />
                        <div className='BuyTicketButtonWrapper'>
                            <button>Հաջորդ</button>
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
                            return <TopEvents
                                key={i}
                                image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                                title={elm.title}
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
    </div>
}