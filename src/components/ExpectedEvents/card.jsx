import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import { CategoryType } from '../CategoryType'
import { LocationSvg } from '../svg'

import './styles.css'
export const Card = () => {
    const { t } = useTranslation();
    return <div className='ExpectedEventsDiv'>
        <div className='TypeDiv'>
            <CategoryType />
        </div>
        <div className='ExpectedEventsInfo'>
            <div className='dateAndLocation'>
                <div className='expectedDate'>
                    <div className='dayDate'>
                        <p>28</p>
                    </div>
                    <div className='monthAndWeek'>
                        <p className='monthp'>Հունվար</p>
                        <div className='monthLine' />
                        <p className='weekp'>Կիրակի</p>
                    </div>
                    <p className='expectTime'>17։00</p>
                </div>
                <div className='dateAndLocationLine' />
                <div className='LocationDiv'>
                    <LocationSvg />
                    <p>ՀԱՆՐԱՊԵՏԱԿԱՆ ՄԱՐԶԱԴԱՇՏ</p>
                </div>
            </div>
            <div className='ExpectedEventInfo'>
                <p className='eventType'>ԵՎՐՈ 2024 ՈՐԱԿԱՎՈՐՄԱՆ ՓՈՒԼ</p>
                <p className='eventName'>ՀԱՅԱՍՏԱՆ - ԽՈՐՎԱԹԻԱ</p>
            </div>
            <div className='MobilePrice'>
                <p>1500-3000 AMD</p>
            </div>
            <div className='ExpectedEventLine' />
            <div className='ExpectedEventPrice'>
                <p>1500-3000 AMD</p>
                <Button title={t('BuyNow')} />
            </div>
        </div>
        <img src={require('../../assets/2.png')} />
    </div>
}