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
        <Header open={(e) => setOpenMenu(e)} />
        <div className='outlet'>
            <Outlet />
        </div>
        <Footer />
    </>
    )
}