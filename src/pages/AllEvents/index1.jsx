import './style.css'
import Stack from '@mui/material/Stack'
import 'react-date-range/dist/styles.css'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next'
import 'react-date-range/dist/theme/default.css'
import Pagination from '@mui/material/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CategoryTicket } from '../../components/CategoryTicket'
import { GetRandomEvents } from '../../services/action/action'

export const AllEventss = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getRandomEvents)
    const [page, setPage] = useState(1)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(GetRandomEvents(page))
    }, [page,])

    return (
        <div className='category'>
            {!events?.loading && !events?.events.length > 0 &&
                <div className='notfound'>
                    <p>{t('Nodatafound')}</p>
                </div>
            }

            {!events.loading ?
                <div className='Category'>
                    {events?.events?.length > 0 && events?.events?.map((elm, i) => {
                        const dateObject = new Date(elm.sessions[0]?.date)
                        let day = dateObject.getDate()
                        let month = dateObject.getMonth() + 1
                        if (day <= 9) {
                            day = `0${day}`
                        }
                        if (month <= 9) {
                            month = `0${month}`
                        }
                        return <CategoryTicket
                            data={elm}
                            onClick={() => navigation(`/Single/${elm?._id}`)}
                            key={i}
                            id={elm?._id}
                            image={elm?.image}
                            date={`${day}-${month}-${dateObject.getFullYear()}`}
                            location={elm?.sessions[0]?.hallId?.location}
                            price={`${elm?.sessions[0]?.priceStart} - ${elm?.sessions[0]?.priceEnd} AMD`}
                        />
                    })}
                </div>
                : <div className='loadingCategory'>
                    <PuffLoader color="#FEE827" />
                </div>
            }
            <div className='paginationDiv'>
                {events?.events?.length > 21 && <Stack spacing={2}>
                    <Pagination
                        onChange={(e, value) => setPage(value)}
                        count={events?.totalPages}
                        color="secondary"
                    />
                </Stack>
                }
            </div>
        </div >
    )
}