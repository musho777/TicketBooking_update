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
            general?.events?.length > 0 && general?.events?.map((elm, i) => {
                if (language === 'am') {
                    title = elm.title
                    description = elm.eventId?.description
                }
                else if (language === 'en') {
                    title = elm.title_en
                    description = elm.eventId?.description_en
                }
                else if (language === 'ru') {
                    title = elm.title_ru
                    description = elm.eventId?.description_ru
                }
                const dateObject = new Date(elm?.eventId?.date)
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
                                        <p className='Primerap'>ՊՐԵՄԻԵՐԱ</p>
                                        <p className='PrimeraDate'>ՀՈՒՆՎԱՐ 24 19։00</p>
                                    </div>
                                    <div className='BanerLocation'>
                                        <LocationSvg />
                                        <p className='BanerDivInfoPlace'>Arno Babajanyan Concert Hall</p>
                                    </div>
                                </div>
                                <p className='BanerTitle'>Նեոկլասիկայի Տիեզերքը</p>
                                <div className='BanerPrimeraMobile'>
                                    <div className='Primera'>
                                        <p className='Primerap'>ՊՐԵՄԻԵՐԱ</p>
                                        <p className='PrimeraDate'>ՀՈՒՆՎԱՐ 24 19։00</p>
                                    </div>
                                    <div className='BanerLocation'>
                                        <LocationSvg />
                                        <p className='BanerDivInfoPlace'>Arno Babajanyan Concert Hall</p>
                                    </div>
                                </div>
                                <div className='BanerTextDiv'>
                                    <p className='BanerText'>Ժամանակից դուրս երաժշտություն, որը կարող են գնահատել բոլոր սերունդները.
                                        այսպիսին է Տիգրան Բերկելյանի «Նեոկլասիկայի տիեզերքը» համերգը։
                                        Հրավիրում ենք ձեզ Տիգրանի հետ միասին ճամփորդել դեպի
                                        Նորին մեծություն երաժշտության աշխարհ:</p>
                                    <p className='BanerText'>Լյուդովիկո Էյնաուդի, Հանս Ցիմեր, Մաքս Ռիխտեր, Օլավյուր Արնալդս, Էնյա</p>
                                </div>

                                <p className='BanerPrice'>1500-2000 AMD</p>
                                <div className='BanerButton'>
                                    <Button title={t('BuyNew')} />
                                    <p>տեսնել ավելին</p>
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