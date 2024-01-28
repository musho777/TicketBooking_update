import './styles.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { MultysElectSvg, OpenMulTyselect } from '../svg'

export const MultySelect = ({ title, onClick, item = [] }) => {
    const { t } = useTranslation();
    const { language } = useSelector((st) => st.StaticReducer)
    const [open, setOpen] = useState(false)

    document.body.addEventListener('click', function () {
        setOpen(false)
    })

    return (
        <div
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setOpen(!open)
            }}
        >
            <div className='Multyselect'>
                <p>{title}</p>
                {open
                    ? <div onClick={() => setOpen(false)}>
                        <OpenMulTyselect />
                    </div>
                    : <div onClick={() => setOpen(true)}>
                        <MultysElectSvg />
                    </div>
                }
            </div>
            {open &&
                <div className='MultyselectItem'>
                    <div onClick={() => onClick('')}>{t('Showall')}</div>
                    {item?.map((elm, i) => (
                        <div key={i} onClick={() => onClick(elm)}>
                            {language === 'am' ? elm?.hall
                                : language === 'ru' ? elm?.hall_ru
                                    : elm?.hall_en
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}