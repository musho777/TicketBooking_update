import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'
import { MD5 } from 'crypto-js'
import axios from 'axios'

const Paronyan = ({ grupID, eventId, Timeline, sessionID, pading, id, open }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const { tickets } = useSelector((st) => st.tiketsForBuy)

    const [seatArr, setSeatArr] = useState([])

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

    const GetEventSeat = async () => {
        const keys = "hYDepOnSarMi";
        const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
        const requestType = "getRow";
        const params = {
            group_id: grupID,
            timeline_id: Timeline,
            event_id: id,
        };
        const sortedParams = Object.fromEntries(Object.entries(params).sort());
        sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();

        const options = {
            method: 'POST',
            url: `https://api.haytoms.am/sync/${secretKey}/${requestType}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: JSON.stringify(sortedParams),
        };

        const response = await axios(options)
        setSeatArr(response.data.data?.Levels)

    }

    useEffect(() => {
        GetEventSeat()
    }, [open])


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [seansArr, setSeansArr] = useState([
        { "id": 37, "price": "", "row": 1, "seat": 1, LevelId: 6, balcony2: true, },
        { "id": 36, "price": "", "row": 1, "seat": 2, LevelId: 6, balcony2: true, },
        { "id": 33, "price": "", "row": 1, "seat": 3, LevelId: 6, balcony2: true, },
        { "id": 31, "price": "", "row": 1, "seat": 4, LevelId: 6, balcony2: true, },
        { "id": 29, "price": "", "row": 1, "seat": 5, LevelId: 6, balcony2: true, },
        { "id": 27, "price": "", "row": 1, "seat": 6, LevelId: 6, balcony2: true, },
        { "id": 24, "price": "", "row": 1, "seat": 7, LevelId: 6, balcony2: true, },

        { "id": 34, "price": "", "row": 1, "seat": 1, LevelId: 5, balcony3: true, },
        { "id": 35, "price": "", "row": 1, "seat": 2, LevelId: 5, balcony3: true, },
        { "id": 32, "price": "", "row": 1, "seat": 3, LevelId: 5, balcony3: true, },
        { "id": 30, "price": "", "row": 1, "seat": 4, LevelId: 5, balcony3: true, },
        { "id": 28, "price": "", "row": 1, "seat": 5, LevelId: 5, balcony3: true, },
        { "id": 26, "price": "", "row": 1, "seat": 6, LevelId: 5, balcony3: true, },
        { "id": 25, "price": "", "row": 1, "seat": 7, LevelId: 5, balcony3: true, },


        { "id": 0, "price": "", "row": 1, "seat": 1, LevelId: 4, balcony: true, },
        { "id": 1, "price": "", "row": 1, "seat": 2, LevelId: 4, balcony: true, },
        { "id": 2, "price": "", "row": 1, "seat": 3, LevelId: 4, balcony: true, },
        { "id": 3, "price": "", "row": 1, "seat": 4, LevelId: 4, balcony: true, },
        { "id": 4, "price": "", "row": 1, "seat": 5, LevelId: 4, balcony: true, },
        { "id": 5, "price": "", "row": 1, "seat": 6, LevelId: 4, balcony: true, },
        { "id": 6, "price": "", "row": 1, "seat": 7, LevelId: 4, balcony: true, },
        { "id": 7, "price": "", "row": 1, "seat": 8, LevelId: 4, balcony: true, },
        { "id": 8, "price": "", "row": 1, "seat": 9, LevelId: 4, balcony: true, },
        { "id": 9, "price": "", "row": 1, "seat": 10, LevelId: 4, balcony: true, },
        { "id": 10, "price": "", "row": 1, "seat": 11, LevelId: 4, balcony: true, },
        { "id": 11, "price": "", "row": 1, "seat": 12, LevelId: 4, balcony: true, },
        { "id": 12, "price": "", "row": 1, "seat": 13, LevelId: 4, balcony: true, },
        { "id": 13, "price": "", "row": 1, "seat": 14, LevelId: 4, balcony: true, },
        { "id": 14, "price": "", "row": 1, "seat": 15, LevelId: 4, balcony: true, },
        { "id": 15, "price": "", "row": 1, "seat": 16, LevelId: 4, balcony: true, },
        { "id": 16, "price": "", "row": 1, "seat": 17, LevelId: 4, balcony: true, },
        { "id": 17, "price": "", "row": 1, "seat": 18, LevelId: 4, balcony: true, },
        { "id": 18, "price": "", "row": 1, "seat": 19, LevelId: 4, balcony: true, },
        { "id": 19, "price": "", "row": 1, "seat": 20, LevelId: 4, balcony: true, },
        { "id": 20, "price": "", "row": 1, "seat": 21, LevelId: 4, balcony: true, },
        { "id": 21, "price": "", "row": 1, "seat": 22, LevelId: 4, balcony: true, },
        { "id": 22, "price": "", "row": 1, "seat": 23, LevelId: 4, balcony: true, },
        { "id": 23, "price": "", "row": 1, "seat": 24, LevelId: 4, balcony: true, },

        { "id": 121, "price": "", "row": 1, "seat": 27, LevelId: 3, balcony: true, },
        { "id": 122, "price": "", "row": 1, "seat": 26, LevelId: 3, balcony: true, },
        { "id": 123, "price": "", "row": 1, "seat": 25, LevelId: 3, balcony: true, },
        { "id": 124, "price": "", "row": 1, "seat": 24, LevelId: 3, balcony: true, },
        { "id": 125, "price": "", "row": 1, "seat": 23, LevelId: 3, balcony: true, },
        { "id": 126, "price": "", "row": 1, "seat": 22, LevelId: 3, balcony: true, },
        { "id": 127, "price": "", "row": 1, "seat": 21, LevelId: 3, balcony: true, },
        { "id": 128, "price": "", "row": 1, "seat": 20, LevelId: 3, balcony: true, },
        { "id": 129, "price": "", "row": 1, "seat": 19, LevelId: 3, balcony: true, },
        { "id": 130, "price": "", "row": 1, "seat": 18, LevelId: 3, balcony: true, },
        { "id": 131, "price": "", "row": 1, "seat": 17, LevelId: 3, balcony: true, },
        { "id": 132, "price": "", "row": 1, "seat": 16, LevelId: 3, balcony: true, },
        { "id": 133, "price": "", "row": 1, "seat": 15, LevelId: 3, balcony: true, },
        { "id": 134, "price": "", "row": 1, "seat": 14, LevelId: 3, balcony: true, },
        { "id": 135, "price": "", "row": 1, "seat": 13, LevelId: 3, balcony: true, },
        { "id": 136, "price": "", "row": 1, "seat": 12, LevelId: 3, balcony: true, },
        { "id": 137, "price": "", "row": 1, "seat": 11, LevelId: 3, balcony: true, },
        { "id": 138, "price": "", "row": 1, "seat": 10, LevelId: 3, balcony: true, },
        { "id": 139, "price": "", "row": 1, "seat": 9, LevelId: 3, balcony: true, },
        { "id": 140, "price": "", "row": 1, "seat": 8, LevelId: 3, balcony: true, },
        { "id": 141, "price": "", "row": 1, "seat": 7, LevelId: 3, balcony: true, },
        { "id": 142, "price": "", "row": 1, "seat": 6, LevelId: 3, balcony: true, },
        { "id": 143, "price": "", "row": 1, "seat": 5, LevelId: 3, balcony: true, },
        { "id": 144, "price": "", "row": 1, "seat": 4, LevelId: 3, balcony: true, },
        { "id": 145, "price": "", "row": 1, "seat": 3, LevelId: 3, balcony: true, },
        { "id": 146, "price": "", "row": 1, "seat": 2, LevelId: 3, balcony: true, },
        { "id": 147, "price": "", "row": 1, "seat": 1, LevelId: 3, balcony: true, },

        { "id": 94, "price": "", "row": 2, "seat": 27, LevelId: 3, balcony: true, },
        { "id": 95, "price": "", "row": 2, "seat": 26, LevelId: 3, balcony: true, },
        { "id": 96, "price": "", "row": 2, "seat": 25, LevelId: 3, balcony: true, },
        { "id": 97, "price": "", "row": 2, "seat": 24, LevelId: 3, balcony: true, },
        { "id": 98, "price": "", "row": 2, "seat": 23, LevelId: 3, balcony: true, },
        { "id": 99, "price": "", "row": 2, "seat": 22, LevelId: 3, balcony: true, },
        { "id": 100, "price": "", "row": 2, "seat": 21, LevelId: 3, balcony: true, },
        { "id": 101, "price": "", "row": 2, "seat": 20, LevelId: 3, balcony: true, },
        { "id": 102, "price": "", "row": 2, "seat": 19, LevelId: 3, balcony: true, },
        { "id": 103, "price": "", "row": 2, "seat": 18, LevelId: 3, balcony: true, },
        { "id": 104, "price": "", "row": 2, "seat": 17, LevelId: 3, balcony: true, },
        { "id": 105, "price": "", "row": 2, "seat": 16, LevelId: 3, balcony: true, },
        { "id": 106, "price": "", "row": 2, "seat": 15, LevelId: 3, balcony: true, },
        { "id": 107, "price": "", "row": 2, "seat": 14, LevelId: 3, balcony: true, },
        { "id": 108, "price": "", "row": 2, "seat": 13, LevelId: 3, balcony: true, },
        { "id": 109, "price": "", "row": 2, "seat": 12, LevelId: 3, balcony: true, },
        { "id": 110, "price": "", "row": 2, "seat": 11, LevelId: 3, balcony: true, },
        { "id": 111, "price": "", "row": 2, "seat": 10, LevelId: 3, balcony: true, },
        { "id": 112, "price": "", "row": 2, "seat": 9, LevelId: 3, balcony: true, },
        { "id": 113, "price": "", "row": 2, "seat": 8, LevelId: 3, balcony: true, },
        { "id": 114, "price": "", "row": 2, "seat": 7, LevelId: 3, balcony: true, },
        { "id": 115, "price": "", "row": 2, "seat": 6, LevelId: 3, balcony: true, },
        { "id": 116, "price": "", "row": 2, "seat": 5, LevelId: 3, balcony: true, },
        { "id": 117, "price": "", "row": 2, "seat": 4, LevelId: 3, balcony: true, },
        { "id": 118, "price": "", "row": 2, "seat": 3, LevelId: 3, balcony: true, },
        { "id": 119, "price": "", "row": 2, "seat": 2, LevelId: 3, balcony: true, },
        { "id": 120, "price": "", "row": 2, "seat": 1, LevelId: 3, balcony: true, },

        { "id": 68, "price": "", "row": 3, "seat": 26, LevelId: 3, balcony: true, },
        { "id": 69, "price": "", "row": 3, "seat": 25, LevelId: 3, balcony: true, },
        { "id": 70, "price": "", "row": 3, "seat": 24, LevelId: 3, balcony: true, },
        { "id": 71, "price": "", "row": 3, "seat": 23, LevelId: 3, balcony: true, },
        { "id": 72, "price": "", "row": 3, "seat": 22, LevelId: 3, balcony: true, },
        { "id": 73, "price": "", "row": 3, "seat": 21, LevelId: 3, balcony: true, },
        { "id": 74, "price": "", "row": 3, "seat": 20, LevelId: 3, balcony: true, },
        { "id": 75, "price": "", "row": 3, "seat": 19, LevelId: 3, balcony: true, },
        { "id": 76, "price": "", "row": 3, "seat": 18, LevelId: 3, balcony: true, },
        { "id": 77, "price": "", "row": 3, "seat": 17, LevelId: 3, balcony: true, },
        { "id": 78, "price": "", "row": 3, "seat": 16, LevelId: 3, balcony: true, },
        { "id": 79, "price": "", "row": 3, "seat": 15, LevelId: 3, balcony: true, },
        { "id": 80, "price": "", "row": 3, "seat": 14, LevelId: 3, balcony: true, },
        { "id": 81, "price": "", "row": 3, "seat": 13, LevelId: 3, balcony: true, },
        { "id": 82, "price": "", "row": 3, "seat": 12, LevelId: 3, balcony: true, },
        { "id": 83, "price": "", "row": 3, "seat": 11, LevelId: 3, balcony: true, },
        { "id": 84, "price": "", "row": 3, "seat": 10, LevelId: 3, balcony: true, },
        { "id": 85, "price": "", "row": 3, "seat": 9, LevelId: 3, balcony: true, },
        { "id": 86, "price": "", "row": 3, "seat": 8, LevelId: 3, balcony: true, },
        { "id": 87, "price": "", "row": 3, "seat": 7, LevelId: 3, balcony: true, },
        { "id": 88, "price": "", "row": 3, "seat": 6, LevelId: 3, balcony: true, },
        { "id": 89, "price": "", "row": 3, "seat": 5, LevelId: 3, balcony: true, },
        { "id": 90, "price": "", "row": 3, "seat": 4, LevelId: 3, balcony: true, },
        { "id": 91, "price": "", "row": 3, "seat": 3, LevelId: 3, balcony: true, },
        { "id": 92, "price": "", "row": 3, "seat": 2, LevelId: 3, balcony: true, },
        { "id": 93, "price": "", "row": 3, "seat": 1, LevelId: 3, balcony: true, },

        { "id": 52, "price": "", "row": 4, "seat": 16, LevelId: 3, balcony: true, },
        { "id": 53, "price": "", "row": 4, "seat": 15, LevelId: 3, balcony: true, },
        { "id": 54, "price": "", "row": 4, "seat": 14, LevelId: 3, balcony: true, },
        { "id": 55, "price": "", "row": 4, "seat": 13, LevelId: 3, balcony: true, },
        { "id": 56, "price": "", "row": 4, "seat": 12, LevelId: 3, balcony: true, },
        { "id": 57, "price": "", "row": 4, "seat": 11, LevelId: 3, balcony: true, },
        { "id": 58, "price": "", "row": 4, "seat": 10, LevelId: 3, balcony: true, },
        { "id": 59, "price": "", "row": 4, "seat": 9, LevelId: 3, balcony: true, },
        { "id": 60, "price": "", "row": 4, "seat": 8, LevelId: 3, balcony: true, },
        { "id": 61, "price": "", "row": 4, "seat": 7, LevelId: 3, balcony: true, },
        { "id": 62, "price": "", "row": 4, "seat": 6, LevelId: 3, balcony: true, },
        { "id": 63, "price": "", "row": 4, "seat": 5, LevelId: 3, balcony: true, },
        { "id": 64, "price": "", "row": 4, "seat": 4, LevelId: 3, balcony: true, },
        { "id": 65, "price": "", "row": 4, "seat": 3, LevelId: 3, balcony: true, },
        { "id": 66, "price": "", "row": 4, "seat": 2, LevelId: 3, balcony: true, },
        { "id": 67, "price": "", "row": 4, "seat": 1, LevelId: 3, balcony: true, },

        { "id": 38, "price": "", "row": 5, "seat": 14, LevelId: 3, balcony: true, },
        { "id": 39, "price": "", "row": 5, "seat": 13, LevelId: 3, balcony: true, },
        { "id": 40, "price": "", "row": 5, "seat": 12, LevelId: 3, balcony: true, },
        { "id": 41, "price": "", "row": 5, "seat": 11, LevelId: 3, balcony: true, },
        { "id": 42, "price": "", "row": 5, "seat": 10, LevelId: 3, balcony: true, },
        { "id": 43, "price": "", "row": 5, "seat": 9, LevelId: 3, balcony: true, },
        { "id": 44, "price": "", "row": 5, "seat": 8, LevelId: 3, balcony: true, },
        { "id": 45, "price": "", "row": 5, "seat": 7, LevelId: 3, balcony: true, },
        { "id": 46, "price": "", "row": 5, "seat": 6, LevelId: 3, balcony: true, },
        { "id": 47, "price": "", "row": 5, "seat": 5, LevelId: 3, balcony: true, },
        { "id": 48, "price": "", "row": 5, "seat": 4, LevelId: 3, balcony: true, },
        { "id": 49, "price": "", "row": 5, "seat": 3, LevelId: 3, balcony: true, },
        { "id": 50, "price": "", "row": 5, "seat": 2, LevelId: 3, balcony: true, },
        { "id": 51, "price": "", "row": 5, "seat": 1, LevelId: 3, balcony: true, },



        { "id": 342, "price": "", "row": 1, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 341, "price": "", "row": 1, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 338, "price": "", "row": 1, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 336, "price": "", "row": 1, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 334, "price": "", "row": 1, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 333, "price": "", "row": 1, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 330, "price": "", "row": 1, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 328, "price": "", "row": 1, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 327, "price": "", "row": 1, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 326, "price": "", "row": 1, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 322, "price": "", "row": 1, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 321, "price": "", "row": 1, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 325, "price": "", "row": 1, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 324, "price": "", "row": 1, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 323, "price": "", "row": 1, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 329, "price": "", "row": 1, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 332, "price": "", "row": 1, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 331, "price": "", "row": 1, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 335, "price": "", "row": 1, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 337, "price": "", "row": 1, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 340, "price": "", "row": 1, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 339, "price": "", "row": 1, "seat": 22, LevelId: 2, balcony: true, },



        { "id": 320, "price": "", "row": 2, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 318, "price": "", "row": 2, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 316, "price": "", "row": 2, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 315, "price": "", "row": 2, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 312, "price": "", "row": 2, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 310, "price": "", "row": 2, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 309, "price": "", "row": 2, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 307, "price": "", "row": 2, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 306, "price": "", "row": 2, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 305, "price": "", "row": 2, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 302, "price": "", "row": 2, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 301, "price": "", "row": 2, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 300, "price": "", "row": 2, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 299, "price": "", "row": 2, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 304, "price": "", "row": 2, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 303, "price": "", "row": 2, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 308, "price": "", "row": 2, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 311, "price": "", "row": 2, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 314, "price": "", "row": 2, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 313, "price": "", "row": 2, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 317, "price": "", "row": 2, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 319, "price": "", "row": 2, "seat": 22, LevelId: 2, balcony: true, },

        { "id": 297, "price": "", "row": 3, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 296, "price": "", "row": 3, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 292, "price": "", "row": 3, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 290, "price": "", "row": 3, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 288, "price": "", "row": 3, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 287, "price": "", "row": 3, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 284, "price": "", "row": 3, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 282, "price": "", "row": 3, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 281, "price": "", "row": 3, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 280, "price": "", "row": 3, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 275, "price": "", "row": 3, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 279, "price": "", "row": 3, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 278, "price": "", "row": 3, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 277, "price": "", "row": 3, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 276, "price": "", "row": 3, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 283, "price": "", "row": 3, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 286, "price": "", "row": 3, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 285, "price": "", "row": 3, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 289, "price": "", "row": 3, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 291, "price": "", "row": 3, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 295, "price": "", "row": 3, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 294, "price": "", "row": 3, "seat": 22, LevelId: 2, balcony: true, },

        { "id": 272, "price": "", "row": 4, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 270, "price": "", "row": 4, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 268, "price": "", "row": 4, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 267, "price": "", "row": 4, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 264, "price": "", "row": 4, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 262, "price": "", "row": 4, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 261, "price": "", "row": 4, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 258, "price": "", "row": 4, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 257, "price": "", "row": 4, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 254, "price": "", "row": 4, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 253, "price": "", "row": 4, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 252, "price": "", "row": 4, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 251, "price": "", "row": 4, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 256, "price": "", "row": 4, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 255, "price": "", "row": 4, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 260, "price": "", "row": 4, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 259, "price": "", "row": 4, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 263, "price": "", "row": 4, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 266, "price": "", "row": 4, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 265, "price": "", "row": 4, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 269, "price": "", "row": 4, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 271, "price": "", "row": 4, "seat": 22, LevelId: 2, balcony: true, },

        { "id": 248, "price": "", "row": 5, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 246, "price": "", "row": 5, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 244, "price": "", "row": 5, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 243, "price": "", "row": 5, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 240, "price": "", "row": 5, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 238, "price": "", "row": 5, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 237, "price": "", "row": 5, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 235, "price": "", "row": 5, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 231, "price": "", "row": 5, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 230, "price": "", "row": 5, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 229, "price": "", "row": 5, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 228, "price": "", "row": 5, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 227, "price": "", "row": 5, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 226, "price": "", "row": 5, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 234, "price": "", "row": 5, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 233, "price": "", "row": 5, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 236, "price": "", "row": 5, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 239, "price": "", "row": 5, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 242, "price": "", "row": 5, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 241, "price": "", "row": 5, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 245, "price": "", "row": 5, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 247, "price": "", "row": 5, "seat": 22, LevelId: 2, balcony: true, },

        { "id": 224, "price": "", "row": 6, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 223, "price": "", "row": 6, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 220, "price": "", "row": 6, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 217, "price": "", "row": 6, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 214, "price": "", "row": 6, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 213, "price": "", "row": 6, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 210, "price": "", "row": 6, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 208, "price": "", "row": 6, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 207, "price": "", "row": 6, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 206, "price": "", "row": 6, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 202, "price": "", "row": 6, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 201, "price": "", "row": 6, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 205, "price": "", "row": 6, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 204, "price": "", "row": 6, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 203, "price": "", "row": 6, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 209, "price": "", "row": 6, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 212, "price": "", "row": 6, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 211, "price": "", "row": 6, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 216, "price": "", "row": 6, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 219, "price": "", "row": 6, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 222, "price": "", "row": 6, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 221, "price": "", "row": 6, "seat": 22, LevelId: 2, balcony: true, },

        { "id": 198, "price": "", "row": 7, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 197, "price": "", "row": 7, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 196, "price": "", "row": 7, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 194, "price": "", "row": 7, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 194, "price": "", "row": 7, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 193, "price": "", "row": 7, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 192, "price": "", "row": 7, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 191, "price": "", "row": 7, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 190, "price": "", "row": 7, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 189, "price": "", "row": 7, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 188, "price": "", "row": 7, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 187, "price": "", "row": 7, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 186, "price": "", "row": 7, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 185, "price": "", "row": 7, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 184, "price": "", "row": 7, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 183, "price": "", "row": 7, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 182, "price": "", "row": 7, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 181, "price": "", "row": 7, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 180, "price": "", "row": 7, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 179, "price": "", "row": 7, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 178, "price": "", "row": 7, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 177, "price": "", "row": 7, "seat": 22, LevelId: 2, balcony: true, },

        { "id": 173, "price": "", "row": 8, "seat": 1, LevelId: 2, balcony: true, },
        { "id": 172, "price": "", "row": 8, "seat": 2, LevelId: 2, balcony: true, },
        { "id": 171, "price": "", "row": 8, "seat": 3, LevelId: 2, balcony: true, },
        { "id": 170, "price": "", "row": 8, "seat": 4, LevelId: 2, balcony: true, },
        { "id": 169, "price": "", "row": 8, "seat": 5, LevelId: 2, balcony: true, },
        { "id": 168, "price": "", "row": 8, "seat": 6, LevelId: 2, balcony: true, },
        { "id": 167, "price": "", "row": 8, "seat": 7, LevelId: 2, balcony: true, },
        { "id": 166, "price": "", "row": 8, "seat": 8, LevelId: 2, balcony: true, },
        { "id": 165, "price": "", "row": 8, "seat": 9, LevelId: 2, balcony: true, },
        { "id": 164, "price": "", "row": 8, "seat": 10, LevelId: 2, balcony: true, },
        { "id": 163, "price": "", "row": 8, "seat": 11, LevelId: 2, balcony: true, },
        { "id": 162, "price": "", "row": 8, "seat": 12, LevelId: 2, balcony: true, },
        { "id": 161, "price": "", "row": 8, "seat": 13, LevelId: 2, balcony: true, },
        { "id": 160, "price": "", "row": 8, "seat": 14, LevelId: 2, balcony: true, },
        { "id": 159, "price": "", "row": 8, "seat": 15, LevelId: 2, balcony: true, },
        { "id": 158, "price": "", "row": 8, "seat": 16, LevelId: 2, balcony: true, },
        { "id": 157, "price": "", "row": 8, "seat": 17, LevelId: 2, balcony: true, },
        { "id": 156, "price": "", "row": 8, "seat": 18, LevelId: 2, balcony: true, },
        { "id": 155, "price": "", "row": 8, "seat": 19, LevelId: 2, balcony: true, },
        { "id": 154, "price": "", "row": 8, "seat": 20, LevelId: 2, balcony: true, },
        { "id": 153, "price": "", "row": 8, "seat": 21, LevelId: 2, balcony: true, },
        { "id": 152, "price": "", "row": 8, "seat": 22, LevelId: 2, balcony: true, },
        { "id": 151, "price": "", "row": 8, "seat": 23, LevelId: 2, balcony: true, },
        { "id": 150, "price": "", "row": 8, "seat": 24, LevelId: 2, balcony: true, },
        { "id": 149, "price": "", "row": 8, "seat": 25, LevelId: 2, balcony: true, },





        { "id": 550, "price": "", "row": 6, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 549, "price": "", "row": 6, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 546, "price": "", "row": 6, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 544, "price": "", "row": 6, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 542, "price": "", "row": 6, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 541, "price": "", "row": 6, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 538, "price": "", "row": 6, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 536, "price": "", "row": 6, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 535, "price": "", "row": 6, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 534, "price": "", "row": 6, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 531, "price": "", "row": 6, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 526, "price": "", "row": 6, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 525, "price": "", "row": 6, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 530, "price": "", "row": 6, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 529, "price": "", "row": 6, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 528, "price": "", "row": 6, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 527, "price": "", "row": 6, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 533, "price": "", "row": 6, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 532, "price": "", "row": 6, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 537, "price": "", "row": 6, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 540, "price": "", "row": 6, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 539, "price": "", "row": 6, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 543, "price": "", "row": 6, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 545, "price": "", "row": 6, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 548, "price": "", "row": 6, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 547, "price": "", "row": 6, "seat": 26, LevelId: 1, balcony: true, },


        { "id": 524, "price": "", "row": 7, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 522, "price": "", "row": 7, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 520, "price": "", "row": 7, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 519, "price": "", "row": 7, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 516, "price": "", "row": 7, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 514, "price": "", "row": 7, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 513, "price": "", "row": 7, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 510, "price": "", "row": 7, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 508, "price": "", "row": 7, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 507, "price": "", "row": 7, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 504, "price": "", "row": 7, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 503, "price": "", "row": 7, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 502, "price": "", "row": 7, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 501, "price": "", "row": 7, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 500, "price": "", "row": 7, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 499, "price": "", "row": 7, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 506, "price": "", "row": 7, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 505, "price": "", "row": 7, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 509, "price": "", "row": 7, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 512, "price": "", "row": 7, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 511, "price": "", "row": 7, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 515, "price": "", "row": 7, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 518, "price": "", "row": 7, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 517, "price": "", "row": 7, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 521, "price": "", "row": 7, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 523, "price": "", "row": 7, "seat": 26, LevelId: 1, balcony: true, },


        { "id": 498, "price": "", "row": 8, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 497, "price": "", "row": 8, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 494, "price": "", "row": 8, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 492, "price": "", "row": 8, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 491, "price": "", "row": 8, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 488, "price": "", "row": 8, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 486, "price": "", "row": 8, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 485, "price": "", "row": 8, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 482, "price": "", "row": 8, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 481, "price": "", "row": 8, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 478, "price": "", "row": 8, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 477, "price": "", "row": 8, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 476, "price": "", "row": 8, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 475, "price": "", "row": 8, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 474, "price": "", "row": 8, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 473, "price": "", "row": 8, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 489, "price": "", "row": 8, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 479, "price": "", "row": 8, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 484, "price": "", "row": 8, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 483, "price": "", "row": 8, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 487, "price": "", "row": 8, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 490, "price": "", "row": 8, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 489, "price": "", "row": 8, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 493, "price": "", "row": 8, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 496, "price": "", "row": 8, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 495, "price": "", "row": 8, "seat": 26, LevelId: 1, balcony: true, },

        { "id": 472, "price": "", "row": 9, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 471, "price": "", "row": 9, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 467, "price": "", "row": 9, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 466, "price": "", "row": 9, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 464, "price": "", "row": 9, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 463, "price": "", "row": 9, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 460, "price": "", "row": 9, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 458, "price": "", "row": 9, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 457, "price": "", "row": 9, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 454, "price": "", "row": 9, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 453, "price": "", "row": 9, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 450, "price": "", "row": 9, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 449, "price": "", "row": 9, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 448, "price": "", "row": 9, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 447, "price": "", "row": 9, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 452, "price": "", "row": 9, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 451, "price": "", "row": 9, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 456, "price": "", "row": 9, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 455, "price": "", "row": 9, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 459, "price": "", "row": 9, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 462, "price": "", "row": 9, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 461, "price": "", "row": 9, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 465, "price": "", "row": 9, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 468, "price": "", "row": 9, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 479, "price": "", "row": 9, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 469, "price": "", "row": 9, "seat": 26, LevelId: 1, balcony: true, },



        { "id": 446, "price": "", "row": 10, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 445, "price": "", "row": 10, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 442, "price": "", "row": 10, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 439, "price": "", "row": 10, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 438, "price": "", "row": 10, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 436, "price": "", "row": 10, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 435, "price": "", "row": 10, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 432, "price": "", "row": 10, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 430, "price": "", "row": 10, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 429, "price": "", "row": 10, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 426, "price": "", "row": 10, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 425, "price": "", "row": 10, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 424, "price": "", "row": 10, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 423, "price": "", "row": 10, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 422, "price": "", "row": 10, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 421, "price": "", "row": 10, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 428, "price": "", "row": 10, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 427, "price": "", "row": 10, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 431, "price": "", "row": 10, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 434, "price": "", "row": 10, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 433, "price": "", "row": 10, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 437, "price": "", "row": 10, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 441, "price": "", "row": 10, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 440, "price": "", "row": 10, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 444, "price": "", "row": 10, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 443, "price": "", "row": 10, "seat": 26, LevelId: 1, balcony: true, },


        { "id": 420, "price": "", "row": 11, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 418, "price": "", "row": 11, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 416, "price": "", "row": 11, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 415, "price": "", "row": 11, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 412, "price": "", "row": 11, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 411, "price": "", "row": 11, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 409, "price": "", "row": 11, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 406, "price": "", "row": 11, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 405, "price": "", "row": 11, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 402, "price": "", "row": 11, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 399, "price": "", "row": 11, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 398, "price": "", "row": 11, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 397, "price": "", "row": 11, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 396, "price": "", "row": 11, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 395, "price": "", "row": 11, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 401, "price": "", "row": 11, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 400, "price": "", "row": 11, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 404, "price": "", "row": 11, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 403, "price": "", "row": 11, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 408, "price": "", "row": 11, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 407, "price": "", "row": 11, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 410, "price": "", "row": 11, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 414, "price": "", "row": 11, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 413, "price": "", "row": 11, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 417, "price": "", "row": 11, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 419, "price": "", "row": 11, "seat": 26, LevelId: 1, balcony: true, },


        { "id": 394, "price": "", "row": 12, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 393, "price": "", "row": 12, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 390, "price": "", "row": 12, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 388, "price": "", "row": 12, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 386, "price": "", "row": 12, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 385, "price": "", "row": 12, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 382, "price": "", "row": 12, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 380, "price": "", "row": 12, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 379, "price": "", "row": 12, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 375, "price": "", "row": 12, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 374, "price": "", "row": 12, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 373, "price": "", "row": 12, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 372, "price": "", "row": 12, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 371, "price": "", "row": 12, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 370, "price": "", "row": 12, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 369, "price": "", "row": 12, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 378, "price": "", "row": 12, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 377, "price": "", "row": 12, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 376, "price": "", "row": 12, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 381, "price": "", "row": 12, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 384, "price": "", "row": 12, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 383, "price": "", "row": 12, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 387, "price": "", "row": 12, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 389, "price": "", "row": 12, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 392, "price": "", "row": 12, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 391, "price": "", "row": 12, "seat": 26, LevelId: 1, balcony: true, },



        { "id": 368, "price": "", "row": 13, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 366, "price": "", "row": 13, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 364, "price": "", "row": 13, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 363, "price": "", "row": 13, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 360, "price": "", "row": 13, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 357, "price": "", "row": 13, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 356, "price": "", "row": 13, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 354, "price": "", "row": 13, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 452, "price": "", "row": 13, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 351, "price": "", "row": 13, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 347, "price": "", "row": 13, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 346, "price": "", "row": 13, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 345, "price": "", "row": 13, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 344, "price": "", "row": 13, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 343, "price": "", "row": 13, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 350, "price": "", "row": 13, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 349, "price": "", "row": 13, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 348, "price": "", "row": 13, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 353, "price": "", "row": 13, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 355, "price": "", "row": 13, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 359, "price": "", "row": 13, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 358, "price": "", "row": 13, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 362, "price": "", "row": 13, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 361, "price": "", "row": 13, "seat": 24, LevelId: 1, balcony: true, },
        { "id": 365, "price": "", "row": 13, "seat": 25, LevelId: 1, balcony: true, },
        { "id": 367, "price": "", "row": 13, "seat": 26, LevelId: 1, balcony: true, },

        { "id": 574, "price": "", "row": 5, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 573, "price": "", "row": 5, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 570, "price": "", "row": 5, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 568, "price": "", "row": 5, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 566, "price": "", "row": 5, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 564, "price": "", "row": 5, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 563, "price": "", "row": 5, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 559, "price": "", "row": 5, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 558, "price": "", "row": 5, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 557, "price": "", "row": 5, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 555, "price": "", "row": 5, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 551, "price": "", "row": 5, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 554, "price": "", "row": 5, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 553, "price": "", "row": 5, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 552, "price": "", "row": 5, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 556, "price": "", "row": 5, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 560, "price": "", "row": 5, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 562, "price": "", "row": 5, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 561, "price": "", "row": 5, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 565, "price": "", "row": 5, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 567, "price": "", "row": 5, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 569, "price": "", "row": 5, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 572, "price": "", "row": 5, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 571, "price": "", "row": 5, "seat": 24, LevelId: 1, balcony: true, },

        { "id": 598, "price": "", "row": 4, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 597, "price": "", "row": 4, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 594, "price": "", "row": 4, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 593, "price": "", "row": 4, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 591, "price": "", "row": 4, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 588, "price": "", "row": 4, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 586, "price": "", "row": 4, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 583, "price": "", "row": 4, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 582, "price": "", "row": 4, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 580, "price": "", "row": 4, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 579, "price": "", "row": 4, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 576, "price": "", "row": 4, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 575, "price": "", "row": 4, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 578, "price": "", "row": 4, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 577, "price": "", "row": 4, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 581, "price": "", "row": 4, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 585, "price": "", "row": 4, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 584, "price": "", "row": 4, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 587, "price": "", "row": 4, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 590, "price": "", "row": 4, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 589, "price": "", "row": 4, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 592, "price": "", "row": 4, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 596, "price": "", "row": 4, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 595, "price": "", "row": 4, "seat": 24, LevelId: 1, balcony: true, },


        { "id": 621, "price": "", "row": 3, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 620, "price": "", "row": 3, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 618, "price": "", "row": 3, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 617, "price": "", "row": 3, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 615, "price": "", "row": 3, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 612, "price": "", "row": 3, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 610, "price": "", "row": 3, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 607, "price": "", "row": 3, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 606, "price": "", "row": 3, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 604, "price": "", "row": 3, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 603, "price": "", "row": 3, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 600, "price": "", "row": 3, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 599, "price": "", "row": 3, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 602, "price": "", "row": 3, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 601, "price": "", "row": 3, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 605, "price": "", "row": 3, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 609, "price": "", "row": 3, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 608, "price": "", "row": 3, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 611, "price": "", "row": 3, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 614, "price": "", "row": 3, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 613, "price": "", "row": 3, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 616, "price": "", "row": 3, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 619, "price": "", "row": 3, "seat": 23, LevelId: 1, balcony: true, },
        { "id": 622, "price": "", "row": 3, "seat": 24, LevelId: 1, balcony: true, },


        { "id": 644, "price": "", "row": 2, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 642, "price": "", "row": 2, "seat": 2, LevelId: 1, balcony: true, },
        { "id": 641, "price": "", "row": 2, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 639, "price": "", "row": 2, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 636, "price": "", "row": 2, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 634, "price": "", "row": 2, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 631, "price": "", "row": 2, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 630, "price": "", "row": 2, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 628, "price": "", "row": 2, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 627, "price": "", "row": 2, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 626, "price": "", "row": 2, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 623, "price": "", "row": 2, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 625, "price": "", "row": 2, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 624, "price": "", "row": 2, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 629, "price": "", "row": 2, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 633, "price": "", "row": 2, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 632, "price": "", "row": 2, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 635, "price": "", "row": 2, "seat": 18, LevelId: 1, balcony: true, },
        { "id": 638, "price": "", "row": 2, "seat": 19, LevelId: 1, balcony: true, },
        { "id": 637, "price": "", "row": 2, "seat": 20, LevelId: 1, balcony: true, },
        { "id": 640, "price": "", "row": 2, "seat": 21, LevelId: 1, balcony: true, },
        { "id": 643, "price": "", "row": 2, "seat": 22, LevelId: 1, balcony: true, },
        { "id": 645, "price": "", "row": 2, "seat": 23, LevelId: 1, balcony: true, },

        { "id": 661, "price": "", "row": 1, "seat": 1, LevelId: 1, balcony: true, },
        { "id": 658, "price": "", "row": 1, "seat": 3, LevelId: 1, balcony: true, },
        { "id": 655, "price": "", "row": 1, "seat": 4, LevelId: 1, balcony: true, },
        { "id": 653, "price": "", "row": 1, "seat": 5, LevelId: 1, balcony: true, },
        { "id": 652, "price": "", "row": 1, "seat": 6, LevelId: 1, balcony: true, },
        { "id": 649, "price": "", "row": 1, "seat": 7, LevelId: 1, balcony: true, },
        { "id": 648, "price": "", "row": 1, "seat": 8, LevelId: 1, balcony: true, },
        { "id": 647, "price": "", "row": 1, "seat": 9, LevelId: 1, balcony: true, },
        { "id": 646, "price": "", "row": 1, "seat": 10, LevelId: 1, balcony: true, },
        { "id": 651, "price": "", "row": 1, "seat": 11, LevelId: 1, balcony: true, },
        { "id": 650, "price": "", "row": 1, "seat": 12, LevelId: 1, balcony: true, },
        { "id": 654, "price": "", "row": 1, "seat": 13, LevelId: 1, balcony: true, },
        { "id": 657, "price": "", "row": 1, "seat": 14, LevelId: 1, balcony: true, },
        { "id": 656, "price": "", "row": 1, "seat": 15, LevelId: 1, balcony: true, },
        { "id": 660, "price": "", "row": 1, "seat": 16, LevelId: 1, balcony: true, },
        { "id": 662, "price": "", "row": 1, "seat": 17, LevelId: 1, balcony: true, },
        { "id": 659, "price": "", "row": 1, "seat": 2, LevelId: 1, balcony: true, },



        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },
        { "id": 273, "price": "", "row": 0, "seat": 0, LevelId: 1, balcony: true, active: false },

    ])

    useEffect(() => {
        let item = [...seansArr]
        seatArr?.map((elm, i) => {
            if (elm.LevelId == 6) {
                elm.Places?.map((el, i) => {
                    let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e.LevelId == 6))
                    if (item[index]) {
                        item[index].active = el?.active
                        item[index].price = el?.Price
                    }
                })
            }
            else if (elm.LevelId == 5) {
                elm.Places?.map((el, i) => {
                    let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e.LevelId == 5))
                    if (item[index]) {
                        item[index].active = el?.active
                        item[index].price = el?.Price
                    }
                })
            }
            else if (elm.LevelId == 4) {
                elm.Places?.map((el, i) => {
                    let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e.LevelId == 4))
                    if (item[index]) {
                        item[index].active = el?.active
                        item[index].price = el?.Price
                    }
                })
            }
            else if (elm.LevelId == 3) {
                elm.Places?.map((el, i) => {
                    let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e.LevelId == 3))
                    if (item[index]) {
                        item[index].active = el?.active
                        item[index].price = el?.Price
                    }
                })
            }
            else if (elm.LevelId == 2) {
                elm.Places?.map((el, i) => {
                    let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e.LevelId == 2))
                    if (item[index]) {
                        item[index].active = el?.active
                        item[index].price = el?.Price
                    }
                })
            }
            else if (elm.LevelId == 1) {
                elm.Places?.map((el, i) => {
                    let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e.LevelId == 1))
                    if (item[index]) {
                        item[index].active = el?.active
                        item[index].price = el?.Price
                    }
                })
            }
        })
        setSeansArr(item)
    }, [seatArr])


    const getPrice = (y, i, x, parterre, amphitheater, lodge) => {
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
            LevelId: item.LevelId,
            timeLine: Timeline,
        })
        setShowModal(true)
    }

    const addTicket = (i, price, id, parterre, amphitheater, lodge) => {
        let data = [...coordinatesState]
        data[i].active = !data[i].active
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
                stage: temp.stage,
                LevelId: temp.LevelId,
                timeLine: Timeline,
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
        image.src = require('../../assets/ParonyanMec_UPDATE.png')

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

                    if (r >= 100 && g <= 30 && b <= 30) {
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
                alt='' src={require('../../assets/ParonyanMec_UPDATE.png')} />
            {coordinatesState?.map((e, i) => {
                let index = seansArr.findIndex((el) => el.id == i)
                if (seansArr[index]?.active)
                    return <button
                        key={i}
                        onMouseOver={() => {
                            getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                            setActiveButton(i)
                        }}
                        style={
                            {
                                top: e?.y - 4,
                                left: e?.x - 4,
                                // backgroundColor: e.active && 'green'
                                backgroundColor: tickets.find((elm) => elm.seatId == e.id) && 'green'
                            }
                        }
                        id='seatStyle'
                        className={[
                            i == activeButton ? 'activeButton' : '',
                            e.active ? "addTicketButton" : '']}
                        onMouseLeave={() => {
                            setShowModal(false)
                            setActiveButton(null)
                        }}
                        onClick={() => addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)}
                        onTouchStart={() => {
                            getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                            setActiveButton(i)
                        }}
                        onTouchEnd={() => {
                            addTicket(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                        }}
                    />
            })}

            {showModal &&
                <div style={{ top: position.y, left: position.x, position: 'absolute' }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div>
    )
}
export default Paronyan
