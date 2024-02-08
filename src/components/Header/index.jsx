import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ActiveArrowSvg, Arrow1, ArrowSvg, MobileMenu, PhonSvg, Search, SearchMobileSvg, SearchSvg, Translate, WorldSvg } from '../svg'
import { ChangeLanguageAction, GetCategory, SearchAction } from '../../services/action/action'
import { MobileMenuComponent } from '../MobileMenu'
import { useTranslation } from 'react-i18next'

export const Header = ({ open, menu }) => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const search = useSelector((st) => st.search)
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)
    const [serchInput, setSearchInput] = useState(false)
    const inputRef = useRef(null);
    const [openLanguage, setOpenLanguage] = useState(false)
    const [inputFocus, setINputFocus] = useState(false)
    const [value, setValue] = useState('')
    const [openMenuMobile, setOpenMenuMobile] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchResultData, setSearchResultDAta] = useState(false)
    const { t } = useTranslation()

    const searchRef = useRef()


    const feedback = useSelector(st => st.Event_reducer.feedback)
    const [openMobilsSearch, setOpenMobileSearch] = useState(false)
    const handleTouchStart = (e) => {
        e.preventDefault();
    };

    document.body.addEventListener('click', function () {
        setOpenLanguage(false)
        setSearchInput(false)
        setSearchResult(false)
        setOpenMobileSearch(false)

    });

    useEffect(() => {
        if (openMenuMobile) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'scroll';


        }
    }, [openMenuMobile])

    useEffect(() => {
        if (!openMobilsSearch) {
            setValue('')
        }
    }, [openMobilsSearch])

    function truncateText(text) {
        if (text?.length > 13) {
            return text.substring(0, 10) + '...';
        }
        else {
            return text;
        }
    }

    const { id } = useParams()
    useEffect(() => {
        if (value) {
            dispatch(SearchAction(value))
        }
    }, [value, dispatch])

    useEffect(() => {
        dispatch(GetCategory())
    }, [dispatch])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchResult) {
                setSearchResultDAta(true)

            }
        }, 300);



        if (!searchResult) {
            setSearchResultDAta(false)
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchResult]);

    useEffect(() => {
        if (searchResult) {
            inputRef.current.focus()
        }
        const timeoutId1 = setTimeout(() => {
            if (!searchResult) {
                setINputFocus(false)
            }
        }, 1200);
        return () => {
            clearTimeout(timeoutId1)
        };
    }, [searchResult])

    useEffect(() => {
        searchRef?.current?.focus()
    }, [openMobilsSearch])

    return (
        <div className='header'>
            <div className='MainHeaderDiv'>
                <div className='MainHeader'>
                    {!openMobilsSearch && <div onClick={() => navigation('/')}>
                        <img className='Logo' src={require('../../assets/logo.png')} />
                    </div>}
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

                            <input
                                ref={inputRef}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setINputFocus(true)
                                    setSearchResult(true)
                                }
                                } placeholder={t('Searchforanevent')}
                                id={inputFocus ? 'SearchInput' : ''}
                                className='SearchInput' />
                            <div id={searchResult ? 'SearchResultActive' : ''} className='SearchResult'>
                                {searchResultData && <div onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                }}>
                                    {value != '' && search.events.map((elm, i) => {
                                        let name = ''
                                        let description = ''
                                        if (language == 'am') {
                                            name = elm.title
                                            description = elm.description
                                        }
                                        else if (language == 'ru') {
                                            name = elm.title_ru
                                            description = elm.description_ru

                                        }
                                        else {
                                            name = elm.title_en
                                            description = elm.description_en

                                        }
                                        return <div
                                            onClick={() => window.location = `/single/${elm._id}`}
                                        >
                                            <div className='SearchResultDiv'>
                                                <div className='SearchResultDivInfo'>
                                                    <p>{truncateText(name)}</p>
                                                    <p className='SearchResultDivInfoMount'>{elm.sessions[0].date.slice(0, 10)}</p>
                                                </div>
                                                <div className='SearchResultDivInfoPrice'>
                                                    <p>{elm.sessions[0].priceStart}-{elm.sessions[0].priceEnd} AMD</p>

                                                </div>
                                            </div>
                                            <div className='SearchResultDivLine' />

                                        </div>

                                    })}
                                </div>}
                                {search.events.length == 0 && <div className='notingNotFound'>
                                    <p>{t('NothingFound')}</p>
                                </div>}
                            </div>
                        </div>
                        <div className='ButtonWrapperHeader'>
                            <button onClick={() => {
                                window.location.href = `tel:${feedback.phone}`;
                            }} className='phonNumber'>
                                <PhonSvg />
                                {t('freeDelivery1')}
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
                    <div className='MobileHeaderWrapper'>
                        {!openMobilsSearch ?

                            <div className='MobileHeader'>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setOpenMobileSearch(true)
                                }}>
                                    <SearchMobileSvg />
                                </div>
                                <div onClick={() => setOpenMenuMobile(!openMenuMobile)}>
                                    <MobileMenu />
                                </div>
                            </div> :
                            <div className='MobileSearchINputWrapper'>
                                <div
                                    className='MobileSearchInputSvg'>
                                    <SearchSvg />
                                </div>
                                <input
                                    value={value}
                                    ref={searchRef}
                                    id={inputFocus ? 'SearchInput' : ''}
                                    onChange={(e) => setValue(e.target.value)}
                                    className='MobileSearchINput'
                                    onTouchStart={handleTouchStart}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setINputFocus(true)
                                        setSearchResult(true)
                                    }}
                                />
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                    }}
                                    id={searchResult ? 'SearchResultActive' : ''} className='SearchResult'>
                                    {searchResultData && <div>
                                        {value != '' && search?.events.map((elm, i) => {
                                            let name = ''
                                            let description = ''
                                            if (language == 'am') {
                                                name = elm.title
                                                description = elm.description
                                            }
                                            else if (language == 'ru') {
                                                name = elm.title_ru
                                                description = elm.description_ru

                                            }
                                            else {
                                                name = elm.title_en
                                                description = elm.description_en

                                            }
                                            return <div>
                                                <div className='SearchResultDiv'>
                                                    <div className='SearchResultDivInfo'>
                                                        <p>{truncateText(name)}</p>
                                                        <p>{truncateText(description)}</p>
                                                        <p className='SearchResultDivInfoMount'>{elm.sessions[0].date.slice(0, 10)}</p>
                                                    </div>
                                                    <div className='SearchResultDivInfoPrice'>
                                                        <p>{elm.sessions[0].priceStart}-{elm.sessions[0].priceEnd}  AMD</p>
                                                        <div onClick={() => window.location = `/single/${elm._id}`} className='SearchResultDivInfoPriceButton'>
                                                            <Arrow1 />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='SearchResultDivLine' />

                                            </div>

                                        })}
                                    </div>}
                                    {search?.events.length == 0 &&
                                        <div className='notingNotFound'>
                                            <p>{t('NothingFound')}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='LineHeader' />
            {openMenuMobile && <MobileMenuComponent setOpen={() => setOpenMenuMobile(false)} />}
        </div >
    )
}

// <div>
// <p>{t('NothingFound')}</p>
// </div>