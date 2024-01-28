import { WeekEventSvg } from '../svg'
import './styles.css'
export const WeekCard = () => {
    return <div className='WeekCard'>
        <div className='WeekCardImg'>
            <img src={require('../../assets/3.png')} />
        </div>
        <div className='WeekcardIfno'>
            <p className='WeekcardIfnoTitle'>ՆԵՈԿԼԱՍԻԿԱՅԻ ՏԻԵԶԵՐՔԸ</p>
            <p className='WeekCardDate'>
                24.02.24 19:00
            </p>
            <p className='WeekCardPlace'>գոյ թատրոն</p>
        </div>
        <div className='WeekcardLine' />
        <div className='WeekcardLineSvg'>
            <WeekEventSvg />
        </div>
    </div>
}