import './styles.css'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BuyNow } from '../../components/BuyNow'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { CartPopup } from '../../components/popup/cart'
import { CardSlider } from '../../components/CardSlider'
import { GetSinglPage } from '../../services/action/action'
import AramKhachatryan from '../../components/photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../../components/photoMap'
import KarenDemerchyanMec from '../../components/photoMap/Karendemrjyanmec'
import { Hall } from '../../components/photoMap/Hall'

export const Single = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { t } = useTranslation();
    const getSinglPage = useSelector((st) => st.getSinglPage)
    const { language } = useSelector((st) => st.StaticReducer)
    let { event } = getSinglPage?.events
    let { recomended } = getSinglPage?.events
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openBuy, setOpenBuy] = useState(false)
    const tickets = useSelector((st) => st.tiketsForBuy)
    const [languageData, setLanguageData] = useState({ title: '', description: '' })
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(GetSinglPage(id))
    }, [])
    const [date, setDate] = useState()


    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = event?.title
            item.description = event?.description
        }
        else if (language === 'en') {
            item.title = event?.title_en
            item.description = event?.description_en
        }
        else if (language === 'ru') {
            item.title = event?.title_ru
            item.description = event?.description_ru

        }
        setLanguageData(item)
    }, [language, event])
    useEffect(() => {
        const dateObject = new Date(getSinglPage?.events?.event?.sessions[0]?.date);
        let day = dateObject.getDate();
        let month = dateObject.getMonth() + 1;
        let year = dateObject.getFullYear()

        if (day <= 9) {
            day = `0${day}`
        }
        if (month <= 9) {
            month = `0${month}`
        }
        setDate(`${day}-${month}-${year}, ${getSinglPage?.events?.event?.sessions[0]?.time}`)
    }, [getSinglPage])
    if (getSinglPage.loading) {
        return (
            <div className='loading'>
                <PuffLoader color="#FEE827" />
            </div>
        )
    }
    return (
        <div className='single'>
            {openPopUp &&
                <div className='ByTicketWrapper'>
                    <CartPopup
                        open={openPopUp}
                        openBuy={openBuy}
                        setOpen={setOpenPopUp}
                        type='hall'
                        openCard={() => {
                            if (tickets.tickets.length) {
                                setOpenBuy(true)
                            }
                        }}
                    >
                        {/* <Hall buy={() => setOpenBuy(true)} /> */}
                        {event.sessions[0]?.hallId._id === '652a6e93cebdd7a4ac8fc020' &&
                            <PhotoCoordinatesByColor eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
                        }
                        {event.sessions[0]?.hallId?._id === '653554d8709652928c006a15' &&
                            <KarenDemerchyanMec eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
                        }
                        {event.sessions[0]?.hallId?._id === '6535520e0dc8b78f78b56997' &&
                            <AramKhachatryan eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
                        }
                        {event.sessions[0]?.hallId?._id === '653563a0369cf9fb4627aaf8' &&
                            <Hall buy={() => setOpenBuy(true)} section={getSinglPage.events.event?.sessions[0]?.price} />
                        }

                    </CartPopup>
                </div>
            }
            {openBuy &&
                <CartPopup
                    open={openBuy}
                    type='openBuy'
                    setOpen={setOpenBuy}
                >
                    <BuyNow />
                </CartPopup >

            }
            <div className='SinglDescription'>
                <div className='singlImg'>
                    <img src={`${process.env.REACT_APP_IMAGE}/${event?.image}`} alt='' />
                </div>
                <div className='singltextWrapper'>
                    <div>
                        <p className='dateDD'>{date}</p>
                        <div>Karen Demerchyan</div>
                        <p className='singlTitle'>{languageData?.title}</p >
                    </div>
                    <p className='singelText'>{languageData?.description}</p>
                    <div className='buttonWrapperSingl'>
                        <Button title={t('BuyNow')} onClick={() => setOpenPopUp(true)} />
                    </div>
                </div>
            </div>
            {
                recomended?.length > 0 &&
                <div className='EventTitle' style={{ flexDirection: 'column', marginBottom: 40 }}>
                    <h2 style={{ margin: "50px  0" }}>{t('RecommendTickets')}</h2>
                    <div className='topEventsMain'>
                        <CardSlider data={recomended} />
                    </div>
                </div>
            }
        </div >
    )
}