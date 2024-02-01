import './style.css'
import { Header } from '../Header/index.jsx'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { EventValidity } from '../../services/action/action.js'
import { Footer } from '../Footer/index.jsx'
import { useTranslation } from 'react-i18next'

export const Layout = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(EventValidity())
    }, [dispatch])
    return (<>
        <div className='HeaderDiv'>
            <Header open={(e) => setOpenMenu(e)} />
        </div>
        <div className='container'>
            <div className='wrapper'>
                <p className='mainPageText'>{t('forDelivery')} <span>+374 93 55 88 44</span></p>
            </div>
        </div>
        <div className='outlet'>
            <Outlet />
        </div>
        <Footer />
    </>
    )
}