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
import { LocationSvg } from '../../components/svg'
import { TopEvents } from '../../components/TopEvents/TopEvents'

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
            <div className='container'>
                <div className='loading'>
                    <PuffLoader color="#FEE827" />
                </div>
            </div>
        )
    }
    return (
        <div id='singlPage' className='container'>
            <div className='SinglCaruselItem'>
                <div className='SinglBanerDiv' >
                    <img className='SiglBanerImg2' src={require('../../assets/4.png')} />
                    <div className='SinglBanerDivInfo'>
                        <div className='SinglBanerPrimera'>
                            <div className='SinglPrimera'>
                                <p className='SinglPrimerap'>ՊՐԵՄԻԵՐԱ</p>
                                <p className='SinglPrimeraDate'>ՀՈՒՆՎԱՐ 24 19։00</p>
                            </div>
                            <div className='SinglBanerLocation'>
                                <LocationSvg />
                                <p className='SinglBanerDivInfoPlace'>Arno Babajanyan Concert Hall</p>
                            </div>
                        </div>
                        <div>
                            <p className='SinglBanerTitle'>միխայիլ շուֆուտինսկի</p>
                            <div className='SinglBanerTextDiv'>
                                <p className='SinglBanerText'>ՀՈԲԵԼՅԱՆԱԿԱՆ ՀԱՄԵՐԳ</p>
                            </div>
                        </div>
                        <div className='SinglBanerPrimeraMobile'>
                            <div className='Primera'>
                                <p className='Primerap'>ՊՐԵՄԻԵՐԱ</p>
                                <p className='PrimeraDate'>ՀՈՒՆՎԱՐ 24 19։00</p>
                            </div>
                            <div className='BanerLocation'>
                                <LocationSvg />
                                <p className='BanerDivInfoPlace'>Arno Babajanyan Concert Hall</p>
                            </div>
                        </div>
                        <div className='SinglPriceDiv'>
                            <p className='SinglBanerPrice'>1500-2000 AMD</p>
                            <div className='SinglBanerButton'>
                                <Button title={t('BuyNew')} />
                                <p>տեսնել ավելին</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    className='SinglBanerImg'
                    src={require('../../assets/4.png')}
                    alt='#'
                />
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
    )
}