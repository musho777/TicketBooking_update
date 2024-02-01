import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCurrentTicket, RemoveTicketsAction, StatusSuccessAction } from '../../services/action/action'
import { CheckSvg, CheckedSvg, SelectSvg, SelectedSvg } from '../svg'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'
import CryptoJS from 'crypto-js'
import { Buffer } from "buffer"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from 'react-i18next'

export const BuyNow = () => {
    const { language } = useSelector((st) => st.StaticReducer)
    const generateOrderNumber = () => {
        const timestamp = Date.now()
        const randomNum = Math.floor(Math.random() * 1000)
        return `tel-${timestamp}-${randomNum}`
    }
    const scrollRef = useRef();

    const scrollToBottom = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            container.scrollTop = container.scrollHeight;
        }
    };

    const { t } = useTranslation()


    const dispatch = useDispatch()
    const tickets = useSelector((st) => st.tiketsForBuy)
    const getSinglPage = useSelector((st) => st.getSinglPage)
    const Select = (i) => { setSelectPay(i) }
    const [total, setTotal] = useState(0)
    const [chedked, setChedker] = useState(false)
    const [selectPay, setSelectPay] = useState(1)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [additional, setAdditional] = useState('')
    const [address, setAddress] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const issuerId = generateOrderNumber()
    const { creatTicket } = useSelector((st) => st)
    const [delivery, setDelivery] = useState(false)
    let [title, setTitle] = useState()
    const [error, setError] = useState({
        name: '',
        email: '',
        phonNumber: '',
        checked: '',
        address: ''
    })

    useEffect(() => {
        if (selectPay == 3) {
            if (name == '' || number == '' || address == '' || email == '') {
                setDisableButton(true)
            }
            else {
                setDisableButton(false)
            }
        }
        else {
            if (name == '' || number == '' || email == '') {
                setDisableButton(true)
            }
            else {
                setDisableButton(false)
            }
        }

    }, [name, number, address, email, selectPay])

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let price = 0
        tickets.tickets?.map((elm, i) => {
            price += +elm.price
        })
        setTotal(price)
    }, [tickets])

    useEffect(() => {
        if (language === 'am') {
            setTitle(getSinglPage.events.event.title)
        }
        else if (language === 'en') {
            setTitle(getSinglPage?.events?.event?.title_en)


        }
        else if (language === 'ru') {
            setTitle(getSinglPage.events.event.title_ru)

        }
    }, [language, getSinglPage])



    function handlePurchase() {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_HOSTNAME}/registerPayment`, { amount: total * 100 })
            .then(res => {
                if (res?.data?.success) {
                    setLoading(false)
                    localStorage.setItem('orderId', res?.data?.orderId)
                    window.open(`${res?.data?.formUrl}`, { target: '_blank' })
                    dispatch(CreateCurrentTicket({
                        tickets: tickets.tickets,
                        buyerName: name,
                        buyerEmail: email,
                        buyerPhone: number,
                        deliveryLocation: address,
                        sessionId: tickets.tickets[0].sessionId,
                        buyerNotes: additional,
                        orderId: res?.data?.orderId,
                        paymentMethod: 'CREDIT CARD',
                        delivery,
                    }))
                    setTimeout(() => {
                        dispatch(StatusSuccessAction())
                    }, 3000)
                } else {
                    window.open(`/`)
                }
            })
            .catch((error) => {
            })
    }

    const validation = () => {
        let item = { ...error }
        if (!name) {
            item.name = 'error'
        }
        else if (name) {
            item.name = ''
        }
        if (!number) {
            item.phonNumber = 'error'
        }
        else if (number.length < 7) {
            item.phonNumber = 'error'
        }
        else if (number) {
            item.phonNumber = ''
        }
        if (!ValidateEmail(email)) {
            item.email = 'error'
        }
        else if (ValidateEmail(email)) {
            item.email = ''
        }
        if (!chedked) {
            item.checked = 'error'
            scrollToBottom()
        }
        else if (chedked) {
            item.checked = ''
        }
        if (selectPay == 3) {
            if (!address) {
                item.address = 'error'
            }
            else {
                item.address = ''

            }
        }
        if (
            item.name == '' && item.address == '' && item.checked == '' && item.email == '' && item.phonNumber == ''
        ) {
            if (selectPay === 2) {
                setLoading(true)
                dispatch(CreateCurrentTicket({
                    tickets: tickets.tickets,
                    buyerName: name,
                    buyerEmail: email,
                    buyerPhone: number,
                    deliveryLocation: address,
                    sessionId: tickets.tickets[0].sessionId,
                    paymentMethod: 'Telcell',
                    buyerNotes: additional,
                    orderId: issuerId,
                }))
                setLoading(false)

                function getTelcellSecurityCode(shop_key, issuer, currency, price, product, issuer_id, valid_days) {
                    return CryptoJS.MD5(shop_key + issuer + currency + price + product + issuer_id + valid_days).toString();
                }

                const encodedProduct = new Buffer.from('Ticket payment').toString('base64')
                const encodedIssuerId = new Buffer.from(issuerId).toString('base64')
                const security_code = getTelcellSecurityCode(
                    process.env.REACT_APP_TELCELL_SHOP_KEY,
                    process.env.REACT_APP_TELCELL_ISSUER,
                    "֏",
                    total,
                    encodedProduct,
                    encodedIssuerId,
                    "1"
                )

                document.getElementById('telcellForm').innerHTML = `
                <form id='form' style={{ margin: "20px" }} target="_blank" action="https://telcellmoney.am/invoices" method="POST" >
                    <input type="hidden" name="action" value="PostInvoice" />
                    <input type="hidden" name="issuer" value=${process.env.REACT_APP_TELCELL_ISSUER} />
                    <input type="hidden" name="currency" value="֏" />
                    <input type="hidden" name="price" value=${total} />
                    <input type="hidden" name="product" value=${encodedProduct} />
                    <input type="hidden" name="issuer_id" value=${encodedIssuerId} />
                    <input type="hidden" name="valid_days" value="1" />
                    <input type="hidden" name="lang" value="am" />
                    <input type="hidden" name="security_code" value=${security_code} />
                </form>`
                document.getElementById('form').submit()
                window.location.reload()
            }
            else if (selectPay === 3) {
                dispatch(CreateCurrentTicket({
                    tickets: tickets.tickets,
                    buyerName: name,
                    buyerEmail: email,
                    buyerPhone: number,
                    deliveryLocation: address,
                    sessionId: tickets.tickets[0].sessionId,
                    buyerNotes: additional,
                    orderId: issuerId,
                    paymentMethod: 'CASH',
                    delivery: true,
                }))
                localStorage.setItem('orderId', issuerId)
            }
            else {
                handlePurchase()
            }
        }
        setError(item)
    }

    useEffect(() => {
        if (creatTicket.status && selectPay == 3) {
            window.location = `/StatusACBA`
        }
    }, [creatTicket])

    return (
        <div className='buyNowWrapper3'>
            <div ref={scrollRef} className='buyNowWrapper2'>
                <p className='deliverText'>
                    {t('freeDelivery')}
                </p>
                <p className='buyNowTitle'>{title}</p>
                <p className='buyNowDate'>{getSinglPage?.events?.event?.sessions[0]?.date.slice(0, 10)}  /  {getSinglPage?.events?.event?.sessions[0].time}</p>
                <div className='BuyMethod'>
                    <div className='selectPay' onClick={() => {
                        setDelivery(false)
                        Select(1)
                    }}>
                        <div className='BuyMethodSelect'>
                            {selectPay == 1 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 10, flexWrap: 'wrap' }}>
                            <img alt='' width={80} height={34} src={require('../../assets/MIR_logo.png')} />
                            <img alt='' width={55} height={34} src={require('../../assets/amex_logo.png')} />
                            <img alt='' width={55} height={34} src={require('../../assets/mastercard_logo.png')} />
                            <img alt='' width={80} height={34} src={require('../../assets/visa_logo.png')} />
                            <img alt='' width={55} height={34} src={require('../../assets/arca_logo.png')} />
                        </div>
                    </div>
                    <p className='ticketInfno'>{t('Youwillreceive')}</p>
                    <div className='selectPay' onClick={() => {
                        Select(2)
                        setDelivery(false)
                    }} style={{ cursor: 'pointer' }}>
                        <div className='BuyMethodSelect'>
                            {selectPay == 2 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <img alt='' width={65} height={34} src={require('../../assets/TelCell.png')} />
                    </div>
                    <p className='ticketInfno'>{t('Youwillreceive')}</p>

                    <div className='selectPay' onClick={() => {
                        setDelivery(true)
                        Select(3)
                    }} style={{ cursor: 'pointer' }}>
                        <div className='BuyMethodSelect'>
                            {selectPay == 3 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <img width={68} height={34} src={require('../../assets/22.png')} />

                    </div>
                    <p className='ticketInfno'>{t('Shippingisfree')}</p>
                </div>
                <div className='BuyInputsName'>
                    <input
                        className='InputsBuy'
                        placeholder={t('NameSurname')}
                        id={error.name != '' ? 'errorInut' : 'inout'} value={name} onChange={(e) => setName(e.target.value)} />
                    <div>
                        <PhoneInput
                            country={'am'}
                            value={number}
                            placeholder={t('PhoneNumber')}
                            onChange={phone => setNumber(phone)}
                            isValid={error.phonNumber == ''}
                        />
                    </div>
                    <input
                        className='InputsBuy'

                        placeholder={t('Email')} id={error.email != '' ? 'errorInut' : 'inout'} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='InputsBuy'>
                    <textarea
                        placeholder={t('Notes')}
                        value={additional} onChange={(e) => setAdditional(e.target.value)} />
                </div>
                {delivery &&
                    <div className='InputsBuy'>
                        <label>{t('Deliveryaddress')} <span className='span'>*</span></label>
                        <input id={error.address != '' ? 'errorInut' : 'inout'} value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                }


                <div className='BuyCheck'>
                    <div
                        onClick={() => setChedker(!chedked)} style={{ cursor: 'pointer', height: 24 }}>
                        {chedked
                            ? <CheckedSvg />
                            : <CheckSvg error={error?.checked == ''} />
                        }
                    </div>
                    <a className='textDD' style={{ color: 'black', }} href='https://shinetickets.com/PrivacyPolicy'>{t('Termsandconditions')}</a>
                </div>
                <div className='BuyButton'>

                    <button
                        id={
                            disableButton &&
                            'disable'
                        }

                        disabled={loading} onClick={validation} >
                        {!loading
                            ? t('BuyTicket')
                            : <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <PuffLoader size={28} color="#FEE827" />
                            </div>
                        }
                    </button>
                </div>

                <div id='telcellForm' />
            </div>
        </div>
    )
}