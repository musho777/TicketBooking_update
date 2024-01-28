import './style.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const MenuMobile = ({ onClose }) => {
    const navigation = useNavigate()
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)

    return (
        <div className='MenuMobile'>
            {getCategory.category.map(elm => {
                let title = ''
                if (language === 'am') {
                    title = elm.name
                } else if (language === 'en') {
                    title = elm.name_en
                } else if (language === 'ru') {
                    title = elm.name_ru
                }
                return (
                    <div
                        onClick={() => {
                            onClose()
                            navigation(`/Category/${elm.name}/${elm?._id}`)
                        }}
                    >
                        {title}
                    </div>
                )
            })}
        </div>
    )
}