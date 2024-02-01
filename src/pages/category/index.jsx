import './style.css'
import Stack from '@mui/material/Stack'
import 'react-date-range/dist/styles.css'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next'
import 'react-date-range/dist/theme/default.css'
import Pagination from '@mui/material/Pagination'
import { DateRangePicker } from 'react-date-range'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MultySelect } from '../../components/MultySelect'
import { CategoryMenu } from '../../components/CategoryMenu'
import { CategoryTicket } from '../../components/CategoryTicket'
import { CalendarSvg, FilterSvg, MFilter, MultysElectSvg } from '../../components/svg'
import { GetAllEvents, GetHall, GetParonyanEvents, OpenCaldendar, OpenCategoryMenu, SubCategory } from '../../services/action/action'
import { Calendar } from '../../components/Calendar'
import { TopEvents } from '../../components/TopEvents/TopEvents'
import { WeekEvents } from '../../components/WeekEvents'
import { ALLEvents } from '../../components/AllEvents'
import { TopEventsComponent } from '../../components/TopEvents'
import { CategoryCardWrapper } from './CategoryCardWrapper'

export const Category = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getAllEventes)
    const openMenu = useSelector((st) => st.StaticReducer)
    const { language } = useSelector((st) => st.StaticReducer)
    const getSubCategory = useSelector((st) => st.getSubCAtegory)
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [hallId, setHallId] = useState('')
    const [hallName, setHallName] = useState()
    const [hallDefaultName, setHallDefaultName] = useState('')
    const [subcategoryId, setSubcategoryId] = useState('')
    const [openCalendar, setOpenCalendar] = useState(false)
    const [activeButton, setActiveButton] = useState('Բոլորը')
    const [selectedDate, setSelectedDate] = useState([{ startDate: '', endDate: '', key: 'selection', },])
    const getCategory = useSelector((st) => st.getCategory)
    const [date, setDate] = useState('')
    const [height, setHeight] = useState(false)
    const [baner, setBaner] = useState(<div></div>)
    const { paronyanEvents } = useSelector((st) => st)
    useEffect(() => {
        dispatch(GetHall())
    }, [])
    useEffect(() => {
        HallName()
    }, [language])

    useEffect(() => {
        dispatch(GetHall())
        let date = new Date(selectedDate[0].endDate)
        let startDate = new Date(selectedDate[0].startDate)
        let statDate = ''
        let endDate = ''
        if (selectedDate[0].endDate) {
            endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
        if (selectedDate[0].startDate) {
            statDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
        }
        dispatch(GetAllEvents(page, {
            category: id, subcategory: subcategoryId, date: {
                startDate: statDate,
                endDate
            }, hall: hallId
        }))

        if (id == '657b00c67a91070546630967') {
            dispatch(GetParonyanEvents())
        }
    }, [selectedDate, id, subcategoryId, page, hallId])

    useEffect(() => {

        dispatch(SubCategory({ id: id }))
        setActiveButton('Բոլորը')
        setSubcategoryId('')
        setHallId('')
        setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
        if (id == '65722b047d066ae13510acd7') {
            setBaner(
                <div className='CategoryBaner'>
                    <div id='C' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ՀԱՄԵՐԳ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Concert.png')} />
                </div>
            )
        }
        else if (id == '6581e2425bf51638abd3f9ee') {
            setBaner(
                <div className='CategoryBaner'>
                    <div id='O' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ՕՊԵՐԱ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Opera.png')} />
                </div>
            )
        }
        else if (id == '6581e26c5bf51638abd3f9f8') {
            setBaner(
                <div className='CategoryBaner'>
                    <div id='K' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ԿԻՆՈ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Cinema.png')} />
                </div>
            )
        }
        else if (id == '657b00c67a91070546630967') {
            setBaner(
                <div className='CategoryBaner'>
                    <div id='T' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ԹԱՏՐՈՆ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Teater.png')} />
                </div>
            )
        }
        else if (id == '6581e28f5bf51638abd3fa02') {
            setBaner(
                <div className='CategoryBaner'>
                    <div id='A' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ՍՊՈՐՏ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Oter.png')} />
                </div>
            )
        }
        else {
            setBaner(
                <div className='CategoryBaner'>
                    {/* <div id='K' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ԿԻՆՈ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Cinema.png')} /> */}
                </div>
            )
        }

    }, [id])


    useEffect(() => {
        let start = {}
        let end = {}
        let month = ''
        let day = ''
        let year = ''
        let month1 = ''
        let day1 = ''
        let year1 = ''

        if (selectedDate[0].startDate) {
            start = new Date(selectedDate[0].startDate)
            month = start.getMonth() + 1;
            day = start.getDate();
            year = start.getFullYear();
        }
        if (selectedDate[0].endDate) {
            end = new Date(selectedDate[0].endDate)
            month1 = end.getMonth() + 1;
            day1 = end.getDate();
            year1 = end.getFullYear();
        }
        if (month > 0 && month < 10) {
            month = `0${month}`
        }
        if (day > 0 && day < 10) {
            day = `0${day}`
        }
        if (month1 > 0 && month1 < 10) {
            month1 = `0${month1}`
        }
        if (day1 > 0 && day1 < 10) {
            day1 = `0${day1}`
        }
        setDate(`
            ${month}.${day}.${year} - ${month1}.${day1}.${year1}
        `)
    }, [selectedDate])

    if (openMenu?.categoryMenu) {
        return <CategoryMenu onClick={(e) => {
            setHallId(e?._id)
        }} item={events.hall} close={() => setOpen(!open)} />
    }
    if (openMenu?.openCalendar) {
        return <Calendar
            selectedDate={selectedDate}
            setSelectedDate={(e) => setSelectedDate(e)}
            close={() => dispatch(openCalendar(false))}
        />
    }

    document.body.addEventListener('click', function () {
        setOpenCalendar(false)
        setHeight(false)
    });


    const HallName = () => {
        if (hallId == '') {
            if (language === 'ru') {
                setHallName('Все залы')
            }
            if (language === 'am') {
                setHallName('Բոլոր դահլիճները')
            } if (language === 'en') {
                setHallName('All halls')
            }
        }
        if (language === 'ru') {
            setHallDefaultName('Все залы')
        }
        if (language === 'am') {
            setHallDefaultName('Բոլոր դահլիճները')
        } if (language === 'en') {
            setHallDefaultName('All halls')
        }
    }
    function truncateText(text) {
        if (text?.length > 13) {
            return text.substring(0, 10) + '...';
        } else {
            return text;
        }
    }

    return (
        <div className='CategoryScreen'>
            {baner}
            <div className='container'>
                <div className='FilterDiv'>
                    <div className='CalendarDiv'>
                        <div >
                            <p className='FilterDivTitle'>Ամսաթիվ</p>
                            <div className='CalendarWrapper'>
                                <div onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setOpenCalendar(true)
                                }
                                } className='CalendarDivCalendar'>
                                    <p>{date}</p>
                                </div>
                                <div className='CalendarDiV'>
                                    {openCalendar && <Calendar
                                        selectedDate={selectedDate}
                                        setSelectedDate={(e) => setSelectedDate(e)}
                                        close={() => dispatch(openCalendar(false))}
                                    />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='FilterDivTitle'>Վայր</p>
                            <div style={{ borderBottomLeftRadius: height && 0, borderBottomRightRadius: height && 0 }} onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setHeight(!height)
                            }} className='CalendarDivCalendar'>
                                <p>{hallName ? truncateText(hallName) : truncateText(hallDefaultName)}</p>
                                <div style={{ height: height ? 200 : 0 }} className='CalendarDivCalendaR'>
                                    <div
                                        onClick={() => {
                                            setHallId('')
                                            setHallName(hallDefaultName)
                                        }}
                                        className='getCategoryDiv'>{truncateText(hallDefaultName)}</div>
                                    {height && getCategory.hall.map((elm, i) => {
                                        if (language == 'en') {
                                            return <div onClick={() => {
                                                setHallId(elm._id)
                                                setHallName(elm.hall_en)
                                            }} className='getCategoryDiv'>{truncateText(elm.hall_en)}</div>
                                        }
                                        else if (language == 'am') {
                                            return <div
                                                onClick={() => {
                                                    setHallId(elm._id)
                                                    setHallName(elm.hall)
                                                }}
                                                className='getCategoryDiv'>{truncateText(elm.hall)}</div>
                                        }
                                        else if (language == 'ru') {
                                            return <div
                                                onClick={() => {
                                                    setHallId(elm._id)
                                                    setHallName(elm.hall_ru)
                                                }}
                                                className='getCategoryDiv'>{truncateText(elm.hall_ru)}</div>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='FilterDivButton'>
                        <p className='FilterDivTitle'>Ժանր</p>
                        <div >
                            {getSubCategory?.data?.subcategories?.length > 0 &&
                                <button
                                    onClick={() => {
                                        setActiveButton('Բոլորը')
                                        setSubcategoryId('')
                                    }} id={activeButton == 'Բոլորը' && 'active'} className='SubCategoryButton'
                                >
                                    {t('All')}
                                </button>}
                            {getSubCategory?.data?.subcategories?.map((elm, i) => {
                                let name = ''
                                if (language === 'am') {
                                    name = elm?.name
                                }
                                else if (language === 'en') {
                                    name = elm?.name_en
                                }
                                else if (language === 'ru') {
                                    name = elm?.name_ru
                                }
                                return <button onClick={() => {
                                    setActiveButton(elm?.name)
                                    setSubcategoryId(elm?._id)
                                }} id={activeButton == elm?.name && 'active'} className='SubCategoryButton'>{name}</button>
                            })}
                        </div>

                    </div>
                </div>
                <CategoryCardWrapper paronyan={id == '657b00c67a91070546630967' ? paronyanEvents.events?.result : []} data={events} />
            </div>
        </div>
    )
}