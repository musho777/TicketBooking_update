import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button'
import { LocationSvg } from '../../components/svg'

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
    return <div className='SinglCaruselItem'>
        <div className='SinglBanerDiv' >
            <img className='SiglBanerImg2' src={img} />
            <div className='SinglBanerDivInfo'>
                <div className='SinglBanerPrimera'>
                    <div className='SinglPrimera'>
                        <p className='SinglPrimerap'>ՊՐԵՄԻԵՐԱ</p>
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
                        <p className='Primerap'>ՊՐԵՄԻԵՐԱ</p>
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
                            title={t('BuyNew')} />
                        <p>տեսնել ավելին</p>
                    </div>
                </div>
            </div>
        </div>
        <img
            className='SinglBanerImg'
            src={largImage}
            alt='#'
        />
    </div>
}