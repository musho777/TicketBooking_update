import './style.css'
import { useEffect, useState } from 'react'
import { SearchInput } from '../SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ActiveArrowSvg, ArrowSvg, CloseSvg, MenuSvg, MobileMenu, PhonSvg, Search, SearchMobileSvg, SearchSvg, Translate, WorldSvg } from '../svg'
import { ChangeLanguageAction, GetCategory, OpenCaldendar, OpenCategoryMenu, SearchAction } from '../../services/action/action'
import { PuffLoader } from 'react-spinners'
import { MobileMenuComponent } from '../MobileMenu'

export const Header = ({ open, menu }) => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const search = useSelector((st) => st.search)
    const openMenu = useSelector((st) => st.StaticReducer)
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)
    const [serchInput, setSearchInput] = useState(false)
    const [openLanguage, setOpenLanguage] = useState(false)
    const [value, setValue] = useState('')
    const [openMenuMobile, setOpenMenuMobile] = useState(false)

    document.body.addEventListener('click', function () {
        setOpenLanguage(false)
        setSearchInput(false)

    });

    const { id } = useParams()
    useEffect(() => {
        dispatch(SearchAction(value))
    }, [value, dispatch])

    useEffect(() => {
        dispatch(GetCategory())
    }, [dispatch])
    return (
        <div className='header'>
            <div className='MainHeaderDiv'>
                <div className='MainHeader'>
                    <div onClick={() => navigation('/')}>
                        <img className='Logo' src={require('../../assets/logo.png')} />
                    </div>
                    <div className='textWrapper'>
                        {getCategory.category.map(elm => {
                            let bg = ''
                            if (elm._id === "65722b047d066ae13510acd7") {
                                bg = '#FF6969'
                            }
                            else if (elm._id === "657b00c67a91070546630967") {
                                bg = '#D943FF'
                            }
                            else if (elm._id === "6581e2425bf51638abd3f9ee") {
                                bg = '#11AEF4'
                            }
                            else if (elm._id === "6581e26c5bf51638abd3f9f8") {
                                bg = '#FFCE00'
                            }
                            else if (elm._id === "6581e28f5bf51638abd3fa02") {
                                bg = '#4DCF5F'
                            }

                            else {
                                bg = '#11AEF4'
                            }
                            let title = ''
                            if (language === 'am') {
                                title = elm.name
                            } else if (language === 'en') {
                                title = elm.name_en
                            } else if (language === 'ru') {
                                title = elm.name_ru
                            }
                            return <div className='CateogryName'>
                                <p onClick={() => navigation(`/Category/${elm.name}/${elm?._id}`)} className='Headertext'>{title}</p>
                                <div
                                    className={id == elm?._id ? 'activeHeader' : 'notActiveHeader'}

                                    style={id == elm?._id ? { backgroundColor: bg } : {}}

                                />
                            </div>
                        })}
                    </div>
                    <div className='HeaderInfo'>
                        <div className='SearchDiv'>
                            <div className='SearchInputSvg'>
                                <SearchSvg />
                            </div>
                            <input placeholder='Փնտրել միջոցառում' className='SearchInput' />
                        </div>
                        <div className='ButtonWrapperHeader'>
                            <button className='phonNumber'>
                                <PhonSvg />
                                ԱՆՎՃԱՐ ԱՌԱՔՈՒՄ
                            </button>
                        </div>
                    </div>
                    <div
                        id={openLanguage ? 'openLanguage' : ''}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setOpenLanguage(true)
                        }
                        } className='LanguageDiv'>
                        <WorldSvg />
                        {localStorage.getItem('lang') === 'am'
                            ? <p>ՀԱՅ</p>
                            : localStorage.getItem('lang') === 'en'
                                ? <p>ENG</p>
                                : <p>РУС</p>
                        }
                        {openLanguage ?

                            <ActiveArrowSvg /> :
                            <ArrowSvg />
                        }
                        {openLanguage && <div className='SelectLanguage'>
                            <p onClick={() => dispatch(ChangeLanguageAction('am'))} >Հայերեն</p>
                            <p onClick={() => dispatch(ChangeLanguageAction('ru'))} >Русский</p>
                            <p onClick={() => dispatch(ChangeLanguageAction('en'))} >English</p>
                        </div>}
                    </div>
                    <div className='MobileHeader'>
                        <SearchMobileSvg />
                        <div onClick={() => setOpenMenuMobile(!openMenuMobile)}>
                            <MobileMenu />
                        </div>
                    </div>
                </div>
            </div>
            <div className='LineHeader' />
            {openMenuMobile && <MobileMenuComponent setOpen={() => setOpenMenuMobile(false)} />}
        </div >
    )
}