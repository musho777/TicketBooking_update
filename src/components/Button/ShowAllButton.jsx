import { useTranslation } from 'react-i18next'
import './style.css'
export const ShowAllButton = () => {
    const { t } = useTranslation()

    return <button className="ShowAllButton">
        {t('Showall')}
    </button>
}