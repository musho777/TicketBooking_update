import { useDispatch, useSelector } from 'react-redux'
import { BlueSvg, OrangeSvg, PhonSvg, RedSvg, SportSvg, TetreSvg } from '../svg'
import './styles.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeLanguageAction } from '../../services/action/action'
export const MobileMenuComponent = ({ setOpen }) => {
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    return <div className='Menu'>
        <p>ԲԱԺԻՆՆԵՐ</p>
        <div className='MenuWrapper'>
            <div className='MenuWrapperDiv'>
                {getCategory.category.map(elm => {
                    let div = ''
                    let bg = ''
                    if (elm._id === "65722b047d066ae13510acd7") {
                        div = <RedSvg />
                    }
                    else if (elm._id === "657b00c67a91070546630967") {
                        bg = '#D943FF'
                        div = <TetreSvg />

                    }
                    else if (elm._id === "6581e2425bf51638abd3f9ee") {
                        bg = '#11AEF4'
                        div = <BlueSvg />

                    }
                    else if (elm._id === "6581e26c5bf51638abd3f9f8") {
                        bg = '#FFCE00'
                        div = <OrangeSvg />

                    }
                    else if (elm._id === "6581e28f5bf51638abd3fa02") {
                        bg = '#4DCF5F'
                        div = <SportSvg />

                    }

                    else {
                        bg = '#11AEF4'
                        div = <SportSvg />
                    }
                    let title = ''
                    if (language === 'am') {
                        title = elm.name
                    } else if (language === 'en') {
                        title = elm.name_en
                    } else if (language === 'ru') {
                        title = elm.name_ru
                    }
                    return <div className='MobileMenuWrapper'>
                        {div}
                        <p onClick={() => {
                            setOpen(false)
                            navigation(`/Category/${elm.name}/${elm?._id}`)
                        }}
                            className='MenuHeadertext'>{title}</p>
                    </div>
                })}
            </div>
            <div className='ButtonWrapperHeader'>
                <button className='phonNumber'>
                    <PhonSvg />
                    ԱՆՎՃԱՐ ԱՌԱՔՈՒՄ
                </button>
            </div>
            <div className='LineMobileMenu' />
            <div className='MobielLanguage'>
                <p onClick={() => dispatch(ChangeLanguageAction('am'))} className={localStorage.getItem('lang') === 'am' && 'activeLanguageMobile'}>ՀԱՅ</p>
                <p onClick={() => dispatch(ChangeLanguageAction('en'))} className={localStorage.getItem('lang') === 'en' && 'activeLanguageMobile'}>ENG</p>
                <p onClick={() => dispatch(ChangeLanguageAction('ru'))} className={localStorage.getItem('lang') === 'ru' && 'activeLanguageMobile'}>РУС</p>
            </div>
        </div>
    </div >
}