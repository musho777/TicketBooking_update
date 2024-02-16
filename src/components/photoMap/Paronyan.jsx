import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'
import { MD5 } from 'crypto-js'
import axios from 'axios'
import { ParonyanSvg } from './ParonyanSvg'

const Paronyan = ({ grupID, eventId, Timeline, sessionID, pading, id, open, places }) => {
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

    // const GetEventSeat = async () => {
    //     const keys = "hYDepOnSarMi";
    //     const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    //     const requestType = "getRow";
    //     const params = {
    //         group_id: grupID,
    //         timeline_id: Timeline,
    //         event_id: id,
    //     };
    //     const sortedParams = Object.fromEntries(Object.entries(params).sort());
    //     sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();

    //     const options = {
    //         method: 'POST',
    //         url: `https://api.haytoms.am/sync/${secretKey}/${requestType}`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         data: JSON.stringify(sortedParams),
    //     };

    //     const response = await axios(options)
    //     setSeatArr(response.data.data?.Levels)

    // }

    // useEffect(() => {
    //     GetEventSeat()
    // }, [open])


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // const [seansArr, setSeansArr] = useState([
    //     { "id": 645, "price": "", "row": 1, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 643, "price": "", "row": 1, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 641, "price": "", "row": 1, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 639, "price": "", "row": 1, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 637, "price": "", "row": 1, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 635, "price": "", "row": 1, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 634, "price": "", "row": 1, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 633, "price": "", "row": 1, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 632, "price": "", "row": 1, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 631, "price": "", "row": 1, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 630, "price": "", "row": 1, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 636, "price": "", "row": 1, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 638, "price": "", "row": 1, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 640, "price": "", "row": 1, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 642, "price": "", "row": 1, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 644, "price": "", "row": 1, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 646, "price": "", "row": 1, "seat": 17, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 628, "price": "", "row": 2, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 626, "price": "", "row": 2, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 624, "price": "", "row": 2, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 622, "price": "", "row": 2, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 620, "price": "", "row": 2, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 618, "price": "", "row": 2, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 616, "price": "", "row": 2, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 614, "price": "", "row": 2, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 612, "price": "", "row": 2, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 611, "price": "", "row": 2, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 610, "price": "", "row": 2, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 609, "price": "", "row": 2, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 608, "price": "", "row": 2, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 607, "price": "", "row": 2, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 613, "price": "", "row": 2, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 615, "price": "", "row": 2, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 617, "price": "", "row": 2, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 619, "price": "", "row": 2, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 621, "price": "", "row": 2, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 623, "price": "", "row": 2, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 625, "price": "", "row": 2, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 627, "price": "", "row": 2, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 629, "price": "", "row": 2, "seat": 23, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 606, "price": "", "row": 3, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 604, "price": "", "row": 3, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 602, "price": "", "row": 3, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 600, "price": "", "row": 3, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 598, "price": "", "row": 3, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 596, "price": "", "row": 3, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 594, "price": "", "row": 3, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 592, "price": "", "row": 3, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 590, "price": "", "row": 3, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 588, "price": "", "row": 3, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 587, "price": "", "row": 3, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 586, "price": "", "row": 3, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 585, "price": "", "row": 3, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 584, "price": "", "row": 3, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 583, "price": "", "row": 3, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 589, "price": "", "row": 3, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 591, "price": "", "row": 3, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 593, "price": "", "row": 3, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 595, "price": "", "row": 3, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 597, "price": "", "row": 3, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 599, "price": "", "row": 3, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 601, "price": "", "row": 3, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 603, "price": "", "row": 3, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 605, "price": "", "row": 3, "seat": 24, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 582, "price": "", "row": 4, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 580, "price": "", "row": 4, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 578, "price": "", "row": 4, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 576, "price": "", "row": 4, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 574, "price": "", "row": 4, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 572, "price": "", "row": 4, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 570, "price": "", "row": 4, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 568, "price": "", "row": 4, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 566, "price": "", "row": 4, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 564, "price": "", "row": 4, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 563, "price": "", "row": 4, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 562, "price": "", "row": 4, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 561, "price": "", "row": 4, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 560, "price": "", "row": 4, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 559, "price": "", "row": 4, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 565, "price": "", "row": 4, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 567, "price": "", "row": 4, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 569, "price": "", "row": 4, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 571, "price": "", "row": 4, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 573, "price": "", "row": 4, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 575, "price": "", "row": 4, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 577, "price": "", "row": 4, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 579, "price": "", "row": 4, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 581, "price": "", "row": 4, "seat": 24, "LevelId": 1, "balcony": true, "active": false },

    //     { "id": 558, "price": "", "row": 5, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 556, "price": "", "row": 5, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 554, "price": "", "row": 5, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 552, "price": "", "row": 5, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 550, "price": "", "row": 5, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 548, "price": "", "row": 5, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 546, "price": "", "row": 5, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 544, "price": "", "row": 5, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 542, "price": "", "row": 5, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 540, "price": "", "row": 5, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 539, "price": "", "row": 5, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 538, "price": "", "row": 5, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 537, "price": "", "row": 5, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 536, "price": "", "row": 5, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 535, "price": "", "row": 5, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 541, "price": "", "row": 5, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 543, "price": "", "row": 5, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 545, "price": "", "row": 5, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 547, "price": "", "row": 5, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 549, "price": "", "row": 5, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 551, "price": "", "row": 5, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 553, "price": "", "row": 5, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 555, "price": "", "row": 5, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 557, "price": "", "row": 5, "seat": 24, "LevelId": 1, "balcony": true, "active": false },

    //     { "id": 534, "price": "", "row": 6, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 532, "price": "", "row": 6, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 530, "price": "", "row": 6, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 528, "price": "", "row": 6, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 526, "price": "", "row": 6, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 524, "price": "", "row": 6, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 522, "price": "", "row": 6, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 520, "price": "", "row": 6, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 518, "price": "", "row": 6, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 516, "price": "", "row": 6, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 514, "price": "", "row": 6, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 512, "price": "", "row": 6, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 510, "price": "", "row": 6, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 509, "price": "", "row": 6, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 511, "price": "", "row": 6, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 513, "price": "", "row": 6, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 515, "price": "", "row": 6, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 517, "price": "", "row": 6, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 519, "price": "", "row": 6, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 521, "price": "", "row": 6, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 523, "price": "", "row": 6, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 525, "price": "", "row": 6, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 527, "price": "", "row": 6, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 529, "price": "", "row": 6, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 531, "price": "", "row": 6, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 533, "price": "", "row": 6, "seat": 26, "LevelId": 1, "balcony": true, "active": false },

    //     { "id": 508, "price": "", "row": 7, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 506, "price": "", "row": 7, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 504, "price": "", "row": 7, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 502, "price": "", "row": 7, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 500, "price": "", "row": 7, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 498, "price": "", "row": 7, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 496, "price": "", "row": 7, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 494, "price": "", "row": 7, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 492, "price": "", "row": 7, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 490, "price": "", "row": 7, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 488, "price": "", "row": 7, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 486, "price": "", "row": 7, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 484, "price": "", "row": 7, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 483, "price": "", "row": 7, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 485, "price": "", "row": 7, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 487, "price": "", "row": 7, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 489, "price": "", "row": 7, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 491, "price": "", "row": 7, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 493, "price": "", "row": 7, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 495, "price": "", "row": 7, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 497, "price": "", "row": 7, "seat": 21, "LevelId": 1, "balcony": true, "active": false },

    //     { "id": 499, "price": "", "row": 7, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 501, "price": "", "row": 7, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 503, "price": "", "row": 7, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 505, "price": "", "row": 7, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 507, "price": "", "row": 7, "seat": 26, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 482, "price": "", "row": 8, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 480, "price": "", "row": 8, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 478, "price": "", "row": 8, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 476, "price": "", "row": 8, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 474, "price": "", "row": 8, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 472, "price": "", "row": 8, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 470, "price": "", "row": 8, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 468, "price": "", "row": 8, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 466, "price": "", "row": 8, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 464, "price": "", "row": 8, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 462, "price": "", "row": 8, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 460, "price": "", "row": 8, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 458, "price": "", "row": 8, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 457, "price": "", "row": 8, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 459, "price": "", "row": 8, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 461, "price": "", "row": 8, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 463, "price": "", "row": 8, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 465, "price": "", "row": 8, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 467, "price": "", "row": 8, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 469, "price": "", "row": 8, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 471, "price": "", "row": 8, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 473, "price": "", "row": 8, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 475, "price": "", "row": 8, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 477, "price": "", "row": 8, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 479, "price": "", "row": 8, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 481, "price": "", "row": 8, "seat": 26, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 456, "price": "", "row": 9, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 454, "price": "", "row": 9, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 452, "price": "", "row": 9, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 450, "price": "", "row": 9, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 448, "price": "", "row": 9, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 446, "price": "", "row": 9, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 444, "price": "", "row": 9, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 442, "price": "", "row": 9, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 440, "price": "", "row": 9, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 438, "price": "", "row": 9, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 436, "price": "", "row": 9, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 434, "price": "", "row": 9, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 432, "price": "", "row": 9, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 431, "price": "", "row": 9, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 433, "price": "", "row": 9, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 435, "price": "", "row": 9, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 437, "price": "", "row": 9, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 439, "price": "", "row": 9, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 441, "price": "", "row": 9, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 443, "price": "", "row": 9, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 445, "price": "", "row": 9, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 447, "price": "", "row": 9, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 449, "price": "", "row": 9, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 451, "price": "", "row": 9, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 453, "price": "", "row": 9, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 455, "price": "", "row": 9, "seat": 26, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 430, "price": "", "row": 10, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 428, "price": "", "row": 10, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 426, "price": "", "row": 10, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 424, "price": "", "row": 10, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 422, "price": "", "row": 10, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 420, "price": "", "row": 10, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 418, "price": "", "row": 10, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 416, "price": "", "row": 10, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 414, "price": "", "row": 10, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 412, "price": "", "row": 10, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 410, "price": "", "row": 10, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 408, "price": "", "row": 10, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 406, "price": "", "row": 10, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 405, "price": "", "row": 10, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 407, "price": "", "row": 10, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 409, "price": "", "row": 10, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 411, "price": "", "row": 10, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 413, "price": "", "row": 10, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 415, "price": "", "row": 10, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 417, "price": "", "row": 10, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 419, "price": "", "row": 10, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 421, "price": "", "row": 10, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 423, "price": "", "row": 10, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 425, "price": "", "row": 10, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 427, "price": "", "row": 10, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 429, "price": "", "row": 10, "seat": 26, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 404, "price": "", "row": 11, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 402, "price": "", "row": 11, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 400, "price": "", "row": 11, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 398, "price": "", "row": 11, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 396, "price": "", "row": 11, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 394, "price": "", "row": 11, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 392, "price": "", "row": 11, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 390, "price": "", "row": 11, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 388, "price": "", "row": 11, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 386, "price": "", "row": 11, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 384, "price": "", "row": 11, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 382, "price": "", "row": 11, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 380, "price": "", "row": 11, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 379, "price": "", "row": 11, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 381, "price": "", "row": 11, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 383, "price": "", "row": 11, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 385, "price": "", "row": 11, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 387, "price": "", "row": 11, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 389, "price": "", "row": 11, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 391, "price": "", "row": 11, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 393, "price": "", "row": 11, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 395, "price": "", "row": 11, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 397, "price": "", "row": 11, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 399, "price": "", "row": 11, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 401, "price": "", "row": 11, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 403, "price": "", "row": 11, "seat": 26, "LevelId": 1, "balcony": true, "active": false },


    //     { "id": 378, "price": "", "row": 12, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 376, "price": "", "row": 12, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 374, "price": "", "row": 12, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 372, "price": "", "row": 12, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 370, "price": "", "row": 12, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 368, "price": "", "row": 12, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 366, "price": "", "row": 12, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 364, "price": "", "row": 12, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 362, "price": "", "row": 12, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 360, "price": "", "row": 12, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 358, "price": "", "row": 12, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 356, "price": "", "row": 12, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 354, "price": "", "row": 12, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 353, "price": "", "row": 12, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 355, "price": "", "row": 12, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 357, "price": "", "row": 12, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 359, "price": "", "row": 12, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 361, "price": "", "row": 12, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 363, "price": "", "row": 12, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 365, "price": "", "row": 12, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 367, "price": "", "row": 12, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 369, "price": "", "row": 12, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 371, "price": "", "row": 12, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 373, "price": "", "row": 12, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 375, "price": "", "row": 12, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 377, "price": "", "row": 12, "seat": 26, "LevelId": 1, "balcony": true, "active": false },

    //     { "id": 352, "price": "", "row": 13, "seat": 1, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 350, "price": "", "row": 13, "seat": 2, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 348, "price": "", "row": 13, "seat": 3, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 346, "price": "", "row": 13, "seat": 4, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 344, "price": "", "row": 13, "seat": 5, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 342, "price": "", "row": 13, "seat": 6, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 340, "price": "", "row": 13, "seat": 7, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 338, "price": "", "row": 13, "seat": 8, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 336, "price": "", "row": 13, "seat": 9, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 334, "price": "", "row": 13, "seat": 10, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 332, "price": "", "row": 13, "seat": 11, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 330, "price": "", "row": 13, "seat": 12, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 328, "price": "", "row": 13, "seat": 13, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 327, "price": "", "row": 13, "seat": 14, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 329, "price": "", "row": 13, "seat": 15, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 331, "price": "", "row": 13, "seat": 16, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 333, "price": "", "row": 13, "seat": 17, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 335, "price": "", "row": 13, "seat": 18, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 337, "price": "", "row": 13, "seat": 19, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 339, "price": "", "row": 13, "seat": 20, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 341, "price": "", "row": 13, "seat": 21, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 343, "price": "", "row": 13, "seat": 22, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 345, "price": "", "row": 13, "seat": 23, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 347, "price": "", "row": 13, "seat": 24, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 349, "price": "", "row": 13, "seat": 25, "LevelId": 1, "balcony": true, "active": false },
    //     { "id": 351, "price": "", "row": 13, "seat": 26, "LevelId": 1, "balcony": true, "active": false },

    //     { "id": 326, "price": "", "row": 1, "seat": 1, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 324, "price": "", "row": 1, "seat": 2, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 322, "price": "", "row": 1, "seat": 3, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 320, "price": "", "row": 1, "seat": 4, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 318, "price": "", "row": 1, "seat": 5, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 316, "price": "", "row": 1, "seat": 6, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 314, "price": "", "row": 1, "seat": 7, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 312, "price": "", "row": 1, "seat": 8, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 310, "price": "", "row": 1, "seat": 9, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 308, "price": "", "row": 1, "seat": 10, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 307, "price": "", "row": 1, "seat": 11, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 306, "price": "", "row": 1, "seat": 12, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 305, "price": "", "row": 1, "seat": 13, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 309, "price": "", "row": 1, "seat": 14, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 311, "price": "", "row": 1, "seat": 15, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 313, "price": "", "row": 1, "seat": 16, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 315, "price": "", "row": 1, "seat": 17, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 317, "price": "", "row": 1, "seat": 18, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 319, "price": "", "row": 1, "seat": 19, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 321, "price": "", "row": 1, "seat": 20, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 323, "price": "", "row": 1, "seat": 21, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 325, "price": "", "row": 1, "seat": 22, "LevelId": 2, "balcony": true, "active": false },

    //     { "id": 304, "price": "", "row": 2, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 302, "price": "", "row": 2, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 300, "price": "", "row": 2, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 298, "price": "", "row": 2, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 296, "price": "", "row": 2, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 294, "price": "", "row": 2, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 292, "price": "", "row": 2, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 290, "price": "", "row": 2, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 288, "price": "", "row": 2, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 286, "price": "", "row": 2, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 285, "price": "", "row": 2, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 284, "price": "", "row": 2, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 283, "price": "", "row": 2, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 287, "price": "", "row": 2, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 289, "price": "", "row": 2, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 291, "price": "", "row": 2, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 293, "price": "", "row": 2, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 295, "price": "", "row": 2, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 297, "price": "", "row": 2, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 299, "price": "", "row": 2, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 301, "price": "", "row": 2, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 303, "price": "", "row": 2, "seat": 22, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 282, "price": "", "row": 3, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 280, "price": "", "row": 3, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 278, "price": "", "row": 3, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 276, "price": "", "row": 3, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 274, "price": "", "row": 3, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 272, "price": "", "row": 3, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 270, "price": "", "row": 3, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 268, "price": "", "row": 3, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 266, "price": "", "row": 3, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 264, "price": "", "row": 3, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 263, "price": "", "row": 3, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 262, "price": "", "row": 3, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 261, "price": "", "row": 3, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 265, "price": "", "row": 3, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 267, "price": "", "row": 3, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 269, "price": "", "row": 3, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 271, "price": "", "row": 3, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 273, "price": "", "row": 3, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 275, "price": "", "row": 3, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 277, "price": "", "row": 3, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 279, "price": "", "row": 3, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 281, "price": "", "row": 3, "seat": 22, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 260, "price": "", "row": 4, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 258, "price": "", "row": 4, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 256, "price": "", "row": 4, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 254, "price": "", "row": 4, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 252, "price": "", "row": 4, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 250, "price": "", "row": 4, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 248, "price": "", "row": 4, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 246, "price": "", "row": 4, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 244, "price": "", "row": 4, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 242, "price": "", "row": 4, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 241, "price": "", "row": 4, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 240, "price": "", "row": 4, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 239, "price": "", "row": 4, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 243, "price": "", "row": 4, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 245, "price": "", "row": 4, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 247, "price": "", "row": 4, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 249, "price": "", "row": 4, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 251, "price": "", "row": 4, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 253, "price": "", "row": 4, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 255, "price": "", "row": 4, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 257, "price": "", "row": 4, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 259, "price": "", "row": 4, "seat": 22, "LevelId": 2, "balcony": true, "active": false },



    //     { "id": 238, "price": "", "row": 5, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 236, "price": "", "row": 5, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 234, "price": "", "row": 5, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 232, "price": "", "row": 5, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 230, "price": "", "row": 5, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 228, "price": "", "row": 5, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 226, "price": "", "row": 5, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 224, "price": "", "row": 5, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 222, "price": "", "row": 5, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 220, "price": "", "row": 5, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 219, "price": "", "row": 5, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 218, "price": "", "row": 5, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 217, "price": "", "row": 5, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 221, "price": "", "row": 5, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 223, "price": "", "row": 5, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 225, "price": "", "row": 5, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 227, "price": "", "row": 5, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 229, "price": "", "row": 5, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 231, "price": "", "row": 5, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 233, "price": "", "row": 5, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 235, "price": "", "row": 5, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 237, "price": "", "row": 5, "seat": 22, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 216, "price": "", "row": 6, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 214, "price": "", "row": 6, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 212, "price": "", "row": 6, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 210, "price": "", "row": 6, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 208, "price": "", "row": 6, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 206, "price": "", "row": 6, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 204, "price": "", "row": 6, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 202, "price": "", "row": 6, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 200, "price": "", "row": 6, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 198, "price": "", "row": 6, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 197, "price": "", "row": 6, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 196, "price": "", "row": 6, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 195, "price": "", "row": 6, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 199, "price": "", "row": 6, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 201, "price": "", "row": 6, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 203, "price": "", "row": 6, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 205, "price": "", "row": 6, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 207, "price": "", "row": 6, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 209, "price": "", "row": 6, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 211, "price": "", "row": 6, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 213, "price": "", "row": 6, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 215, "price": "", "row": 6, "seat": 22, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 194, "price": "", "row": 7, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 193, "price": "", "row": 7, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 192, "price": "", "row": 7, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 191, "price": "", "row": 7, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 190, "price": "", "row": 7, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 189, "price": "", "row": 7, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 188, "price": "", "row": 7, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 187, "price": "", "row": 7, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 186, "price": "", "row": 7, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 185, "price": "", "row": 7, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 184, "price": "", "row": 7, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 183, "price": "", "row": 7, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 182, "price": "", "row": 7, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 181, "price": "", "row": 7, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 180, "price": "", "row": 7, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 179, "price": "", "row": 7, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 178, "price": "", "row": 7, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 177, "price": "", "row": 7, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 176, "price": "", "row": 7, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 175, "price": "", "row": 7, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 174, "price": "", "row": 7, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 173, "price": "", "row": 7, "seat": 22, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 172, "price": "", "row": 8, "seat": 1, "LevelId": 2, "balcony": true, "active": false }, { "id": 171, "price": "", "row": 8, "seat": 2, "LevelId": 2, "balcony": true, "active": false }, { "id": 170, "price": "", "row": 8, "seat": 3, "LevelId": 2, "balcony": true, "active": false }, { "id": 169, "price": "", "row": 8, "seat": 4, "LevelId": 2, "balcony": true, "active": false }, { "id": 168, "price": "", "row": 8, "seat": 5, "LevelId": 2, "balcony": true, "active": false }, { "id": 167, "price": "", "row": 8, "seat": 6, "LevelId": 2, "balcony": true, "active": false }, { "id": 166, "price": "", "row": 8, "seat": 7, "LevelId": 2, "balcony": true, "active": false }, { "id": 165, "price": "", "row": 8, "seat": 8, "LevelId": 2, "balcony": true, "active": false }, { "id": 164, "price": "", "row": 8, "seat": 9, "LevelId": 2, "balcony": true, "active": false }, { "id": 163, "price": "", "row": 8, "seat": 10, "LevelId": 2, "balcony": true, "active": false }, { "id": 162, "price": "", "row": 8, "seat": 11, "LevelId": 2, "balcony": true, "active": false }, { "id": 161, "price": "", "row": 8, "seat": 12, "LevelId": 2, "balcony": true, "active": false }, { "id": 160, "price": "", "row": 8, "seat": 13, "LevelId": 2, "balcony": true, "active": false }, { "id": 159, "price": "", "row": 8, "seat": 14, "LevelId": 2, "balcony": true, "active": false }, { "id": 158, "price": "", "row": 8, "seat": 15, "LevelId": 2, "balcony": true, "active": false }, { "id": 157, "price": "", "row": 8, "seat": 16, "LevelId": 2, "balcony": true, "active": false }, { "id": 156, "price": "", "row": 8, "seat": 17, "LevelId": 2, "balcony": true, "active": false }, { "id": 155, "price": "", "row": 8, "seat": 18, "LevelId": 2, "balcony": true, "active": false }, { "id": 154, "price": "", "row": 8, "seat": 19, "LevelId": 2, "balcony": true, "active": false }, { "id": 153, "price": "", "row": 8, "seat": 20, "LevelId": 2, "balcony": true, "active": false }, { "id": 152, "price": "", "row": 8, "seat": 21, "LevelId": 2, "balcony": true, "active": false }, { "id": 151, "price": "", "row": 8, "seat": 22, "LevelId": 2, "balcony": true, "active": false }, { "id": 150, "price": "", "row": 8, "seat": 23, "LevelId": 2, "balcony": true, "active": false }, { "id": 149, "price": "", "row": 8, "seat": 24, "LevelId": 2, "balcony": true, "active": false }, { "id": 148, "price": "", "row": 8, "seat": 25, "LevelId": 2, "balcony": true, "active": false },
    //     { "id": 147, "price": "", "row": 1, "seat": 1, "LevelId": 3, "balcony": true, "active": false }, { "id": 146, "price": "", "row": 1, "seat": 2, "LevelId": 3, "balcony": true, "active": false }, { "id": 145, "price": "", "row": 1, "seat": 3, "LevelId": 3, "balcony": true, "active": false }, { "id": 144, "price": "", "row": 1, "seat": 4, "LevelId": 3, "balcony": true, "active": false }, { "id": 143, "price": "", "row": 1, "seat": 5, "LevelId": 3, "balcony": true, "active": false }, { "id": 142, "price": "", "row": 1, "seat": 6, "LevelId": 3, "balcony": true, "active": false }, { "id": 141, "price": "", "row": 1, "seat": 7, "LevelId": 3, "balcony": true, "active": false }, { "id": 140, "price": "", "row": 1, "seat": 8, "LevelId": 3, "balcony": true, "active": false }, { "id": 139, "price": "", "row": 1, "seat": 9, "LevelId": 3, "balcony": true, "active": false }, { "id": 138, "price": "", "row": 1, "seat": 10, "LevelId": 3, "balcony": true, "active": false }, { "id": 137, "price": "", "row": 1, "seat": 11, "LevelId": 3, "balcony": true, "active": false }, { "id": 136, "price": "", "row": 1, "seat": 12, "LevelId": 3, "balcony": true, "active": false }, { "id": 135, "price": "", "row": 1, "seat": 13, "LevelId": 3, "balcony": true, "active": false }, { "id": 134, "price": "", "row": 1, "seat": 14, "LevelId": 3, "balcony": true, "active": false }, { "id": 133, "price": "", "row": 1, "seat": 15, "LevelId": 3, "balcony": true, "active": false }, { "id": 132, "price": "", "row": 1, "seat": 16, "LevelId": 3, "balcony": true, "active": false }, { "id": 131, "price": "", "row": 1, "seat": 17, "LevelId": 3, "balcony": true, "active": false }, { "id": 130, "price": "", "row": 1, "seat": 18, "LevelId": 3, "balcony": true, "active": false }, { "id": 129, "price": "", "row": 1, "seat": 19, "LevelId": 3, "balcony": true, "active": false }, { "id": 128, "price": "", "row": 1, "seat": 20, "LevelId": 3, "balcony": true, "active": false }, { "id": 127, "price": "", "row": 1, "seat": 21, "LevelId": 3, "balcony": true, "active": false }, { "id": 126, "price": "", "row": 1, "seat": 22, "LevelId": 3, "balcony": true, "active": false }, { "id": 125, "price": "", "row": 1, "seat": 23, "LevelId": 3, "balcony": true, "active": false }, { "id": 124, "price": "", "row": 1, "seat": 24, "LevelId": 3, "balcony": true, "active": false }, { "id": 123, "price": "", "row": 1, "seat": 25, "LevelId": 3, "balcony": true, "active": false }, { "id": 122, "price": "", "row": 1, "seat": 26, "LevelId": 3, "balcony": true, "active": false }, { "id": 121, "price": "", "row": 1, "seat": 27, "LevelId": 3, "balcony": true, "active": false },
    //     { "id": 120, "price": "", "row": 2, "seat": 1, "LevelId": 3, "balcony": true, "active": false }, { "id": 119, "price": "", "row": 2, "seat": 2, "LevelId": 3, "balcony": true, "active": false }, { "id": 118, "price": "", "row": 2, "seat": 3, "LevelId": 3, "balcony": true, "active": false }, { "id": 117, "price": "", "row": 2, "seat": 4, "LevelId": 3, "balcony": true, "active": false }, { "id": 116, "price": "", "row": 2, "seat": 5, "LevelId": 3, "balcony": true, "active": false }, { "id": 115, "price": "", "row": 2, "seat": 6, "LevelId": 3, "balcony": true, "active": false }, { "id": 114, "price": "", "row": 2, "seat": 7, "LevelId": 3, "balcony": true, "active": false }, { "id": 113, "price": "", "row": 2, "seat": 8, "LevelId": 3, "balcony": true, "active": false }, { "id": 112, "price": "", "row": 2, "seat": 9, "LevelId": 3, "balcony": true, "active": false }, { "id": 111, "price": "", "row": 2, "seat": 10, "LevelId": 3, "balcony": true, "active": false }, { "id": 110, "price": "", "row": 2, "seat": 11, "LevelId": 3, "balcony": true, "active": false }, { "id": 109, "price": "", "row": 2, "seat": 12, "LevelId": 3, "balcony": true, "active": false }, { "id": 108, "price": "", "row": 2, "seat": 13, "LevelId": 3, "balcony": true, "active": false }, { "id": 107, "price": "", "row": 2, "seat": 14, "LevelId": 3, "balcony": true, "active": false }, { "id": 106, "price": "", "row": 2, "seat": 15, "LevelId": 3, "balcony": true, "active": false }, { "id": 105, "price": "", "row": 2, "seat": 16, "LevelId": 3, "balcony": true, "active": false }, { "id": 104, "price": "", "row": 2, "seat": 17, "LevelId": 3, "balcony": true, "active": false }, { "id": 103, "price": "", "row": 2, "seat": 18, "LevelId": 3, "balcony": true, "active": false }, { "id": 102, "price": "", "row": 2, "seat": 19, "LevelId": 3, "balcony": true, "active": false }, { "id": 101, "price": "", "row": 2, "seat": 20, "LevelId": 3, "balcony": true, "active": false }, { "id": 100, "price": "", "row": 2, "seat": 21, "LevelId": 3, "balcony": true, "active": false }, { "id": 99, "price": "", "row": 2, "seat": 22, "LevelId": 3, "balcony": true, "active": false }, { "id": 98, "price": "", "row": 2, "seat": 23, "LevelId": 3, "balcony": true, "active": false }, { "id": 97, "price": "", "row": 2, "seat": 24, "LevelId": 3, "balcony": true, "active": false }, { "id": 96, "price": "", "row": 2, "seat": 25, "LevelId": 3, "balcony": true, "active": false }, { "id": 95, "price": "", "row": 2, "seat": 26, "LevelId": 3, "balcony": true, "active": false }, { "id": 94, "price": "", "row": 2, "seat": 27, "LevelId": 3, "balcony": true, "active": false },
    //     { "id": 93, "price": "", "row": 3, "seat": 1, "LevelId": 3, "balcony": true, "active": false }, { "id": 92, "price": "", "row": 3, "seat": 2, "LevelId": 3, "balcony": true, "active": false }, { "id": 91, "price": "", "row": 3, "seat": 3, "LevelId": 3, "balcony": true, "active": false }, { "id": 90, "price": "", "row": 3, "seat": 4, "LevelId": 3, "balcony": true, "active": false }, { "id": 89, "price": "", "row": 3, "seat": 5, "LevelId": 3, "balcony": true, "active": false }, { "id": 88, "price": "", "row": 3, "seat": 6, "LevelId": 3, "balcony": true, "active": false }, { "id": 87, "price": "", "row": 3, "seat": 7, "LevelId": 3, "balcony": true, "active": false }, { "id": 86, "price": "", "row": 3, "seat": 8, "LevelId": 3, "balcony": true, "active": false }, { "id": 85, "price": "", "row": 3, "seat": 9, "LevelId": 3, "balcony": true, "active": false }, { "id": 84, "price": "", "row": 3, "seat": 10, "LevelId": 3, "balcony": true, "active": false }, { "id": 83, "price": "", "row": 3, "seat": 11, "LevelId": 3, "balcony": true, "active": false }, { "id": 82, "price": "", "row": 3, "seat": 12, "LevelId": 3, "balcony": true, "active": false }, { "id": 81, "price": "", "row": 3, "seat": 13, "LevelId": 3, "balcony": true, "active": false }, { "id": 80, "price": "", "row": 3, "seat": 14, "LevelId": 3, "balcony": true, "active": false }, { "id": 79, "price": "", "row": 3, "seat": 15, "LevelId": 3, "balcony": true, "active": false }, { "id": 78, "price": "", "row": 3, "seat": 16, "LevelId": 3, "balcony": true, "active": false }, { "id": 77, "price": "", "row": 3, "seat": 17, "LevelId": 3, "balcony": true, "active": false }, { "id": 76, "price": "", "row": 3, "seat": 18, "LevelId": 3, "balcony": true, "active": false }, { "id": 75, "price": "", "row": 3, "seat": 19, "LevelId": 3, "balcony": true, "active": false }, { "id": 74, "price": "", "row": 3, "seat": 20, "LevelId": 3, "balcony": true, "active": false }, { "id": 73, "price": "", "row": 3, "seat": 21, "LevelId": 3, "balcony": true, "active": false }, { "id": 72, "price": "", "row": 3, "seat": 22, "LevelId": 3, "balcony": true, "active": false }, { "id": 71, "price": "", "row": 3, "seat": 23, "LevelId": 3, "balcony": true, "active": false }, { "id": 70, "price": "", "row": 3, "seat": 24, "LevelId": 3, "balcony": true, "active": false }, { "id": 69, "price": "", "row": 3, "seat": 25, "LevelId": 3, "balcony": true, "active": false }, { "id": 68, "price": "", "row": 3, "seat": 26, "LevelId": 3, "balcony": true, "active": false },
    //     { "id": 67, "price": "", "row": 4, "seat": 1, "LevelId": 3, "balcony": true, "active": false }, { "id": 66, "price": "", "row": 4, "seat": 2, "LevelId": 3, "balcony": true, "active": false }, { "id": 65, "price": "", "row": 4, "seat": 3, "LevelId": 3, "balcony": true, "active": false }, { "id": 64, "price": "", "row": 4, "seat": 4, "LevelId": 3, "balcony": true, "active": false }, { "id": 63, "price": "", "row": 4, "seat": 5, "LevelId": 3, "balcony": true, "active": false }, { "id": 62, "price": "", "row": 4, "seat": 6, "LevelId": 3, "balcony": true, "active": false }, { "id": 61, "price": "", "row": 4, "seat": 7, "LevelId": 3, "balcony": true, "active": false }, { "id": 60, "price": "", "row": 4, "seat": 8, "LevelId": 3, "balcony": true, "active": false }, { "id": 59, "price": "", "row": 4, "seat": 9, "LevelId": 3, "balcony": true, "active": false }, { "id": 58, "price": "", "row": 4, "seat": 10, "LevelId": 3, "balcony": true, "active": false }, { "id": 57, "price": "", "row": 4, "seat": 11, "LevelId": 3, "balcony": true, "active": false }, { "id": 56, "price": "", "row": 4, "seat": 12, "LevelId": 3, "balcony": true, "active": false }, { "id": 55, "price": "", "row": 4, "seat": 13, "LevelId": 3, "balcony": true, "active": false }, { "id": 54, "price": "", "row": 4, "seat": 14, "LevelId": 3, "balcony": true, "active": false }, { "id": 53, "price": "", "row": 4, "seat": 15, "LevelId": 3, "balcony": true, "active": false }, { "id": 52, "price": "", "row": 4, "seat": 16, "LevelId": 3, "balcony": true, "active": false },
    //     { "id": 51, "price": "", "row": 5, "seat": 1, "LevelId": 3, "balcony": true, "active": false }, { "id": 50, "price": "", "row": 5, "seat": 2, "LevelId": 3, "balcony": true, "active": false }, { "id": 49, "price": "", "row": 5, "seat": 3, "LevelId": 3, "balcony": true, "active": false }, { "id": 48, "price": "", "row": 5, "seat": 4, "LevelId": 3, "balcony": true, "active": false }, { "id": 47, "price": "", "row": 5, "seat": 5, "LevelId": 3, "balcony": true, "active": false }, { "id": 46, "price": "", "row": 5, "seat": 6, "LevelId": 3, "balcony": true, "active": false }, { "id": 45, "price": "", "row": 5, "seat": 7, "LevelId": 3, "balcony": true, "active": false }, { "id": 44, "price": "", "row": 5, "seat": 8, "LevelId": 3, "balcony": true, "active": false }, { "id": 43, "price": "", "row": 5, "seat": 9, "LevelId": 3, "balcony": true, "active": false }, { "id": 42, "price": "", "row": 5, "seat": 10, "LevelId": 3, "balcony": true, "active": false }, { "id": 41, "price": "", "row": 5, "seat": 11, "LevelId": 3, "balcony": true, "active": false }, { "id": 40, "price": "", "row": 5, "seat": 12, "LevelId": 3, "balcony": true, "active": false }, { "id": 39, "price": "", "row": 5, "seat": 13, "LevelId": 3, "balcony": true, "active": false }, { "id": 38, "price": "", "row": 5, "seat": 14, "LevelId": 3, "balcony": true, "active": false },
    //     { "id": 23, "price": "", "row": 1, "seat": 1, "LevelId": 4, "balcony": true, "active": false }, { "id": 22, "price": "", "row": 1, "seat": 2, "LevelId": 4, "balcony": true, "active": false }, { "id": 21, "price": "", "row": 1, "seat": 3, "LevelId": 4, "balcony": true, "active": false }, { "id": 20, "price": "", "row": 1, "seat": 4, "LevelId": 4, "balcony": true, "active": false }, { "id": 19, "price": "", "row": 1, "seat": 5, "LevelId": 4, "balcony": true, "active": false }, { "id": 18, "price": "", "row": 1, "seat": 6, "LevelId": 4, "balcony": true, "active": false }, { "id": 17, "price": "", "row": 1, "seat": 7, "LevelId": 4, "balcony": true, "active": false }, { "id": 16, "price": "", "row": 1, "seat": 8, "LevelId": 4, "balcony": true, "active": false }, { "id": 15, "price": "", "row": 1, "seat": 9, "LevelId": 4, "balcony": true, "active": false }, { "id": 14, "price": "", "row": 1, "seat": 10, "LevelId": 4, "balcony": true, "active": false }, { "id": 13, "price": "", "row": 1, "seat": 11, "LevelId": 4, "balcony": true, "active": false }, { "id": 12, "price": "", "row": 1, "seat": 12, "LevelId": 4, "balcony": true, "active": false }, { "id": 11, "price": "", "row": 1, "seat": 13, "LevelId": 4, "balcony": true, "active": false }, { "id": 10, "price": "", "row": 1, "seat": 14, "LevelId": 4, "balcony": true, "active": false }, { "id": 9, "price": "", "row": 1, "seat": 15, "LevelId": 4, "balcony": true, "active": false }, { "id": 8, "price": "", "row": 1, "seat": 16, "LevelId": 4, "balcony": true, "active": false }, { "id": 7, "price": "", "row": 1, "seat": 17, "LevelId": 4, "balcony": true, "active": false }, { "id": 6, "price": "", "row": 1, "seat": 18, "LevelId": 4, "balcony": true, "active": false }, { "id": 5, "price": "", "row": 1, "seat": 19, "LevelId": 4, "balcony": true, "active": false }, { "id": 4, "price": "", "row": 1, "seat": 20, "LevelId": 4, "balcony": true, "active": false }, { "id": 3, "price": "", "row": 1, "seat": 21, "LevelId": 4, "balcony": true, "active": false }, { "id": 2, "price": "", "row": 1, "seat": 22, "LevelId": 4, "balcony": true, "active": false }, { "id": 1, "price": "", "row": 1, "seat": 23, "LevelId": 4, "balcony": true, "active": false }, { "id": 0, "price": "", "row": 1, "seat": 24, "LevelId": 4, "balcony": true, "active": false },
    //     { "id": 24, "price": "", "row": 1, "seat": 1, "LevelId": 5, "balcony": true, "active": false }, { "id": 34, "price": "", "row": 1, "seat": 2, "LevelId": 5, "balcony": true, "active": false }, { "id": 35, "price": "", "row": 1, "seat": 3, "LevelId": 5, "balcony": true, "active": false }, { "id": 32, "price": "", "row": 1, "seat": 4, "LevelId": 5, "balcony": true, "active": false }, { "id": 30, "price": "", "row": 1, "seat": 5, "LevelId": 5, "balcony": true, "active": false }, { "id": 28, "price": "", "row": 1, "seat": 5, "LevelId": 6, "balcony": true, "active": false }, { "id": 26, "price": "", "row": 1, "seat": 7, "LevelId": 5, "balcony": true, "active": false },
    //     { "id": 37, "price": "", "row": 1, "seat": 1, "LevelId": 6, "balcony": true, "active": false }, { "id": 36, "price": "", "row": 1, "seat": 2, "LevelId": 6, "balcony": true, "active": false }, { "id": 33, "price": "", "row": 1, "seat": 3, "LevelId": 6, "balcony": true, "active": false }, { "id": 31, "price": "", "row": 1, "seat": 4, "LevelId": 6, "balcony": true, "active": false }, { "id": 29, "price": "", "row": 1, "seat": 5, "LevelId": 6, "balcony": true, "active": false }, { "id": 27, "price": "", "row": 1, "seat": 6, "LevelId": 6, "balcony": true, "active": false }, { "id": 25, "price": "", "row": 1, "seat": 7, "LevelId": 6, "balcony": true, "active": false }
    // ])

    const [seansArr, setSeansArr] = useState([])


    useEffect(() => {
        setSeansArr(JSON.parse(places[0]))
    }, [places])

    // useEffect(() => {
    //     let item = [...seansArr]
    //     seatArr?.map((elm, i) => {
    //         if (elm?.LevelId == 6) {
    //             elm.Places?.map((el, i) => {
    //                 let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e?.LevelId == 6))
    //                 if (item[index]) {
    //                     item[index].active = el?.active
    //                     item[index].price = el?.Price
    //                 }
    //             })
    //         }
    //         else if (elm?.LevelId == 5) {
    //             elm.Places?.map((el, i) => {
    //                 let index = item.findIndex((e) => (e?.row == el?.Row && e?.seat == el?.Seat && e?.LevelId == 5))
    //                 if (item[index]) {
    //                     item[index].active = el?.active
    //                     item[index].price = el?.Price
    //                 }
    //             })
    //         }
    //         else if (elm?.LevelId == 4) {
    //             elm.Places?.map((el, i) => {
    //                 let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e?.LevelId == 4))
    //                 if (item[index]) {
    //                     item[index].active = el?.active
    //                     item[index].price = el?.Price
    //                 }
    //             })
    //         }
    //         else if (elm?.LevelId == 3) {
    //             elm.Places?.map((el, i) => {
    //                 let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e?.LevelId == 3))
    //                 if (item[index]) {
    //                     item[index].active = el?.active
    //                     item[index].price = el?.Price
    //                 }
    //             })
    //         }
    //         else if (elm?.LevelId == 2) {
    //             elm.Places?.map((el, i) => {
    //                 let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e?.LevelId == 2))
    //                 if (item[index]) {
    //                     item[index].active = el?.active
    //                     item[index].price = el?.Price
    //                 }
    //             })
    //         }
    //         else if (elm?.LevelId == 1) {
    //             elm.Places?.map((el, i) => {
    //                 let index = item.findIndex((e) => (e.row == el.Row && e.seat == el.Seat && e?.LevelId == 1))
    //                 if (item[index]) {
    //                     item[index].active = el?.active
    //                     item[index].price = el?.Price
    //                 }
    //             })
    //         }
    //     })
    //     setSeansArr(item)
    // }, [seatArr])


    const [data, setData] = useState([])

    const getPrice = (y, i, x, parterre, amphitheater, lodge) => {
        let temp = [...data]
        if (temp.findIndex((el) => el.id == i) == -1) {
            temp.push({ "id": i, "price": "", "row": 1, "seat": temp.length + 1, LevelId: 6, balcony: true, active: false },)
        }


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
            LevelId: item?.LevelId,
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
                LevelId: temp?.LevelId,
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
        image.src = require('../../assets/ParonyanMec.png')

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
                alt='' src={require('../../assets/ParonyanMec.png')}

            />

            {coordinatesState?.map((e, i) => {
                let index = seansArr.findIndex((el) => el.id == i)
                if (seansArr[index]?.price)
                    return <button
                        key={i}
                        onMouseOver={() => {
                            getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                            setActiveButton(i)
                        }}
                        style={
                            {
                                top: e?.y,
                                left: e?.x - 8,
                                // backgroundColor: e.active && 'green'
                                border: tickets.find((elm) => elm.seatId == e.id) && `1px solid green`,
                                padding: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }
                        id='seatStyle2'
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
                    >
                        <svg width="30" height="30" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            })}

            {showModal &&
                <div style={{ top: position.y - 150, left: position.x, position: 'absolute' }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div>
    )
}
export default Paronyan
