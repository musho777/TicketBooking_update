import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCurrentTicket, GetCurrentTicket, RemoveTicketsAction, StatusSuccessAction } from '../../services/action/action'
import { CheckSvg, CheckedSvg, MobileSvg, SelectSvg, SelectedSvg } from '../svg'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'
import CryptoJS, { MD5 } from 'crypto-js'
import { Buffer } from "buffer"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from 'react-i18next'
import InputMask from 'react-input-mask';

export const BuyNow = ({ open, isParonyanEvent, paronyanSeans, event_id, grupID }) => {
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
        setName('')
        setNumber('')
        setChedker(false)
        setSelectPay(1)
        setEmail('')
        setAddress('')
        setAdditional('')
        setError({
            name: '',
            email: '',
            phonNumber: '',
            checked: '',
            address: ''
        })
        // if (open) {
        //     BookTikests()
        // }
    }, [open])

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
            if (isParonyanEvent) {
                setTitle(getSinglPage.events.event?.ParonyanName)
            }
            else {
                setTitle(getSinglPage.events.event?.title)
            }
        }
        else if (language === 'en') {
            if (isParonyanEvent) {
                setTitle(getSinglPage.events.event?.ParonyanName)
            }
            else {
                setTitle(getSinglPage?.events?.event?.title_en)
            }


        }
        else if (language === 'ru') {
            if (isParonyanEvent) {
                setTitle(getSinglPage.events.event?.ParonyanName)
            }
            else {
                setTitle(getSinglPage.events.event?.title_ru)
            }

        }
    }, [language, getSinglPage])


    // for (let i = 0; i < tickets.tickets.length; i += 2) {
    //     const key = tickets.tickets[i];
    //     const value = tickets.tickets[i + 1];
    //     if (key && value !== undefined) {
    //         tempObj[key] = value;
    //     }
    //     if (key === "seat" && value !== undefined) {
    //         if (!tempObj.Places) {
    //             tempObj.Places = [];
    //         }
    //         tempObj.Places.push({ Row: tempObj.row, Seat: value.toString() });
    //     }
    //     if (key === "stage" && value !== undefined) {
    //         data.data.push(tempObj);
    //         tempObj = {};
    //     }
    // }


    // useEffect(() => {
    //     let data1 = { 'data': [] }

    //     tickets.tickets.map((e, i) => {
    //         let index = data1.data.findIndex(el => el.LevelId = e.LevelId)
    //         if (index < 0) {
    //             data1.data?.push({
    //                 "LevelId": e.LevelId,
    //                 "Places": []
    //             })
    //         }
    //         data1.data.map((elm, i) => {
    //             if (elm.LevelId == e.LevelId) {
    //                 elm.Places.push({
    //                     "Row": e.row,
    //                     "Seat": e.seat
    //                 })
    //             }
    //         })
    //     })
    // }, [])


    // const BookTikests = () => {
    //     const keys = "hYDepOnSarMi";
    //     const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    //     const requestType = "book";

    //     const params = {
    //         group_id: grupID,
    //         timeline_id: paronyanSeans,
    //         event_id: event_id,
    //     };

    //     const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    //         acc[key] = params[key];
    //         return acc;
    //     }, {});

    //     sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();
    //     let data = { 'data': [] }
    //     tickets.tickets.map((e, i) => {
    //         let index = data.data.findIndex(el => el.LevelId = e.LevelId)
    //         if (index < 0) {
    //             data.data?.push({
    //                 "LevelId": e.LevelId,
    //                 "Places": []
    //             })
    //         }
    //         data.data.map((elm, i) => {
    //             if (elm.LevelId == e.LevelId) {
    //                 elm.Places.push({
    //                     "Row": e.row,
    //                     "Seat": e.seat
    //                 })
    //             }
    //         })
    //     })
    //     sortedParams.data = JSON.stringify(data);

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(sortedParams)
    //     };

    //     fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
    //         .then(response => response.json())
    //         .then(data => {
    //             localStorage.setItem('order_id', JSON.stringify(data))
    //             // dispatch(CreateCurrentTicket({
    //             //     tickets: tickets.tickets,
    //             //     buyerName: name,
    //             //     buyerEmail: email,
    //             //     buyerPhone: number,
    //             //     deliveryLocation: address,
    //             //     sessionId: tickets.tickets[0].sessionId,
    //             //     buyerNotes: additional,
    //             //     orderId: data.id,
    //             //     paymentMethod: 'CREDIT CARD',
    //             //     delivery,
    //             // }))
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }


    const BuyParonyanEvents = (res) => {

        if (selectPay === 3) {
            localStorage.setItem('orderId', res)

            dispatch(CreateCurrentTicket({
                tickets: tickets.tickets,
                buyerName: name,
                buyerEmail: email,
                buyerPhone: number,
                isParonyanEvent: true,
                deliveryLocation: address,
                // paronyanOrderId: data.data.id,
                sessionId: null,
                buyerNotes: additional,
                orderId: res,
                eventId: event_id,
                paymentMethod: 'CASH',
                delivery,
                // qrData: JSON.parse(data.data.map).data,

            }, res, selectPay))
        }
        else if (selectPay === 2) {
            localStorage.setItem('orderId', res)
            dispatch(CreateCurrentTicket({
                tickets: tickets.tickets,
                buyerName: name,
                buyerEmail: email,
                buyerPhone: number,
                isParonyanEvent: true,
                deliveryLocation: address,
                // paronyanOrderId: data.data.id,
                sessionId: null,
                buyerNotes: additional,
                orderId: res,
                eventId: event_id,
                paymentMethod: 'Telcell',
                delivery,
                // qrData: JSON.parse(data.data.map).data,

            }, res, selectPay))
        }
        else {
            localStorage.setItem('orderId', res?.data?.orderId)

            dispatch(CreateCurrentTicket({
                tickets: tickets.tickets,
                buyerName: name,
                buyerEmail: email,
                buyerPhone: number,
                isParonyanEvent: true,
                deliveryLocation: address,
                // paronyanOrderId: data.data.id,
                sessionId: null,
                buyerNotes: additional,
                orderId: res?.data?.orderId,
                eventId: event_id,
                paymentMethod: 'CREDIT CARD',
                delivery,
                // qrData: JSON.parse(data.data.map).data,

            }, res, selectPay))
        }
    }

    const backBookTikets = () => {
        const keys = "hYDepOnSarMi";
        const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
        const requestType = "bookBack";

        const params = {
            group_id: grupID,
            timeline_id: paronyanSeans,
            event_id: event_id,
        };

        const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

        sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();
        let data = { 'data': [] }
        tickets.tickets.map((e, i) => {
            let index = data.data.findIndex(el => el.LevelId = e.LevelId)
            if (index < 0) {
                data.data?.push({
                    "LevelId": e.LevelId,
                    "Places": []
                })
            }
            data.data.map((elm, i) => {
                if (elm.LevelId == e.LevelId) {
                    elm.Places.push({
                        "Row": e.row,
                        "Seat": e.seat
                    })
                }
            })
        })
        sortedParams.data = JSON.stringify(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(sortedParams)
        };

        fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('orderId', JSON.stringify(data))
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    function handlePurchase() {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_HOSTNAME}/registerPayment`, { amount: total * 100 })
            .then(res => {
                if (res?.data?.success) {
                    setLoading(false)
                    localStorage.setItem('orderId', res?.data?.orderId)
                    if (!isParonyanEvent) {
                        dispatch(CreateCurrentTicket({
                            tickets: tickets.tickets,
                            buyerName: name,
                            buyerEmail: email,
                            buyerPhone: number,
                            deliveryLocation: address,
                            sessionId: tickets.tickets[0].sessionId,
                            isParonyanEvent: false,
                            buyerNotes: additional,
                            orderId: res?.data?.orderId,
                            paymentMethod: 'CREDIT CARD',
                            delivery,
                        }))
                        window.open(`${res?.data?.formUrl}`, { target: '_blank' })

                    }

                    else {
                        BuyParonyanEvents(res)
                    }
                    setTimeout(() => {
                        dispatch(StatusSuccessAction())
                    }, 3000)
                }
                else {
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
        else if (number.length < 11) {
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
                if (isParonyanEvent) {
                    BuyParonyanEvents(issuerId)
                }
                else {
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
                }
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
                <form id='form' style={{ margin: "20px" }} target="_blank" action="https://telcellmoney.am/invoices" method="POST">
                    <input type="hidden" name="action" value="PostInvoice" />
                    <input type="hidden" name="issuer" value="${process.env.REACT_APP_TELCELL_ISSUER}" />
                    <input type="hidden" name="currency" value="֏" />
                    <input type="hidden" name="price" value="${total}" />
                    <input type="hidden" name="product" value="${encodedProduct}" />
                    <input type="hidden" name="issuer_id" value="${encodedIssuerId}" />
                    <input type="hidden" name="valid_days" value="1" />
                    <input type="hidden" name="lang" value="am" />
                    <input type="hidden" name="security_code" value="${security_code}" />
                </form>`;
                document.getElementById('form').submit()
                window.location.reload()
            }


            else if (selectPay === 3) {
                if (isParonyanEvent) {
                    BuyParonyanEvents(issuerId)
                }
                else {
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


    // useEffect(() => {
    //     if (isParonyanEvent) {
    //         const keys = "hYDepOnSarMi";
    //         const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    //         const requestType = "buyTickets";

    //         const params = {
    //             group_id: grupID,
    //             timeline_id: paronyanSeans,
    //             event_id: event_id,
    //         };

    //         const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    //             acc[key] = params[key];
    //             return acc;
    //         }, {});

    //         sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();
    //         let data = { 'data': [] }
    //         tickets.tickets.map((e, i) => {
    //             let index = data.data.findIndex(el => el.LevelId = e.LevelId)
    //             if (index < 0) {
    //                 data.data?.push({
    //                     "LevelId": e.LevelId,
    //                     "Places": []
    //                 })
    //             }
    //             data.data.map((elm, i) => {
    //                 if (elm.LevelId == e.LevelId) {
    //                     elm.Places.push({
    //                         "Row": e.row,
    //                         "Seat": e.seat
    //                     })
    //                 }
    //             })
    //         })
    //         sortedParams.data = JSON.stringify(data);

    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify(sortedParams)
    //         };

    //         fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
    //             .then(response => response.json())
    //             .then(data => {
    //                 localStorage.setItem('order_id', JSON.stringify(data))
    //                 dispatch(CreateCurrentTicket({
    //                     tickets: tickets.tickets,
    //                     buyerName: name,
    //                     buyerEmail: email,
    //                     buyerPhone: number,
    //                     deliveryLocation: address,
    //                     sessionId: tickets.tickets[0].sessionId,
    //                     buyerNotes: additional,
    //                     orderId: data.id,
    //                     paymentMethod: 'CREDIT CARD',
    //                     delivery,
    //                 }))
    //             })
    //             .catch(error => {

    //                 console.error('Error:', error);
    //             });
    //     }
    // }, [])

    return (
        <div className='BuyNow'>
            <div className='BuyNowHeader'>
                <p className='BuyNowHeaderTitle'>{title}</p>
                {isParonyanEvent ?
                    <p id="paronyan" className='BuyTicketDateMonth' dangerouslySetInnerHTML={{ __html: getSinglPage.events.event.ParonyanTime }} />
                    :
                    <p className='BuyNowHeaderDate'> {new Date(getSinglPage.events.event?.sessions[0]?.date).getDate()}.{new Date(getSinglPage.events.event?.sessions[0].date).getMonth() + 1}.{new Date(getSinglPage.events.event?.sessions[0].date).getFullYear()} {getSinglPage.events.event?.sessions[0].time}</p>
                }
            </div>
            <div className='BuyNowBody'>
                <p className='FreeDelivery'>{t('freeDelivery')}</p>
                <div className='InputTextareWrapper'>
                    <div className='InputWrapperBuy'>
                        <input
                            className='InputsBuy'
                            placeholder={t('NameSurname')}
                            id={error.name != '' ? 'errorInut' : 'inout'} value={name} onChange={(e) => setName(e.target.value)} />
                        <InputMask
                            className='InputsBuy'
                            value={number}
                            mask="+374 (99) 999-999"
                            placeholder={t('PhoneNumber')}
                            onChange={e => setNumber(e.target.value)}
                            id={error.phonNumber != '' ? 'errorInut' : 'inout'}
                        />
                        <input
                            className='InputsBuy'
                            placeholder={t('Email')} id={error.email != '' ? 'errorInut' : 'inout'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <textarea
                        className='TextareBuy'
                        placeholder={t('Notes')}
                        value={additional} onChange={(e) => setAdditional(e.target.value)} />
                    {delivery &&
                        <input
                            placeholder={t('Deliveryaddress')}
                            className='InputsBuyDelvery' id={error.address != '' ? 'errorInut' : 'inout'} value={address} onChange={(e) => setAddress(e.target.value)} />
                    }
                </div>
                <div className='selectPay' onClick={() => {
                    setDelivery(false)
                    Select(1)
                }}>
                    <div>
                        <div className='BuyMethodSelect'>
                            {selectPay == 1 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <div className='BuyMethodSelectImg'>
                            <img alt='' width={80} height={34} src={require('../../assets/MIR_logo.png')} />
                            <img alt='' width={55} height={34} src={require('../../assets/amex_logo.png')} />
                            <img alt='' width={55} height={34} src={require('../../assets/mastercard_logo.png')} />
                            <img alt='' width={80} height={34} src={require('../../assets/visa_logo.png')} />
                            <img alt='' width={55} height={34} src={require('../../assets/arca_logo.png')} />
                        </div>
                    </div>
                    <p className={selectPay == 1 && 'activeSelectedBuy'}>{t('Youwillreceive')}</p>
                </div>
                <div className='selectPay' onClick={() => {
                    Select(2)
                    setDelivery(false)
                }}>
                    <div>
                        <div className='BuyMethodSelect'>
                            {selectPay == 2 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <img alt='' width={65} height={34} src={require('../../assets/TelCell.png')} />
                    </div>
                    <p className={selectPay == 2 && 'activeSelectedBuy'}>{t('Youwillreceive')}</p>
                </div>
                <div className='selectPay' onClick={() => {
                    setDelivery(true)
                    Select(3)
                }} >
                    <div>
                        <div className='BuyMethodSelect'>
                            {selectPay == 3 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <img width={68} height={34} src={require('../../assets/22.png')} />
                    </div>
                    <p className={selectPay == 3 && 'activeSelectedBuy'}>{t('Shippingisfree')}</p>

                </div>
                <div className='BuyEndWrapper'>
                    <div className='BuyEnd'>
                        <div className='ReadAndAgree'>
                            <div
                                onClick={() => setChedker(!chedked)}>
                                {chedked
                                    ? <CheckedSvg />
                                    : <CheckSvg error={error?.checked == ''} />
                                }
                            </div>
                            <a className='textDD' style={error.checked ? { color: 'red' } : { color: '' }} href='https://shinetickets.com/PrivacyPolicy'>{t('Termsandconditions')}</a>
                        </div>
                        <div className='ReadAndAgree'>
                            <div style={{ marginLeft: 1 }}>
                                <MobileSvg />
                            </div>
                            <p>+374 93 55 88 44</p>
                        </div>
                    </div>
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
            </div>
        </div>
    )
}