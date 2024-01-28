import './style.css'
import { useTranslation } from 'react-i18next'

export const MainAbout = () => {
    const { t } = useTranslation()

    return (
        <div className='mainAbout'>
            <div className='aboutTitle'>
                {/* <h2>{t('WithTicket.com')}</h2> */}
            </div>
            <p>
                Ticketbande is an independent ticket search engine for tickets to events around the world.
                Since 2001, more than one million customers have benefited from our service, and our customers'
                satisfaction is more than 99 percent. We have the highest demands It's safe with Ticket.com.
            </p>
        </div>
    )
}