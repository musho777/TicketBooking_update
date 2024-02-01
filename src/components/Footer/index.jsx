import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FbSvg, InstagramSvg, MobilFb, MobileI, MobileT, TwitterSvg } from '../svg'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { GetFeedback } from '../../services/action/action'

export const Footer = ({ menu }) => {
    const navigation = useNavigate()
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)
    const { Event_reducer } = useSelector((st) => st)

    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(GetFeedback())
    }, [dispatch])

    console.log(Event_reducer.feedback?.instagram, 'Event_reducer')

    return (
        <div className='footerWrapper'>
            <div className='container' id='footerWrapperDiv'>
                <div className='footerColumns'>
                    <img src={require('../../assets/logo2.png')} />
                    <p className=''>SHINE TICKETS LLC thanks its Partners for Cooperation and for their Support. Privacy Policy / © 2024 / All Rights Reserved</p>
                </div>
                <div className='footerColumnsWrapper'>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>Կապվեք մեզ հետ</p>
                        <div className='footerColumnsInfo'>
                            <p>+374 93 55 88 44</p>
                            <p>info@shineticket.com</p>
                        </div>
                    </div>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>Բաժիններ</p>
                        <div className='footerColumnsInfo'>
                            {getCategory.category.map(elm => {
                                let title = ''
                                if (language === 'am') {
                                    title = elm.name
                                } else if (language === 'en') {
                                    title = elm.name_en
                                } else if (language === 'ru') {
                                    title = elm.name_ru
                                }
                                return <p onClick={() => navigation(`/Category/${elm.name}/${elm?._id}`)}>
                                    {title}
                                </p>
                            })}
                        </div>
                    </div>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>Մենք սոց. ցանցերում </p>
                        <div className='Social'>
                            <div onClick={() => window.open(`${Event_reducer.feedback?.instagram}`, "_blank")}>
                                <InstagramSvg />
                            </div>
                            <div onClick={() => window.open(`${Event_reducer.feedback?.facebook}`, "_blank")}>
                                <FbSvg />
                            </div>
                            <div onClick={() => window.open(`${Event_reducer.feedback?.twitter}`, "_blank")}>
                                <TwitterSvg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' id='mobileFotter'>

                <div className='footerColumnsWrapper'>
                    <div className='footerColumnsWrapperDiv'>
                        <div className='footerColumnsWrapperDivMObile'>
                            <p className='footerColumnsTitle'>Կապվեք մեզ հետ</p>
                            <div className='footerColumnsInfo'>
                                <p>+374 93 55 88 44</p>
                                <p>info@shineticket.com</p>
                            </div>
                        </div>
                        <div className='footerColumnsWrapperDiv'>
                            <p className='footerColumnsTitle'>Մենք սոց. ցանցերում </p>
                            <div className='Social'>
                                <InstagramSvg />
                                <FbSvg />
                                <TwitterSvg />
                            </div>
                        </div>
                    </div>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>Բաժիններ</p>
                        <div className='footerColumnsInfo'>
                            {getCategory.category.map(elm => {
                                let title = ''
                                if (language === 'am') {
                                    title = elm.name
                                } else if (language === 'en') {
                                    title = elm.name_en
                                } else if (language === 'ru') {
                                    title = elm.name_ru
                                }
                                return <p onClick={() => navigation(`/Category/${elm.name}/${elm?._id}`)}>
                                    {title}
                                </p>
                            })}
                        </div>
                    </div>

                </div>
                <div className='footerColumns'>
                    <img src={require('../../assets/logo2.png')} />
                    <p className=''>SHINE TICKETS LLC thanks its Partners for Cooperation and for their Support. Privacy Policy / © 2024 / All Rights Reserved</p>
                </div>
            </div>
        </div >
    )
}