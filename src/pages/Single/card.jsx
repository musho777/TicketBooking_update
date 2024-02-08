import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button'
import { LocationSvg, SeansCaelndar } from '../../components/svg'
import { useState } from 'react';

export const Card = ({
    id,
    img,
    largImage,
    title,
    description,
    priceEnd,
    priceStart,
    hall,
    time,
    data,
    onClick
}) => {
    const { t } = useTranslation();
    const data1 = [
        { week: 'ՀՆԳ', date: '17 Հունվար', time: '19։00' },
        { week: 'ՀՆԳ', date: '17 Հունվար', time: '19։00' },
        { week: 'ՀՆԳ', date: '17 Հունվար', time: '19։00' },
        { week: 'ՀՆԳ', date: '17 Հունվար', time: '19։00' },
        { week: 'ՀՆԳ', date: '17 Հունվար', time: '19։00' },
        { week: 'ՀՆԳ', date: '17 Հունվար', time: '19։00' },
    ]
    const [active, setActive] = useState(0)
    const [showAll, setShowAll] = useState(false)

    console.log(!showAll && description?.length > 100, 1)
    return <div className='SinglCaruselItem'>
        <div className='SinglBanerDiv' >
            <div className='SiglBanerImg2'>
                <img className='SiglBanerImg2' src={img} />
            </div>
            <div className='SinglBanerDivInfo'>
                <div className='SinglBanerPrimera'>
                    <div className='SinglPrimera'>
                        <p className='SinglPrimerap'>{t('Primera')}</p>
                        <p className='SinglPrimeraDate'>{data} {time}</p>
                    </div>
                    <div className='SinglBanerLocation'>
                        <LocationSvg />
                        <p className='SinglBanerDivInfoPlace'>{hall}</p>
                    </div>
                </div>
                <div>
                    <p className='SinglBanerTitle'>{title}</p>
                    <div className='SinglBanerTextDiv'>
                        <p className='SinglBanerText'>{description}</p>
                    </div>
                </div>
                <div className='SinglBanerPrimeraMobile'>
                    <div className='Primera'>
                        <p className='Primerap'>{t('Primera')}</p>
                        <p className='PrimeraDate'>{data} {time}</p>
                    </div>
                    <div className='BanerLocation'>
                        <LocationSvg />
                        <p className='BanerDivInfoPlace'>{hall}</p>
                    </div>
                </div>
                <div className='SinglPriceDiv'>
                    <p className='SinglBanerPrice'>{priceStart} {priceEnd} </p>
                    <div className='SinglBanerButton'>
                        <Button
                            onClick={onClick}
                            title={t('BuyNow')} />
                        {description?.length > 100 && <p onClick={() => setShowAll(!showAll)}>{t('seeMore')}</p>}
                    </div>
                </div>
                <div className='descriptionDiv'>
                    <p className='descriptionDiv2Title'>նկարագրություն</p>
                    <p className='descriptionDiv2Text'>
                        {showAll ? description : description?.slice(0, 100)}{(!showAll && description?.length > 100) && '...'}
                    </p>
                </div>
            </div>
        </div>
        <img
            className='SinglBanerImg'
            src={largImage}
            alt='#'
        />
        <div className='descriptionDiv2'>
            {/* <p >նկարագրություն</p> */}
            <p>  {showAll ? description : description?.slice(0, 100)}{(!showAll && description?.length > 100) && '...'}</p>
        </div>
    </div>
}