import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'
import { PuffLoader } from 'react-spinners'

export const HP85 = ({ secion, eventId, soldTickets, sessionID }) => {
    const [activeButton, setActiveButton] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [position, setPosition] = useState({ x: '', y: '' })
    const [activeTicket, setActiveTicket] = useState({})

    const data = [
        { Id: '68', Row: '3', Seat: '24', Price: 2500, active: false },
        { Id: '68', Row: '3', Seat: '24', Price: 2500, active: false },
        { Id: '68', Row: '3', Seat: '24', Price: 2500, active: false },
        { Id: '67', Row: '3', Seat: '23', Price: 2500, active: false },
        { Id: '66', Row: '3', Seat: '22', Price: 2500, active: false },
        { Id: '65', Row: '3', Seat: '21', Price: 2500, active: false },
        { Id: '64', Row: '3', Seat: '20', Price: 2500, active: false },
        { Id: '63', Row: '3', Seat: '19', Price: 4000, active: true },
        { Id: '62', Row: '3', Seat: '18', Price: 4000, active: true },
        { Id: '61', Row: '3', Seat: '17', Price: 4000, active: true },
        { Id: '60', Row: '3', Seat: '16', Price: 4000, active: true },
        { Id: '59', Row: '3', Seat: '15', Price: 4000, active: true },
        { Id: '58', Row: '3', Seat: '14', Price: 4000, active: true },
        { Id: '57', Row: '3', Seat: '13', Price: 2500, active: false },
        { Id: '56', Row: '3', Seat: '12', Price: 2500, active: false },
        { Id: '55', Row: '3', Seat: '11', Price: 2500, active: false },
        { Id: '54', Row: '3', Seat: '10', Price: 2500, active: false },
        { Id: '53', Row: '3', Seat: '9', Price: 2500, active: false },
        { Id: '52', Row: '3', Seat: '8', Price: 2500, active: false },
        { Id: '51', Row: '3', Seat: '7', Price: 2500, active: false },
        { Id: '50', Row: '3', Seat: '6', Price: 2500, active: false },
        { Id: '49', Row: '3', Seat: '5', Price: 2500, active: false },
        { Id: '48', Row: '3', Seat: '4', Price: 2500, active: false },
        { Id: '47', Row: '3', Seat: '3', Price: 2500, active: false },
        { Id: '46', Row: '3', Seat: '2', Price: 2500, active: false },
        { Id: '45', Row: '3', Seat: '1', Price: 2500, active: false },
        { Id: '44', Row: '2', Seat: '22', Price: 2500, active: false },
        { Id: '43', Row: '2', Seat: '21', Price: 2500, active: false },
        { Id: '42', Row: '2', Seat: '20', Price: 2500, active: false },
        { Id: '41', Row: '2', Seat: '19', Price: 2500, active: false },
        { Id: '40', Row: '2', Seat: '18', Price: 2500, active: false },
        { Id: '39', Row: '2', Seat: '17', Price: 2500, active: false },
        { Id: '38', Row: '2', Seat: '16', Price: 2500, active: false },
        { Id: '37', Row: '2', Seat: '15', Price: 2500, active: false },
        { Id: '36', Row: '2', Seat: '14', Price: 2500, active: false },
        { Id: '35', Row: '2', Seat: '13', Price: 2500, active: false },
        { Id: '34', Row: '2', Seat: '12', Price: 4000, active: true },
        { Id: '33', Row: '2', Seat: '11', Price: 4000, active: true },
        { Id: '32', Row: '2', Seat: '10', Price: 4000, active: true },
        { Id: '31', Row: '2', Seat: '9', Price: 4000, active: true },
        { Id: '30', Row: '2', Seat: '8', Price: 4000, active: true },
        { Id: '29', Row: '2', Seat: '7', Price: 4000, active: true },
        { Id: '28', Row: '2', Seat: '6', Price: 2500, active: false },
        { Id: '27', Row: '2', Seat: '5', Price: 2500, active: false },
        { Id: '26', Row: '2', Seat: '4', Price: 2500, active: false },
        { Id: '25', Row: '2', Seat: '3', Price: 2500, active: false },
        { Id: '24', Row: '2', Seat: '2', Price: 2500, active: false },
        { Id: '23', Row: '2', Seat: '1', Price: 2500, active: false },
        { Id: '22', Row: '1', Seat: '22', Price: 2500, active: false },
        { Id: '21', Row: '1', Seat: '21', Price: 2500, active: false },
        { Id: '20', Row: '1', Seat: '20', Price: 2500, active: false },
        { Id: '19', Row: '1', Seat: '19', Price: 2500, active: false },
        { Id: '18', Row: '1', Seat: '18', Price: 2500, active: false },
        { Id: '17', Row: '1', Seat: '17', Price: 2500, active: false },
        { Id: '16', Row: '1', Seat: '16', Price: 2500, active: false },
        { Id: '15', Row: '1', Seat: '15', Price: 2500, active: false },
        { Id: '14', Row: '1', Seat: '14', Price: 2500, active: false },
        { Id: '13', Row: '1', Seat: '13', Price: 2500, active: false },
        { Id: '12', Row: '1', Seat: '12', Price: 2500, active: false },
        { Id: '11', Row: '1', Seat: '11', Price: 2500, active: false },
        { Id: '10', Row: '1', Seat: '10', Price: 2500, active: false },
        { Id: '9', Row: '1', Seat: '9', Price: 2500, active: false },
        { Id: '8', Row: '1', Seat: '8', Price: 2500, active: false },
        { Id: '7', Row: '1', Seat: '7', Price: 2500, active: false },
        { Id: '6', Row: '1', Seat: '6', Price: 4000, active: true },
        { Id: '5', Row: '1', Seat: '5', Price: 4000, active: true },
        { Id: '4', Row: '1', Seat: '4', Price: 4000, active: true },
        { Id: '3', Row: '1', Seat: '3', Price: 4000, active: true },
        { Id: '2', Row: '1', Seat: '2', Price: 4000, active: true },
        { Id: '1', Row: '1', Seat: '1', Price: 4000, active: true },
    ]

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

    // if (loading) {
    //     return <div className='loading'>
    //         <PuffLoader color="#FEE827" />
    //     </div>
    // }


    const [point, setPoint] = useState([
        { cx: 288, cy: 90, id: 1, active: false, Row: 1, Seat: 1 },
        { cx: 342, cy: 90, id: 2, active: false, Row: 1, Seat: 2 },
        { cx: 342, cy: 90, id: 3, active: false, Row: 1, Seat: 3 },
        { cx: 396, cy: 90, id: 4, active: false, Row: 1, Seat: 4 },
        { cx: 450, cy: 90, id: 5, active: false, Row: 1, Seat: 5 },
        { cx: 504, cy: 90, id: 6, active: false, Row: 1, Seat: 6 },
        { cx: 504, cy: 90, id: 7, active: false, Row: 1, Seat: 7 },
        { cx: 558.26, cy: 90, id: 8, active: false, Row: 1, Seat: 8 },
        { cx: 612.26, cy: 90, id: 9, active: false, Row: 1, Seat: 9 },
        { cx: 666.26, cy: 90, id: 10, active: false, Row: 1, Seat: 10 },
        { cx: 720.26, cy: 90, id: 11, active: false, Row: 1, Seat: 11 },
        { cx: 774.26, cy: 90, id: 12, active: false, Row: 1, Seat: 12 },
        { cx: 828.26, cy: 90, id: 13, active: false, Row: 1, Seat: 13 },
        { cx: 882.26, cy: 90, id: 14, active: false, Row: 1, Seat: 14 },
        { cx: 936, cy: 90, id: 15, active: false, Row: 1, Seat: 15 },
        { cx: 990.26, cy: 90, id: 16, active: false, Row: 1, Seat: 16 },
        { cx: 990.26, cy: 90, id: 17, active: false, Row: 1, Seat: 17 },
        { cx: 1044.26, cy: 90, id: 18, active: false, Row: 1, Seat: 18 },
        { cx: 1098.26, cy: 90, id: 19, active: false, Row: 1, Seat: 19 },
        { cx: 1098.26, cy: 90, id: 20, active: false, Row: 1, Seat: 20 },
        { cx: 1152.26, cy: 90, id: 21, active: false, Row: 1, Seat: 21 },
        { cx: 1206.26, cy: 90, id: 22, active: false, Row: 1, Seat: 22 },
        { cx: 1260.26, cy: 90, id: 23, active: false, Row: 1, Seat: 23 },
        { cx: 1314.26, cy: 90, id: 24, active: false, Row: 1, Seat: 24 },
        { cx: 1368, cy: 90, id: 25, active: false, Row: 1, Seat: 25 },
        { cx: 1422, cy: 90, id: 26, active: false, Row: 1, Seat: 26 },
        { cx: 1476, cy: 90, id: 27, active: false, Row: 1, Seat: 27 },
        { cx: 1530, cy: 90, id: 28, active: false, Row: 1, Seat: 2 },
        { cx: 558.26, cy: 144 },
        { cx: 342, cy: 144, id: 11, row: 1, Seat: '11', Price: '', active: false },
        { cx: 396, cy: 144, id: 11, row: 1, Seat: '11', Price: '', active: false },
        { cx: 450, cy: 144, id: 11, row: 1, Seat: '11', Price: '', active: false },
        { cx: 612.26, cy: 144 },
        { cx: 666.26, cy: 144 },
        { cx: 720.26, cy: 144 },
        { cx: 774.26, cy: 144 },
        { cx: 828.26, cy: 144 },
        { cx: 882.26, cy: 144 },
        { cx: 558.26, cy: 198 },
        { cx: 612.26, cy: 198 },
        { cx: 666.26, cy: 198 },
        { cx: 720.26, cy: 198 },
        { cx: 774.26, cy: 198 },
        { cx: 342, cy: 198 },
        { cx: 396, cy: 198 },
        { cx: 450, cy: 198 },
        { cx: 504, cy: 144 },
        { cx: 504, cy: 198 },
        { cx: 828.26, cy: 198 },
        { cx: 882.26, cy: 198 },
        { cx: 936, cy: 144 },
        { cx: 936, cy: 198 },
        { cx: 1422, cy: 198 },
        { cx: 1476, cy: 198 },
        { cx: 1422, cy: 144 },
        { cx: 1476, cy: 144 },
        { cx: 1368, cy: 144 },
        { cx: 1368, cy: 198 },
        { cx: 1152.26, cy: 144 },
        { cx: 1206.26, cy: 144 },
        { cx: 1260.26, cy: 144 },
        { cx: 1314.26, cy: 144 },
        { cx: 990.26, cy: 198 },
        { cx: 990.26, cy: 144 },
        { cx: 1098.26, cy: 198 },
        { cx: 1044.26, cy: 198 },
        { cx: 1044.26, cy: 144 },
        { cx: 1098.26, cy: 144 },
        { cx: 1152.26, cy: 198 },
        { cx: 1206.26, cy: 198 },
        { cx: 1260.26, cy: 198 },
        { cx: 1314.26, cy: 198 }
    ])

    const getPrice = (e, i) => {
        let x = e.clientX - 200
        let y = e.clientY - 100
        setPosition({ x, y })
        let item = point.find((elm) => elm.id === i)
        setActiveTicket({
            row: item?.row,
            price: item?.Price,
            seat: item?.Seat,
            seatId: i,
            sessionId: sessionID,
            parterre: true,
            amphitheater: false,
            stage: false,
            lodge: false,
            eventId: eventId,
        })
        setShowModal(true)
    }

    useEffect(() => {
        let item = [...point]
        item.map((elm, i) => {
            const filteredSeats = data.filter(seat => seat.Row == 1 && seat.Seat == 1);
            elm.Price = filteredSeats[0].Price
            elm.active = filteredSeats[0].active
        })
        setPoint(item)
        console.log(item)
    }, [])

    console.log(position)

    return <div className='hallWrapper'>
        <div className='hall' style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }} >
            <svg

                width={'700px'}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="svg920"
                x="0px"
                y="0px"
                viewBox="-280.8 -90.45 2433.6 783.9"
                style={{ enableBackground: 'new 0 0 1872 603', }}
                xmlSpace="preserve"
                preserveAspectRatio="xMidYMid meet"

            >
                <style>
                    {`.st0{fill:#FFFFFF;} .st1{fill:#9e9e9e38;stroke-width: 12px;stroke: white;}
        `}
                </style>
                <g>
                    <path d="M1553.59,603H318.41C406.15,482.59,649.51,396,936,396S1465.85,482.59,1553.59,603z"></path>
                    <g>
                        <g>
                            <path class="st0" d="M894.31,523.66v-38.3c0-4.08,1-7.21,2.99-9.4c1.99-2.18,4.93-3.28,8.82-3.28c3.89,0,6.83,1.09,8.82,3.28     c1.99,2.19,2.99,5.32,2.99,9.4v16.71h-7.92v-17.21c0-1.82-0.34-3.1-1.01-3.82c-0.67-0.72-1.63-1.08-2.88-1.08     c-1.25,0-2.21,0.36-2.88,1.08c-0.67,0.72-1.01,1.99-1.01,3.82v24.91h15.7v7.27h-15.7v6.62H894.31z"></path>
                            <path class="st0" d="M930.96,488.83v23.37c0,1.83,0.33,3.1,1.01,3.82c0.67,0.72,1.63,1.08,2.88,1.08c1.25,0,2.21-0.36,2.88-1.08     c0.67-0.72,1.01-1.99,1.01-3.82v-16.78h7.92v16.27c0,4.08-1,7.2-2.99,9.36c-1.99,2.16-4.93,3.24-8.82,3.24s-6.83-1.09-8.82-3.28     c-1.99-2.18-2.99-5.31-2.99-9.4v-38.38h7.92v8.29h15.7v7.29H930.96z"></path>
                            <path class="st0" d="M960.84,473.26v38.87c0,1.83,0.33,3.1,1.01,3.82c0.67,0.72,1.63,1.08,2.88,1.08s2.21-0.36,2.88-1.08     c0.67-0.72,1.01-2,1.01-3.82v-38.87h10.58v7.27h-2.66v31.03c0,4.08-1,7.21-2.99,9.39c-1.99,2.19-4.93,3.28-8.82,3.28     c-3.89,0-6.83-1.09-8.82-3.28c-1.99-2.18-2.99-5.31-2.99-9.39v-38.3H960.84z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M230.76,189.69c3.06,0,3.74-1.48,4.36-3.17h2.66v25.2h-3.96V192.5h-3.06V189.69z"></path>
                        </g>
                        <g>
                            <path d="M234.11,135.84c-1.26,0-2.05,0.68-2.05,2.48v2.7h-3.74v-2.45c0-4.03,2.02-6.33,5.9-6.33c3.89,0,5.9,2.3,5.9,6.33     c0,7.92-7.88,10.87-7.88,15.01c0,0.18,0,0.36,0.04,0.54h7.49v3.6h-11.45v-3.1c0-7.42,7.85-8.64,7.85-15.91     C236.16,136.45,235.37,135.84,234.11,135.84z"></path>
                        </g>
                        <g>
                            <path d="M235.94,86.38c0-2.27-0.79-2.88-2.05-2.88c-1.26,0-2.05,0.68-2.05,2.48v1.62h-3.74v-1.37c0-4.03,2.02-6.33,5.9-6.33     s5.9,2.3,5.9,6.33v0.65c0,2.7-0.86,4.39-2.77,5.18c1.98,0.86,2.77,2.74,2.77,5.29v1.98c0,4.03-2.02,6.33-5.9,6.33     s-5.9-2.3-5.9-6.33v-2.09h3.74v2.34c0,1.8,0.79,2.48,2.05,2.48c1.26,0,2.05-0.61,2.05-2.84v-1.98c0-2.34-0.79-3.2-2.59-3.2h-1.33     v-3.6h1.55c1.48,0,2.38-0.65,2.38-2.66V86.38z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M1580.76,189.69c3.06,0,3.74-1.48,4.36-3.17h2.66v25.2h-3.96V192.5h-3.06V189.69z"></path>
                        </g>
                        <g>
                            <path d="M1584.11,135.84c-1.26,0-2.05,0.68-2.05,2.48v2.7h-3.74v-2.45c0-4.03,2.02-6.33,5.9-6.33c3.89,0,5.9,2.3,5.9,6.33     c0,7.92-7.88,10.87-7.88,15.01c0,0.18,0,0.36,0.04,0.54h7.49v3.6h-11.45v-3.1c0-7.42,7.85-8.64,7.85-15.91     C1586.16,136.45,1585.37,135.84,1584.11,135.84z"></path>
                        </g>
                        <g>
                            <path d="M1585.94,86.38c0-2.27-0.79-2.88-2.05-2.88c-1.26,0-2.05,0.68-2.05,2.48v1.62h-3.74v-1.37c0-4.03,2.02-6.33,5.9-6.33     s5.9,2.3,5.9,6.33v0.65c0,2.7-0.86,4.39-2.77,5.18c1.98,0.86,2.77,2.74,2.77,5.29v1.98c0,4.03-2.02,6.33-5.9,6.33     s-5.9-2.3-5.9-6.33v-2.09h3.74v2.34c0,1.8,0.79,2.48,2.05,2.48c1.26,0,2.05-0.61,2.05-2.84v-1.98c0-2.34-0.79-3.2-2.59-3.2h-1.33     v-3.6h1.55c1.48,0,2.38-0.65,2.38-2.66V86.38z"></path>
                        </g>
                    </g>
                    <g>
                        {point.map((e, i) => {
                            return <circle
                                onMouseOver={(e) => {
                                    getPrice(e, e.cy, i, e.cx)
                                    setActiveButton(i)
                                }}

                                onMouseLeave={() => {
                                    setShowModal(false)
                                    setActiveButton(null)
                                }}

                                class="st1" cx={e.cx} cy={e.cy} r="18" id="circle_23"></circle>
                        })}
                    </g>
                </g>
            </svg>
            {showModal &&
                <div style={{ top: position.y, left: position.x, position: 'absolute' }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div>

    </div >
}