import './style.css'
import { Header } from '../Header/index.jsx'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { EventValidity } from '../../services/action/action.js'
import { Footer } from '../Footer/index.jsx'

export const Layout = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(EventValidity())
    }, [dispatch])
    return (<>
        <div className='HeaderDiv'>
            <Header open={(e) => setOpenMenu(e)} />
        </div>
        <div className='container'>
            <div className='wrapper'>
                <p className='mainPageText'>Պատվիրելու համար զանգահարել +374 93 55 88 44</p>
            </div>
        </div>
        <div className='outlet'>
            <Outlet />
        </div>
        <Footer />
    </>
    )
}