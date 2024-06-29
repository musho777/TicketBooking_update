import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'

const Karendemrjyanmec = ({ eventId, soldTickets, sessionID, pading, value, places, isInteracting, price }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const { tickets } = useSelector((st) => st.tiketsForBuy)
    const [click, setClick] = useState(isInteracting)
    const [opneModal, setOpenModal] = useState(false)

    useEffect(() => {
        setClick(isInteracting)
    }, [isInteracting])

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [seansArr, setSeansArr] = useState([])

    useEffect(() => {
        if (places?.length > 0) {
            setSeansArr(JSON.parse(places[0]))
        }
    }, [places])


    const [data, setData] = useState('')


    const getPrice = (y, i, x) => {
        console.log(x, y)
        let temp = [...data]
        if (temp.findIndex((el) => el.id == i) == -1) {
            temp.push({
                "id": i,
                "price": "",
                "row": 23,
                "seat": temp.length + 54,
                "place": "right tribune",
                "Sector": 5,
                "active": false
            },)
        }

        // "id": 1081,
        // "price": "",
        // "row": 17,
        // "seat": 12,
        // "Sector": 2,
        // "place": "Left tribune",
        // "active": false



        setData(temp)
        setPosition({ x, y })
        let item = seansArr.find((elm) => elm.id === i)
        setActiveTicket({
            row: item?.row,
            price: item?.price,
            seat: item?.seat,
            seatId: i,
            sessionId: sessionID,
            parterre: item?.parterre,
            amphitheater: item?.amphitheater,
            stage: item?.stage,
            lodge: item?.lodge,
            eventId: eventId,
        })
        setShowModal(true)
    }

    const addTicket = (i, type = 'denc', price) => {
        let data = [...coordinatesState]
        // data[i].active = !data[i].active
        let data1 = [...tickets]
        if (data1.findIndex((elm) => elm.seatId == i) < 0) {
            data[i].active = true
        }
        else {
            data[i].active = false
        }
        let item = {}
        if (windowSize.width <= 768) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 5000)
        }
        item = activeTicket
        // "id": 0,
        // "price": "",
        // "row": 0,
        // "seat": 0,
        // "place": "danceFloor",
        // "Sector": 0,
        // "active": false

        if (type == 'denc') {
            item.price = price
            item.id = 0
            item.row = 0
            item.seat = 0
            item.place = 0
            item.Sector = 0
        }
        if (data[i].active) {
            dispatch(SetTicketsAction(item))
        }
        else {
            dispatch(RemoveTicketsAction(item))
        }
        setCoordinatesState(data)
    }

    console.log('ticket', tickets)

    useEffect(() => {
        const image = new Image()
        image.src = require('../../assets/hamalir7000.png')
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)

            const imageData = ctx.getImageData(0, 0, image.width, image.height)
            const pixelData = imageData.data
            const coordinates = []

            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    const offset = (y * image.width + x) * 4
                    const r = pixelData[offset]
                    const g = pixelData[offset + 1]
                    const b = pixelData[offset + 2]

                    if (r >= 100 && g <= 35 && b <= 35) {
                        coordinates.push({ x, y, active: false, id: coordinates.length })
                    }
                }
            }
            setCoordinatesState(coordinates)
        };
    }, []);

    return (
        <div >
            <img
                style={{ paddingTop: pading, paddingLeft: pading }}
                className="zoomable-image"
                alt='' src={require('../../assets/hamalir7000.png')} />
            <button
                onMouseOver={() => {
                    getPrice(800, 0, 2000, 'parahraparal')
                }}
                onMouseLeave={() => {
                    setShowModal(false)
                }}
                onClick={() => {
                    if (!click) {
                        addTicket(1, 'denc', 6000)
                    }
                }
                }
                onTouchStart={() => {
                    if (!click) {
                        getPrice(800, 0, 2000, 'parahraparal')
                        // getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                    }
                }}
                onTouchEnd={() => {
                    if (!click) {
                        addTicket(1, 'denc', 6000)
                        // addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                    }
                }}

                style={{ position: 'absolute', border: 'none', padding: 20, background: 'black', color: 'white', left: 1670, top: 700, fontSize: 50, }}>պարահրապարակ</button>
            {
                coordinatesState.map((e, i) => {
                    let top = 0
                    let left = -5
                    let roted = 0
                    if (e.x >= 1053 && e.x <= 1147 && e.y >= 2104 && e.y <= 2364) {
                        top = -15
                        left = 0
                        roted = -90
                    }
                    if ((e.x == 1124 || e.x == 1053 || e.x == 746 || e.x == 676 || e.x == 652 || e.x == 488 || e.x == 442 || e.x == 817 || e.x == 793) && (e.y == 2103 || e.y == 1852 || e.y == 1861 || e.y == 1842 || e.y == 1833)) {
                        top = -15
                        left = 0
                        roted = -90
                    }
                    if ((e.x == 1053 && e.y == 1788)) {
                        top = -15
                        left = 0
                        roted = -90
                    }
                    else if (e.x >= 512 && e.x <= 745 && e.y >= 2117 && e.y <= 2536) {
                        top = -15
                        left = 0
                        roted = -90
                    }
                    else if (e.x >= 1007 && e.x <= 1107 && e.y >= 1789 && e.y <= 2063) {
                        top = -15
                        left = -0
                        roted = -90
                    }
                    else if (e.x >= 442 && e.x <= 817 && e.y >= 1842 && e.y <= 2166) {
                        top = -15
                        left = -0
                        roted = -90
                    }


                    else if (e.x >= 1006 && e.x <= 1147 && e.y >= 843 && e.y <= 1104) {
                        top = -15
                        left = -0
                        roted = -90
                    }

                    else if (e.x >= 536 && e.x <= 606 && e.y >= 690 && e.y <= 1105) {
                        top = -15
                        left = -0
                        roted = -90
                    }
                    else if (e.x >= 2725 && e.x <= 2772 && e.y >= 1473 && e.y <= 1733) {
                        top = -15
                        left = 4
                        roted = 90
                    }

                    else if (e.x >= 3080 && e.x <= 3338 && e.y >= 1427 && e.y <= 1761) {
                        top = -15
                        left = 4
                        roted = 90
                    }

                    else if (e.x >= 2962 && e.x <= 3276 && e.y >= 1059 && e.y <= 1761) {
                        top = -15
                        left = 4
                        roted = 90
                    }

                    if (seansArr.find((e) => e.id == i)?.price && seansArr.find((e) => e.id == i)?.price > 0) {
                        if (soldTickets.findIndex((elm) => elm.id == e.id) < 0) {
                            return <button
                                key={i}
                                onMouseOver={() => {
                                    getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                                }}
                                style={
                                    {
                                        top: e?.y + top, left: e?.x + left,
                                        backgroundColor: tickets.find((elm) => elm.seatId == e.id) && '#24005C',
                                        transform: ` rotate(${roted}deg)`,
                                    }
                                }
                                id='seatStyle2'
                                onMouseLeave={() => {
                                    setShowModal(false)
                                }}
                                onClick={() => {
                                    if (!click) {
                                        addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                    }
                                }
                                }
                                onTouchStart={() => {
                                    if (!click) {
                                        getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                                    }
                                }}
                                onTouchEnd={() => {
                                    if (!click) {
                                        addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                    }
                                }}
                            >
                                {
                                    !tickets.find((elm) => elm.seatId == e.id) &&
                                    price.map((el, ind) => {
                                        if (el.price == seansArr.find((e) => e.id == i)?.price && el.active == 1) {
                                            return el.seat
                                        }
                                    })
                                }
                            </button>
                        }
                    }
                })
            }

            {
                showModal &&
                <div
                    onMouseEnter={() => {
                        setShowModal(true)
                    }}
                    onMouseLeave={() => {
                        setShowModal(false)
                    }}
                    style={{
                        top: position.y - 135 - (
                            (value.scale < 0.69) && 20 / value.scale), left: position.x - 50, position: 'absolute', transform: `scale(${1 / (value.scale + 0.3)})`
                    }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div >
    )
}
export default Karendemrjyanmec
