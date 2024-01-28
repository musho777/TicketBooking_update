import { useTranslation } from 'react-i18next'
import { Card } from './card'
import './styles.css'
export const ExpectedEvents = () => {
    const { t } = useTranslation()
    return <div className='ExpectedEvents'>
        <div className='EventTitle'>
            <h2>{t('ՍՊԱՍՎՈՂ ՄԻՋՈՑԱՌՈՒՄՆԵՐ')}</h2>
        </div>
        <div className='CardDiv'>
            <Card />
            <Card />
        </div>
    </div>
}