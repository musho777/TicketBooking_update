import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BuyTickets, ClearDataBuy, ClearStatusAction } from '../../services/action/action'
import { PuffLoader } from 'react-spinners'

export const StatusACBA = () => {
    const { status } = useSelector((st) => st.status)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem('orderId')) {
            window.location = '/'
        } else {
            dispatch(BuyTickets({ orderId: localStorage.getItem('orderId') }))
            setLoading(false)
            // setTimeout(() => {
            //     localStorage.removeItem('orderId')
            // }, 3000)
        }
        dispatch(ClearStatusAction())
        dispatch(ClearDataBuy())
    }, [dispatch, status])

    if (loading) {
        return <div className='loading'>
            <PuffLoader color="#FEE827" />
        </div>
    }

    return <div className='container' id='statusDiv'>
        < div className='successPage' >
            <img src={require('../../assets/success.png')} alt='' />
            <h1>Շուտով կստանաք տոմսերը ձեր նշած էլ. հասցեին,</h1>
            {/* <h1>Խնդրում ենք էջը չփակել</h1> */}
        </div >
    </div >
} 