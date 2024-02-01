import './styles.css'
import { Button } from '../Button'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { BanerRightSvg, LocationSvg } from '../svg'
import { useTranslation } from 'react-i18next'


const handleDragStart = (e) => e.preventDefault()

export const Carusel = () => {
    const navigation = useNavigate()
    const general = useSelector((st) => st.general)
    const { language } = useSelector((st) => st.StaticReducer)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const { t } = useTranslation();


    useEffect(() => {
        setData([])
    }, [language])

    useEffect(() => {
        let item = [...data]
        item = []
        if (!item.length) {
            let title = ''
            let description = ''
            let hall = ''
            let seeMore = ''
            let primera = ''
            let BuyNow = ''
            general?.events?.length > 0 && general?.events?.map((elm, i) => {
                console.log(elm)
                console.log(elm, 'elm')
                if (language === 'am') {
                    title = elm.eventId.title
                    description = elm.eventId?.description
                    primera = 'ՊՐԵՄԻԵՐԱ'
                    seeMore = 'տեսնել ավելին'
                    BuyNow = 'Գնիր հիմա'


                }
                else if (language === 'en') {
                    title = elm.eventId.title_en
                    description = elm.eventId?.description_en
                    primera = 'PREMIERE'
                    seeMore = 'see more'
                    BuyNow = 'Buy Now'



                }
                else if (language === 'ru') {
                    title = elm.eventId.title_ru
                    description = elm.eventId?.description_ru
                    primera = 'ПРЕМЬЕРА'
                    seeMore = 'узнать больше'
                    BuyNow = 'Купить сейчас'
                }
                const dateObject = new Date(elm?.date)
                let dayOfWeek = dateObject.getDate()
                const year = dateObject.getFullYear()
                let month = dateObject.getMonth() + 1
                let minute = dateObject.getMinutes()
                if (dayOfWeek <= 9) {
                    dayOfWeek = `0${dayOfWeek}`
                }
                if (month <= 9) {
                    month = `0${month}`
                }

                if (minute < 9) {
                    minute = `0${minute}`
                }
                item.push(
                    <div key={i} className='CaruselItem'>
                        <div className='BanerDiv' >
                            <img
                                className='BanerImg2'
                                src={`${process.env.REACT_APP_IMAGE}/${elm?.eventId?.largeImage}`}
                            />
                            <div className='BanerDivInfo'>
                                <div className='BanerPrimera'>
                                    <div className='Primera'>
                                        <p className='Primerap'>{primera}</p>
                                        <p className='PrimeraDate'>{month}-{dayOfWeek} {elm.time}</p>
                                    </div>
                                    <div className='BanerLocation'>
                                        <LocationSvg />
                                        <p className='BanerDivInfoPlace'>Arno Babajanyan Concert Hall</p>
                                    </div>
                                </div>
                                <p className='BanerTitle'>{title}</p>
                                <div className='BanerPrimeraMobile'>
                                    <div className='Primera'>
                                        <p className='Primerap'>{primera}</p>
                                        <p className='PrimeraDate'>{month}-{dayOfWeek} {elm.time}</p>
                                    </div>
                                    <div className='BanerLocation'>
                                        <LocationSvg />
                                        <p className='BanerDivInfoPlace'>Arno Babajanyan Concert Hall</p>
                                    </div>
                                </div>
                                <div className='BanerTextDiv'>
                                    <p className='BanerText'>{description}</p>
                                    {/* <p className='BanerText'>Լյուդովիկո Էյնաուդի, Հանս Ցիմեր, Մաքս Ռիխտեր, Օլավյուր Արնալդս, Էնյա</p> */}
                                </div>

                                <p className='BanerPrice'>{elm.priceStart}-{elm.priceEnd} AMD</p>
                                <div className='BanerButton'>
                                    <Button title={BuyNow} />
                                    <p>{seeMore}</p>
                                </div>
                            </div>
                        </div>
                        <img
                            className='BanerImg'
                            src={`${process.env.REACT_APP_IMAGE}/${elm?.eventId?.largeImage}`}
                            alt='#'
                            onDragStart={handleDragStart}
                        />
                    </div>
                )
            })
        }
        setData(item)
    }, [general.events, language])
    return (
        <div>
            {/* <div>
                <BanerRightSvg />
            </div> */}
            <AliceCarousel
                disableButtonsControls={true}
                autoPlay={data.length > 1}
                mouseTracking
                items={data}
                infinite={data.length > 1}
                touchMoveDefaultEvents
                autoPlayInterval={5500}
            />
        </div>
    );
}