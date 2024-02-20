import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'

const AramKhachatryan = ({ secion, eventId, soldTickets, sessionID, pading, value, places, isInteracting }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const { tickets } = useSelector((st) => st.tiketsForBuy)

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

    const [seansArr, setSeansArr] = useState([
    ])

    useEffect(() => {
        if (places.length > 0) {
            setSeansArr(JSON.parse(places[0]))
        }
    }, [places])
    // useEffect(() => {
    //     let item = [...seansArr]
    //     secion.map((elm, i) => {
    //         elm.price.map((e, index) => {
    //             item.filter((e) => e.section === elm.section).filter((el) => el.row === e.row).map((ell, ii) => {
    //                 ell.price = e.price
    //             })
    //         })
    //     })
    //     setSeansArr(item)
    // }, [secion])


    const [data, setData] = useState([])

    const getPrice = (y, i, x, parterre, amphitheater, lodge) => {
        let temp = [...data]
        // if (temp.findIndex((el) => el.id == i) == -1) {
        //     temp.push({ "id": i, "price": "", "row": 1, "seat": temp.length + 1, LevelId: 6, balcony: true, active: false },)
        // }

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

    const addTicket = (i, price, id, parterre, amphitheater, lodge) => {
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
        let temp = seansArr.find((elm) => elm.id === i)
        if (windowSize.width <= 768) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 5000)
            item = {
                row: temp.row,
                price: temp.price,
                seat: temp.seat,
                seatId: i,
                sessionId: sessionID,
                parterre: temp.parterre,
                amphitheater: temp.amphitheater,
                lodge: temp.lodge,
                eventId: eventId,
                stage: item.stage,
            }
        }
        else {
            item = activeTicket
        }
        if (data[i].active) {
            dispatch(SetTicketsAction(item))
        }
        else {
            dispatch(RemoveTicketsAction(item))
        }
        setCoordinatesState(data)
    }

    useEffect(() => {
        const image = new Image()
        image.src = require('../../assets/Aram-w.png')

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
                alt='' src={require('../../assets/Aram.png')} />
            {coordinatesState.map((e, i) => {
                let top = -15
                let left = 10
                let roted = -75
                // if (i == 219 || i == 212 || i == 204 || i == 196) {
                //     top = -15
                //     left = -5
                //     roted = -75
                // }
                // if (i == 86 || i == 82 || i == 77 || i == 73) {
                //     top = -9
                //     left = -4
                //     roted = -40
                // }
                // if (i == 219 || i == 212 || i == 204 || i == 196 || i == 86 || i == 82 || i == 77 || i == 73)
                if (i == 529 || i == 523 || i == 519 || i == 531 || i == 434 || i == 428 || i == 421 || i == 416) {
                    top = -6
                    left = -8
                    roted = -10
                }

                if (i == 579 || i == 590 || i == 597 || i == 606) {
                    top = -30
                    left = -5
                    roted = 15
                }
                if (i == 181 || i == 173 || i == 166 || i == 160) {
                    top = -16
                    left = -4
                    roted = -72
                }
                if (i == 70 || i == 67 || i == 64 || i == 60) {
                    top = -5
                    left = -7
                    roted = -15
                }
                if (i == 97 || i == 104 || i == 111 || i == 117) {
                    top = -26
                    left = 2
                    roted = 40
                }

                if (i == 219 || i == 212 || i == 204 || i == 196) {
                    top = -16
                    left = -3
                    roted = -70
                }
                if (i == 1025 || i == 1043 || i == 1037 || i == 1032) {
                    top = -6
                    left = -8
                    roted = -15
                }
                if (i == 1224 || i == 1210 || i == 1197) {
                    top = -15
                    left = -3
                    roted = -72
                }
                if (i == 1230) {
                    top = -6
                    left = 20
                    roted = -72
                }

                if (i == 1049) {
                    top = -5
                    left = -18
                    roted = 50
                }
                if (i == 1083 || i == 1103 || i == 1119) {
                    top = -13
                    left = 10
                    roted = 50
                }
                if (i == 1219 || i == 1205 || i == 1185) {
                    top = -5
                    left = 20
                    roted = -73
                }
                if (i == 1198) {
                    top = -16
                    left = -5
                    roted = -73
                }
                if (i == 837 || i == 856 || i == 866) {
                    top = -20
                    left = 28
                    roted = 16
                }
                if (i == 828) {
                    top = -4
                    left = -12
                    roted = 16
                }
                if (i == 735 || i == 725 || i == 717 || i == 712) {
                    top = -12
                    left = 15
                    roted = -20
                }
                // if (i == 800) {
                //     top = -17
                //     left = 15
                //     roted = -20
                // }
                // if (i == 773) {
                //     top = -8
                //     left = 16
                //     roted = -20
                // }
                // if (i == 770) {
                //     top = -10
                //     left = 18
                //     roted = -20
                // }
                // if (i == 735 || i == 725 || i == 717 || i == 712 || i == 60 || i == 828 || i == 1224 || i == 1210 || i == 1197 || i == 1230 || i == 529 || i == 523 || i == 519 || i == 531 || i == 579 || i == 590 || i == 597 || i == 606 || i == 434 || i == 428 || i == 421 || i == 416 || i == 181 || i == 173 || i == 166 || i == 160 || i == 70 || i == 67 || i == 64 || i == 97 || i == 104 || i == 111 || i == 117 || i == 219 || i == 212 || i == 204 || i == 196 || i == 1043 || i == 1037 || i == 1032 || i == 1025 || i == 1083 || i == 1083 || i == 1103 || i == 1119 || i == 1049 || i == 1219 || i == 1205 || i == 1185 || i == 1198 || i == 837 || i == 856 || i == 866 || i == 828)

                if (seansArr.find((e) => e.id == i)?.price && seansArr.find((e) => e.id == i)?.price > 0) {
                    if (soldTickets.findIndex((elm) => elm.id == e.id) < 0) {
                        return <button
                            key={i}
                            onMouseOver={() => {
                                if (!isInteracting) {
                                    getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                                    setActiveButton(i)
                                }
                            }}
                            style={
                                {
                                    top: e?.y + top, left: e?.x + left,
                                    backgroundColor: tickets.find((elm) => elm.seatId == e.id) && 'green',
                                    transform: ` rotate(${roted}deg)`,
                                }
                            }
                            id='seatStyleAram'
                            className={[
                                i == activeButton ? 'activeButton' : '',
                                e.active ? "addTicketButton" : '']}
                            onMouseLeave={() => {
                                setShowModal(false)
                                setActiveButton(null)
                            }}
                            onClick={() => {
                                if (windowSize.width > 768 && !isInteracting) {
                                    addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                }
                            }
                            }
                            onTouchStart={() => {
                                if (windowSize.width <= 768 && !isInteracting) {
                                    getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                                    setActiveButton(i)
                                }
                                if (isInteracting) {
                                    setActiveButton(null)
                                }
                            }}
                            onTouchEnd={() => {
                                if (windowSize.width <= 768 && !isInteracting) {
                                    addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                    // addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                    // addTicket(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                                }
                                if (isInteracting) {
                                    setActiveButton(null)
                                }
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.854736 5.0903H1.58107V7.19807H0.854736V5.0903Z" fill="#1E4751" />
                                <path d="M1.64802 7.19516H0.787724C0.701558 7.19516 0.631714 7.1253 0.631714 7.03914V6.91943C0.631714 6.83325 0.701558 6.7634 0.787724 6.7634H1.64801C1.73417 6.7634 1.80402 6.83326 1.80402 6.91943V7.03914C1.80402 7.12532 1.73419 7.19516 1.64802 7.19516ZM4.41895 5.0903H5.14534V7.19807H4.41895V5.0903Z" fill="#1E4751" />
                                <path d="M5.08444 4.61259H0.915588V0.915744C0.915588 0.410009 1.3256 0 1.83133 0H4.16871C4.67443 0 5.08444 0.410009 5.08444 0.915744V4.61259Z" fill="#F43B45" />
                                <path d="M4.16869 0H3.42714C3.93287 0 4.34288 0.410009 4.34288 0.915744V4.61259H5.08442V0.915744C5.08442 0.410009 4.67442 0 4.16869 0ZM0.915575 5.16658V3.08606C0.915575 2.94613 0.802121 2.83267 0.662194 2.83267H0.253381C0.113454 2.83267 0 2.94612 0 3.08606V4.25101C0 4.75669 0.409896 5.16658 0.915575 5.16658Z" fill="#D82B2B" />
                                <path d="M5.08441 5.16659V3.08607C5.08441 2.94614 5.19787 2.83267 5.33786 2.83267H5.74661C5.88653 2.83267 5.99999 2.94613 5.99999 3.08607V4.25102C5.99999 4.75669 5.59009 5.16659 5.08441 5.16659Z" fill="#F43B45" />
                                <path d="M5.12545 5.72473H0.874607C0.740444 5.72473 0.631714 5.61598 0.631714 5.48182V4.89328H5.3683V5.48182C5.3683 5.61598 5.25955 5.72471 5.12545 5.72471V5.72473Z" fill="#345863" />
                                <path d="M5.37849 5.30899H0.621478C0.38435 5.30899 0.192139 5.11678 0.192139 4.87964C0.192139 4.50413 0.496595 4.19968 0.872117 4.19968H5.12785C5.50343 4.19968 5.80783 4.50413 5.80783 4.87966C5.80783 5.11678 5.61562 5.30899 5.37849 5.30899Z" fill="#FF4A5C" />
                                <path d="M5.21228 7.19515H4.35201C4.26583 7.19515 4.19598 7.1253 4.19598 7.03913V6.91942C4.19598 6.83324 4.26584 6.7634 4.35201 6.7634H5.21228C5.29844 6.7634 5.3683 6.83325 5.3683 6.91942V7.03913C5.3683 7.12531 5.29843 7.19515 5.21228 7.19515Z" fill="#1E4751" />
                            </svg>
                        </button>
                    }
                }
            })}

            {showModal &&
                <div
                    onMouseEnter={() => {
                        setShowModal(true)
                    }}
                    onMouseLeave={() => {
                        setShowModal(false)
                    }}
                    style={{
                        top: position.y - 130 - (
                            (value.scale < 0.69) && 20 / value.scale), left: position.x - 40, position: 'absolute', transform: `scale(${1 / (value.scale + 0.3)})`
                    }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div>
    )
}
export default AramKhachatryan
