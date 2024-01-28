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
import { FilterSvg, MFilter, MultysElectSvg } from '../../components/svg'
import { GetAllEvents, GetHall, OpenCaldendar, OpenCategoryMenu, SubCategory } from '../../services/action/action'
import { Calendar } from '../../components/Calendar'

export const AllEvents = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getAllEventes)
    const openMenu = useSelector((st) => st.StaticReducer)
    const { language } = useSelector((st) => st.StaticReducer)
    const getSubCategory = useSelector((st) => st.getSubCAtegory)
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [hallId, setHallId] = useState('')
    const [title, setTitle] = useState(t('Hall'))
    const [subcategoryId, setSubcategoryId] = useState('')
    const [openCalendar, setOpenCalendar] = useState(false)
    const [activeButton, setActiveButton] = useState('Բոլորը')
    const [selectedDate, setSelectedDate] = useState([{ startDate: '', endDate: '', key: 'selection', },])

    document.body.addEventListener('click', function () {
        setOpenCalendar(false)
    });

    useEffect(() => {
        window.scrollTo(0, 0)
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
            category: id, subcategory: 'all', date: {
                startDate: statDate,
                endDate
            }, hall: hallId
        }))
    }, [selectedDate, id, subcategoryId, page, hallId])

    useEffect(() => {
        dispatch(SubCategory({ id: id }))
        setActiveButton('Բոլորը')
        setSubcategoryId('')
        setHallId('')
        setTitle('Hall')
        setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
    }, [id])
    if (openMenu?.categoryMenu) {
        return <CategoryMenu onClick={(e) => {
            setTitle(e.hall)
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

    return (
        <div className='category'>
            {
                <div onClick={() => {
                    setOpenCalendar(false)
                }} className='CategoryButtonWrapper'>
                    {getSubCategory?.data?.subcategories?.length > 0 &&
                        <button
                            onClick={() => {
                                setActiveButton('Բոլորը')
                                setSubcategoryId('')
                            }} id={activeButton == 'Բոլորը' && 'active'} className='CateogryButton'
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
                        }} id={activeButton == elm?.name && 'active'} className='CateogryButton'>{name}</button>
                    })}
                </div>
            }
            <div onClick={() => {
            }} className='FilterWrapper'>
                <FilterSvg />
                {id !== '651568e7c6d0c9ab5a69365b' &&
                    <div className='SelectorDivWrapper'>
                        <MultySelect item={
                            events?.hall
                        } onClick={(e) => {
                            if (e?._id) {
                                setTitle(language === 'am' ? e?.hall :
                                    language === 'ru' ? e?.hall_ru :
                                        e?.hall_en)
                            }
                            else {
                                setTitle(language === 'am' ? 'Բոլորը' :
                                    language === 'ru' ? 'Все' :
                                        'All')
                            }
                            setHallId(e?._id)

                        }} title={title} />
                    </div>
                }
                <div onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setOpenCalendar(!openCalendar)
                }}>
                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8662 0.666751C17.4323 0.665421 17.8799 1.1052 17.8812 1.69157L17.8825 2.69107C21.5554 2.97893 23.9816 5.48168 23.9855 9.31975L24 20.5541C24.0053 24.7387 21.3763 27.3134 17.1624 27.3201L6.86919 27.3334C2.6816 27.3387 0.0197643 24.7027 0.0144985 20.5062L8.83653e-06 9.40371C-0.00524805 5.54031 2.33538 3.04423 6.00824 2.70707L6.00692 1.70757C6.0056 1.12119 6.44003 0.680081 7.01926 0.680081C7.59849 0.678748 8.03292 1.11853 8.03423 1.7049L8.03555 2.63777L15.8552 2.62711L15.8539 1.69424C15.8526 1.10787 16.287 0.668087 16.8662 0.666751ZM17.4033 19.5893H17.3902C16.7846 19.6039 16.2988 20.1117 16.312 20.7247C16.3133 21.3377 16.8017 21.8428 17.4073 21.8561C18.0247 21.8548 18.5249 21.3471 18.5236 20.7207C18.5236 20.0944 18.022 19.5893 17.4033 19.5893ZM6.55588 19.5906C5.95031 19.6173 5.4764 20.125 5.47771 20.738C5.50536 21.3511 6.0056 21.8308 6.61117 21.8028C7.20488 21.7762 7.67748 21.2684 7.64983 20.6554C7.63667 20.0557 7.14827 19.5893 6.55588 19.5906ZM11.9796 19.5839C11.374 19.6119 10.9014 20.1183 10.9014 20.7314C10.9291 21.3444 11.4293 21.8228 12.0349 21.7962C12.6273 21.7682 13.1012 21.2618 13.0736 20.6474C13.0604 20.049 12.572 19.5826 11.9796 19.5839ZM6.54929 14.793C5.94373 14.8197 5.47113 15.3274 5.47244 15.9404C5.49878 16.5535 6.00034 17.0332 6.6059 17.0052C7.1983 16.9786 7.6709 16.4708 7.64325 15.8578C7.63009 15.2581 7.14301 14.7917 6.54929 14.793ZM11.9743 14.7464C11.3688 14.773 10.8949 15.2808 10.8962 15.8938C10.9225 16.5068 11.4241 16.9852 12.0296 16.9586C12.622 16.9306 13.0946 16.4242 13.0683 15.8112C13.0538 15.2115 12.5667 14.745 11.9743 14.7464ZM17.3981 14.753C16.7925 14.7664 16.3186 15.2594 16.3199 15.8725V15.8871C16.3331 16.5002 16.8333 16.9653 17.4402 16.9519C18.0326 16.9373 18.5052 16.4295 18.492 15.8165C18.4644 15.2301 17.9891 14.7517 17.3981 14.753ZM15.8578 4.67941L8.03818 4.69007L8.0395 5.7682C8.0395 6.34258 7.60639 6.79568 7.02716 6.79568C6.44793 6.79702 6.01219 6.34524 6.01219 5.77086L6.01087 4.74471C3.44382 5.00192 2.02338 6.51049 2.02732 9.40105L2.02865 9.81551L21.9595 9.78885V9.32242C21.9029 6.45719 20.4654 4.95394 17.8851 4.73005L17.8865 5.75621C17.8865 6.32925 17.4402 6.78369 16.8741 6.78369C16.2949 6.78502 15.8591 6.33192 15.8591 5.75887L15.8578 4.67941Z" fill="black" />
                    </svg>

                </div>
                {openCalendar && <div
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    className='DataPickerDiv'>
                    <DateRangePicker
                        color={'#e53dff'}
                        dateDisplayFormat={'mm, dd, yyyy'}
                        ranges={selectedDate}
                        onChange={(ranges) => {
                            setSelectedDate([ranges.selection])
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                    />
                </div>}
            </div>
            {!events?.loading && !events?.events.sessions?.length > 0 &&
                <div onClick={() => {
                    setOpenCalendar(false)
                }} className='notfound'>
                    <p>{t('Nodatafound')}</p>
                </div>
            }
            {events?.events?.sessions?.length > 0 &&
                <div className='mFilterWrapper' onClick={() => {
                    setOpen(!open)
                }}>
                    <MFilter />
                    <MultysElectSvg />
                </div>
            }

            {open &&
                <div className='MultyselectItemCategory'>
                    <div onClick={() => {
                        dispatch(OpenCategoryMenu(true))
                    }}>Hall</div>
                    <div onClick={() => {
                        // setOpenCalendar(true)
                        dispatch(OpenCaldendar(true))
                    }}>Calendar</div>
                </div>
            }
            {!events.loading ?
                <div onClick={() => {
                    setOpenCalendar(false)
                }} className='Category'>
                    {events?.events?.sessions?.length > 0 && events?.events?.sessions?.map((elm, i) => {
                        const dateObject = new Date(elm.date)
                        let day = dateObject.getDate()
                        let month = dateObject.getMonth() + 1
                        if (day <= 9) {
                            day = `0${day}`
                        }
                        if (month <= 9) {
                            month = `0${month}`
                        }
                        return <CategoryTicket
                            data={elm.eventId}
                            onClick={() => navigation(`/Single/${elm?.eventId?._id}`)}
                            key={i}
                            id={elm?.eventId?._id}
                            image={elm?.eventId?.image}
                            date={`${day}-${month}-${dateObject.getFullYear()}`}
                            location={elm?.hallId?.location}
                            price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                        />
                    })}
                </div>
                : <div className='loadingCategory'>
                    <PuffLoader color="#FEE827" />
                </div>
            }
            <div onClick={() => setOpenCalendar(false)} className='paginationDiv'>
                {events?.events?.sessions?.length > 21 && <Stack spacing={2}>
                    <Pagination
                        onChange={(e, value) => setPage(value)}
                        count={events?.events?.totalPages}
                        color="secondary"
                    />
                </Stack>
                }
            </div>
        </div >
    )
}