import './styles.css'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useParams, useLocation, } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BuyNow } from '../../components/BuyNow'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { CartPopup } from '../../components/popup/cart'
import { CardSlider } from '../../components/CardSlider'
import { GetSinglPage, GetSinglParonyan } from '../../services/action/action'
import AramKhachatryan from '../../components/photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../../components/photoMap'
import KarenDemerchyanMec from '../../components/photoMap/Karendemrjyanmec'
import { Hall } from '../../components/photoMap/Hall'
import { LocationSvg } from '../../components/svg'
import { TopEvents } from '../../components/TopEvents/TopEvents'
import { Card } from './card'
import { ShowAllButton } from '../../components/Button/ShowAllButton'

export const Single = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const { id } = useParams()
    const { t } = useTranslation();
    const getSinglPage = useSelector((st) => st.getSinglPage)
    const { language } = useSelector((st) => st.StaticReducer)
    let { event } = getSinglPage?.events
    let { recomended } = getSinglPage?.events

    const [openPopUp, setOpenPopUp] = useState(false)
    const [openBuy, setOpenBuy] = useState(false)
    const tickets = useSelector((st) => st.tiketsForBuy)
    const [languageData, setLanguageData] = useState({ title: '', description: '', hall: '' })
    const [paronyan, setParonyan] = useState('')
    useEffect(() => {
        dispatch(GetSinglParonyan())
        const includesParonyan = location.pathname.includes('paronyan')
        setParonyan(includesParonyan)
        if (!includesParonyan) {
            dispatch(GetSinglPage(id))
        }
    }, [])
    const [date, setDate] = useState()

    console.log(getSinglPage.events
        , 'getSinglPage')
    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = event?.title
            item.description = event?.description
            item.hall = event?.sessions[0]?.hallId.hall
        }
        else if (language === 'en') {
            item.title = event?.title_en
            item.description = event?.description_en
            item.hall = event?.sessions[0]?.hallId.hall_en

        }
        else if (language === 'ru') {
            item.title = event?.title_ru
            item.description = event?.description_ru
            item.hall = event?.sessions[0].hallId.hall_ru
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
            <div className='container'>
                <div className='loading'>
                    <PuffLoader color="#FEE827" />
                </div>
            </div>
        )
    }
    return (
        <div id='singlPage' className='container'>
            {!paronyan ? <Card
                time={event?.sessions[0].time}
                img={`${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`}
                id={id}
                data={event?.sessions[0].date.slice(0, 10)}
                description={languageData.description}
                title={languageData?.title}
                priceEnd={`${event?.sessions[0].priceEnd} AMD`}
                priceStart={`${event?.sessions[0].priceStart} -`}
                hall={languageData.hall}
                onClick={() => window.location = `/BuyTickets/${id}`}
                largImage={
                    getSinglPage.events.event?.largeImage ? `${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.largeImage}` :
                        `${process.env.REACT_APP_IMAGE}/${getSinglPage.events.event?.image}`

                }
            /> : <Card
                time={''}
                img={getSinglPage.events.image}
                id={getSinglPage.events.id}
                data={getSinglPage.events.date}
                description={''}
                title={getSinglPage.events.title}
                priceEnd={''}
                priceStart={''}
                hall={getSinglPage.events.location}
                largImage={getSinglPage.events.image}
                onClick={() => window.location = `/BuyTickets/${id}`}
            />
            }
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
                        <div className="ShowAllButtonWrappr">
                            <ShowAllButton />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}