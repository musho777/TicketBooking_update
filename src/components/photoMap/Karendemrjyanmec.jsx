import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'

const Karendemrjyanmec = ({ eventId, soldTickets, sessionID, pading, value, places, isInteracting }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const { tickets } = useSelector((st) => st.tiketsForBuy)
    const [click, setClick] = useState(isInteracting)



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

    const [seansArr, setSeansArr] = useState([
        { id: 434, price: 1, row: 4, seat: 17, Sector: 2, place: 'Right tribune', active: false },
        { id: 431, price: 2, row: 4, seat: 18, Sector: 2, place: 'Right tribune', active: false },
        { id: 427, price: 1, row: 4, seat: 19, Sector: 2, place: 'Right tribune', active: false },
        { id: 423, price: 1, row: 4, seat: 20, Sector: 2, place: 'Right tribune', active: false },
        { id: 419, price: 1, row: 4, seat: 21, Sector: 2, place: 'Right tribune', active: false },
        { id: 415, price: 1, row: 4, seat: 22, Sector: 2, place: 'Right tribune', active: false },
        { id: 411, price: 1, row: 4, seat: 23, Sector: 2, place: 'Right tribune', active: false },
        { id: 407, price: 1, row: 4, seat: 24, Sector: 2, place: 'Right tribune', active: false },
        { id: 403, price: 1, row: 4, seat: 25, Sector: 2, place: 'Right tribune', active: false },
        { id: 402, price: 1, row: 4, seat: 26, Sector: 2, place: 'Right tribune', active: false },
        { id: 401, price: 1, row: 4, seat: 27, Sector: 2, place: 'Right tribune', active: false },
        { id: 400, price: 1, row: 4, seat: 28, Sector: 2, place: 'Right tribune', active: false },
        { id: 396, price: 1, row: 4, seat: 29, Sector: 2, place: 'Right tribune', active: false },
        { id: 392, price: 1, row: 4, seat: 30, Sector: 2, place: 'Right tribune', active: false },
        { id: 388, price: 1, row: 4, seat: 31, Sector: 2, place: 'Right tribune', active: false },

        { id: 450, price: 2, row: 16, seat: 15, Sector: 2, place: 'Right tribune', active: false },
        { id: 449, price: 2, row: 16, seat: 16, Sector: 2, place: 'Right tribune', active: false },
        { id: 448, price: 2, row: 16, seat: 17, Sector: 2, place: 'Right tribune', active: false },
        { id: 447, price: 2, row: 16, seat: 18, Sector: 2, place: 'Right tribune', active: false },
        { id: 446, price: 2, row: 16, seat: 19, Sector: 2, place: 'Right tribune', active: false },
        { id: 444, price: 2, row: 16, seat: 20, Sector: 2, place: 'Right tribune', active: false },
        { id: 442, price: 2, row: 16, seat: 21, Sector: 2, place: 'Right tribune', active: false },
        { id: 440, price: 2, row: 16, seat: 22, Sector: 2, place: 'Right tribune', active: false },
        { id: 438, price: 2, row: 16, seat: 23, Sector: 2, place: 'Right tribune', active: false },
        { id: 436, price: 2, row: 16, seat: 24, Sector: 2, place: 'Right tribune', active: false },
        { id: 433, price: 2, row: 16, seat: 25, Sector: 2, place: 'Right tribune', active: false },
        { id: 430, price: 2, row: 16, seat: 26, Sector: 2, place: 'Right tribune', active: false },
        { id: 426, price: 2, row: 16, seat: 27, Sector: 2, place: 'Right tribune', active: false },
        { id: 422, price: 2, row: 16, seat: 28, Sector: 2, place: 'Right tribune', active: false },
        { id: 418, price: 2, row: 16, seat: 29, Sector: 2, place: 'Right tribune', active: false },
        { id: 414, price: 2, row: 16, seat: 30, Sector: 2, place: 'Right tribune', active: false },
        { id: 410, price: 2, row: 16, seat: 31, Sector: 2, place: 'Right tribune', active: false },
        { id: 406, price: 2, row: 16, seat: 32, Sector: 2, place: 'Right tribune', active: false },


        { id: 445, price: 3, row: 23, seat: 1, Sector: 2, place: 'Right tribune', active: false },
        { id: 443, price: 3, row: 23, seat: 2, Sector: 2, place: 'Right tribune', active: false },
        { id: 441, price: 3, row: 23, seat: 3, Sector: 2, place: 'Right tribune', active: false },
        { id: 439, price: 3, row: 23, seat: 4, Sector: 2, place: 'Right tribune', active: false },
        { id: 417, price: 3, row: 23, seat: 5, Sector: 2, place: 'Right tribune', active: false },
        { id: 421, price: 3, row: 23, seat: 6, Sector: 2, place: 'Right tribune', active: false },
        { id: 425, price: 3, row: 23, seat: 7, Sector: 2, place: 'Right tribune', active: false },
        { id: 429, price: 3, row: 23, seat: 8, Sector: 2, place: 'Right tribune', active: false },
        { id: 432, price: 3, row: 23, seat: 9, Sector: 2, place: 'Right tribune', active: false },
        { id: 435, price: 3, row: 23, seat: 10, Sector: 2, place: 'Right tribune', active: false },
        { id: 437, price: 3, row: 23, seat: 11, Sector: 2, place: 'Right tribune', active: false },
        { id: 413, price: 3, row: 23, seat: 12, Sector: 2, place: 'Right tribune', active: false },
        { id: 409, price: 3, row: 23, seat: 13, Sector: 2, place: 'Right tribune', active: false },
        { id: 405, price: 3, row: 23, seat: 14, Sector: 2, place: 'Right tribune', active: false },

        { id: 404, price: 5, row: 25, seat: 7, Sector: 2, place: 'Right tribune', active: false },
        { id: 408, price: 5, row: 25, seat: 6, Sector: 2, place: 'Right tribune', active: false },
        { id: 412, price: 5, row: 25, seat: 5, Sector: 2, place: 'Right tribune', active: false },
        { id: 416, price: 5, row: 25, seat: 4, Sector: 2, place: 'Right tribune', active: false },
        { id: 420, price: 5, row: 25, seat: 3, Sector: 2, place: 'Right tribune', active: false },
        { id: 424, price: 5, row: 25, seat: 2, Sector: 2, place: 'Right tribune', active: false },
        { id: 428, price: 5, row: 25, seat: 1, Sector: 2, place: 'Right tribune', active: false },


        { id: 258, price: 6, row: 3, seat: 46, Sector: 3, place: 'Right tribune', active: false },
        { id: 260, price: 6, row: 3, seat: 45, Sector: 3, place: 'Right tribune', active: false },
        { id: 262, price: 6, row: 3, seat: 44, Sector: 3, place: 'Right tribune', active: false },
        { id: 266, price: 6, row: 3, seat: 43, Sector: 3, place: 'Right tribune', active: false },
        { id: 271, price: 6, row: 3, seat: 42, Sector: 3, place: 'Right tribune', active: false },
        { id: 276, price: 6, row: 3, seat: 41, Sector: 3, place: 'Right tribune', active: false },
        { id: 338, price: 6, row: 3, seat: 40, Sector: 3, place: 'Right tribune', active: false },
        { id: 343, price: 6, row: 3, seat: 39, Sector: 3, place: 'Right tribune', active: false },
        { id: 348, price: 6, row: 3, seat: 38, Sector: 3, place: 'Right tribune', active: false },
        { id: 353, price: 6, row: 3, seat: 37, Sector: 3, place: 'Right tribune', active: false },
        { id: 358, price: 6, row: 3, seat: 36, Sector: 3, place: 'Right tribune', active: false },
        { id: 363, price: 6, row: 3, seat: 35, Sector: 3, place: 'Right tribune', active: false },
        { id: 368, price: 6, row: 3, seat: 34, Sector: 3, place: 'Right tribune', active: false },
        { id: 373, price: 6, row: 3, seat: 33, Sector: 3, place: 'Right tribune', active: false },
        { id: 378, price: 6, row: 3, seat: 32, Sector: 3, place: 'Right tribune', active: false },



        { id: 377, price: 7, row: 7, seat: 32, Sector: 2, place: 'Right tribune', active: false },
        { id: 372, price: 7, row: 7, seat: 33, Sector: 2, place: 'Right tribune', active: false },
        { id: 367, price: 7, row: 7, seat: 34, Sector: 2, place: 'Right tribune', active: false },
        { id: 362, price: 7, row: 7, seat: 35, Sector: 2, place: 'Right tribune', active: false },
        { id: 357, price: 7, row: 7, seat: 36, Sector: 2, place: 'Right tribune', active: false },
        { id: 352, price: 7, row: 7, seat: 37, Sector: 2, place: 'Right tribune', active: false },
        { id: 347, price: 7, row: 7, seat: 38, Sector: 2, place: 'Right tribune', active: false },
        { id: 342, price: 7, row: 7, seat: 39, Sector: 2, place: 'Right tribune', active: false },
        { id: 337, price: 7, row: 7, seat: 40, Sector: 2, place: 'Right tribune', active: false },
        { id: 275, price: 7, row: 7, seat: 41, Sector: 2, place: 'Right tribune', active: false },
        { id: 270, price: 7, row: 7, seat: 42, Sector: 2, place: 'Right tribune', active: false },
        { id: 265, price: 7, row: 7, seat: 43, Sector: 2, place: 'Right tribune', active: false },
        { id: 261, price: 7, row: 7, seat: 44, Sector: 2, place: 'Right tribune', active: false },
        { id: 259, price: 7, row: 7, seat: 45, Sector: 2, place: 'Right tribune', active: false },
        { id: 257, price: 7, row: 7, seat: 46, Sector: 2, place: 'Right tribune', active: false },

        { id: 397, price: 7, row: 12, seat: 36, Sector: 3, place: 'Right tribune', active: false },
        { id: 393, price: 7, row: 12, seat: 37, Sector: 3, place: 'Right tribune', active: false },
        { id: 389, price: 7, row: 12, seat: 38, Sector: 3, place: 'Right tribune', active: false },
        { id: 385, price: 7, row: 12, seat: 39, Sector: 3, place: 'Right tribune', active: false },
        { id: 382, price: 7, row: 12, seat: 40, Sector: 3, place: 'Right tribune', active: false },
        { id: 379, price: 7, row: 12, seat: 41, Sector: 3, place: 'Right tribune', active: false },
        { id: 374, price: 7, row: 12, seat: 42, Sector: 3, place: 'Right tribune', active: false },
        { id: 369, price: 7, row: 12, seat: 43, Sector: 3, place: 'Right tribune', active: false },
        { id: 364, price: 7, row: 12, seat: 44, Sector: 3, place: 'Right tribune', active: false },
        { id: 359, price: 7, row: 12, seat: 45, Sector: 3, place: 'Right tribune', active: false },
        { id: 354, price: 7, row: 12, seat: 46, Sector: 3, place: 'Right tribune', active: false },
        { id: 349, price: 7, row: 12, seat: 47, Sector: 3, place: 'Right tribune', active: false },
        { id: 344, price: 7, row: 12, seat: 48, Sector: 3, place: 'Right tribune', active: false },
        { id: 339, price: 7, row: 12, seat: 49, Sector: 3, place: 'Right tribune', active: false },
        { id: 277, price: 7, row: 12, seat: 50, Sector: 3, place: 'Right tribune', active: false },
        { id: 272, price: 7, row: 12, seat: 51, Sector: 3, place: 'Right tribune', active: false },
        { id: 267, price: 7, row: 12, seat: 52, Sector: 3, place: 'Right tribune', active: false },



        { id: 399, price: 2, row: 18, seat: 27, Sector: 3, place: 'Right tribune', active: false },
        { id: 395, price: 2, row: 18, seat: 28, Sector: 3, place: 'Right tribune', active: false },
        { id: 391, price: 2, row: 18, seat: 29, Sector: 3, place: 'Right tribune', active: false },
        { id: 387, price: 2, row: 18, seat: 30, Sector: 3, place: 'Right tribune', active: false },
        { id: 384, price: 2, row: 18, seat: 31, Sector: 3, place: 'Right tribune', active: false },
        { id: 381, price: 2, row: 18, seat: 32, Sector: 3, place: 'Right tribune', active: false },
        { id: 376, price: 2, row: 18, seat: 33, Sector: 3, place: 'Right tribune', active: false },
        { id: 371, price: 2, row: 18, seat: 34, Sector: 3, place: 'Right tribune', active: false },
        { id: 366, price: 2, row: 18, seat: 35, Sector: 3, place: 'Right tribune', active: false },
        { id: 360, price: 2, row: 18, seat: 36, Sector: 3, place: 'Right tribune', active: false },
        { id: 356, price: 2, row: 18, seat: 37, Sector: 3, place: 'Right tribune', active: false },
        { id: 351, price: 2, row: 18, seat: 38, Sector: 3, place: 'Right tribune', active: false },
        { id: 346, price: 2, row: 18, seat: 39, Sector: 3, place: 'Right tribune', active: false },
        { id: 341, price: 2, row: 18, seat: 40, Sector: 3, place: 'Right tribune', active: false },
        { id: 306, price: 2, row: 18, seat: 41, Sector: 3, place: 'Right tribune', active: false },
        { id: 274, price: 2, row: 18, seat: 42, Sector: 3, place: 'Right tribune', active: false },
        { id: 269, price: 2, row: 18, seat: 43, Sector: 3, place: 'Right tribune', active: false },
        { id: 264, price: 2, row: 18, seat: 44, Sector: 3, place: 'Right tribune', active: false },



        { id: 398, price: 28, row: 28, seat: 1, Sector: 3, place: 'Right tribune', active: false },
        { id: 394, price: 28, row: 28, seat: 2, Sector: 3, place: 'Right tribune', active: false },
        { id: 390, price: 28, row: 28, seat: 3, Sector: 3, place: 'Right tribune', active: false },
        { id: 386, price: 28, row: 28, seat: 4, Sector: 3, place: 'Right tribune', active: false },
        { id: 383, price: 28, row: 28, seat: 5, Sector: 3, place: 'Right tribune', active: false },
        { id: 380, price: 28, row: 28, seat: 6, Sector: 3, place: 'Right tribune', active: false },
        { id: 375, price: 28, row: 28, seat: 7, Sector: 3, place: 'Right tribune', active: false },
        { id: 370, price: 28, row: 28, seat: 8, Sector: 3, place: 'Right tribune', active: false },
        { id: 365, price: 28, row: 28, seat: 9, Sector: 3, place: 'Right tribune', active: false },
        { id: 361, price: 28, row: 28, seat: 10, Sector: 3, place: 'Right tribune', active: false },
        { id: 355, price: 28, row: 28, seat: 11, Sector: 3, place: 'Right tribune', active: false },
        { id: 350, price: 28, row: 28, seat: 12, Sector: 3, place: 'Right tribune', active: false },
        { id: 345, price: 28, row: 28, seat: 13, Sector: 3, place: 'Right tribune', active: false },
        { id: 340, price: 28, row: 28, seat: 14, Sector: 3, place: 'Right tribune', active: false },
        { id: 305, price: 28, row: 28, seat: 15, Sector: 3, place: 'Right tribune', active: false },
        { id: 273, price: 28, row: 28, seat: 16, Sector: 3, place: 'Right tribune', active: false },
        { id: 268, price: 28, row: 28, seat: 17, Sector: 3, place: 'Right tribune', active: false },
        { id: 263, price: 28, row: 28, seat: 18, Sector: 3, place: 'Right tribune', active: false },



        { id: 94, price: 9, row: 3, seat: 62, Sector: 5, place: 'Right tribune', active: false },
        { id: 92, price: 9, row: 3, seat: 63, Sector: 5, place: 'Right tribune', active: false },
        { id: 90, price: 9, row: 3, seat: 64, Sector: 5, place: 'Right tribune', active: false },
        { id: 87, price: 9, row: 3, seat: 65, Sector: 5, place: 'Right tribune', active: false },
        { id: 84, price: 9, row: 3, seat: 66, Sector: 5, place: 'Right tribune', active: false },
        { id: 81, price: 9, row: 3, seat: 67, Sector: 5, place: 'Right tribune', active: false },
        { id: 78, price: 9, row: 3, seat: 68, Sector: 5, place: 'Right tribune', active: false },
        { id: 74, price: 9, row: 3, seat: 69, Sector: 5, place: 'Right tribune', active: false },
        { id: 72, price: 9, row: 3, seat: 70, Sector: 5, place: 'Right tribune', active: false },
        { id: 69, price: 9, row: 3, seat: 71, Sector: 5, place: 'Right tribune', active: false },
        { id: 66, price: 9, row: 3, seat: 72, Sector: 5, place: 'Right tribune', active: false },
        { id: 63, price: 9, row: 3, seat: 73, Sector: 5, place: 'Right tribune', active: false },
        { id: 59, price: 9, row: 3, seat: 74, Sector: 5, place: 'Right tribune', active: false },
        { id: 57, price: 9, row: 3, seat: 72, Sector: 5, place: 'Right tribune', active: false },
        { id: 54, price: 9, row: 3, seat: 76, Sector: 5, place: 'Right tribune', active: false },



        { id: 93, price: 5, row: 6, seat: 62, Sector: 5, place: 'Right tribune', active: false },
        { id: 91, price: 5, row: 6, seat: 63, Sector: 5, place: 'Right tribune', active: false },
        { id: 89, price: 5, row: 6, seat: 64, Sector: 5, place: 'Right tribune', active: false },
        { id: 86, price: 5, row: 6, seat: 65, Sector: 5, place: 'Right tribune', active: false },
        { id: 83, price: 5, row: 6, seat: 66, Sector: 5, place: 'Right tribune', active: false },
        { id: 80, price: 5, row: 6, seat: 67, Sector: 5, place: 'Right tribune', active: false },
        { id: 77, price: 5, row: 6, seat: 68, Sector: 5, place: 'Right tribune', active: false },
        { id: 75, price: 5, row: 6, seat: 69, Sector: 5, place: 'Right tribune', active: false },
        { id: 71, price: 5, row: 6, seat: 70, Sector: 5, place: 'Right tribune', active: false },
        { id: 68, price: 5, row: 6, seat: 71, Sector: 5, place: 'Right tribune', active: false },
        { id: 65, price: 5, row: 6, seat: 72, Sector: 5, place: 'Right tribune', active: false },
        { id: 62, price: 5, row: 6, seat: 73, Sector: 5, place: 'Right tribune', active: false },
        { id: 60, price: 5, row: 6, seat: 74, Sector: 5, place: 'Right tribune', active: false },
        { id: 56, price: 5, row: 6, seat: 72, Sector: 5, place: 'Right tribune', active: false },
        { id: 53, price: 5, row: 6, seat: 76, Sector: 5, place: 'Right tribune', active: false },


        { id: 88, price: '', row: 10, seat: 36, Sector: 5, place: 'Right tribune', active: false },
        { id: 85, price: '', row: 10, seat: 37, Sector: 5, place: 'Right tribune', active: false },
        { id: 82, price: '', row: 10, seat: 38, Sector: 5, place: 'Right tribune', active: false },
        { id: 79, price: '', row: 10, seat: 39, Sector: 5, place: 'Right tribune', active: false },
        { id: 76, price: '', row: 10, seat: 40, Sector: 5, place: 'Right tribune', active: false },
        { id: 73, price: '', row: 10, seat: 41, Sector: 5, place: 'Right tribune', active: false },
        { id: 70, price: '', row: 10, seat: 42, Sector: 5, place: 'Right tribune', active: false },
        { id: 67, price: '', row: 10, seat: 43, Sector: 5, place: 'Right tribune', active: false },
        { id: 64, price: '', row: 10, seat: 44, Sector: 5, place: 'Right tribune', active: false },
        { id: 61, price: '', row: 10, seat: 45, Sector: 5, place: 'Right tribune', active: false },
        { id: 58, price: '', row: 10, seat: 46, Sector: 5, place: 'Right tribune', active: false },
        { id: 55, price: '', row: 10, seat: 47, Sector: 5, place: 'Right tribune', active: false },
        { id: 52, price: '', row: 10, seat: 48, Sector: 5, place: 'Right tribune', active: false },
        { id: 51, price: '', row: 10, seat: 49, Sector: 5, place: 'Right tribune', active: false },
        { id: 50, price: '', row: 10, seat: 50, Sector: 5, place: 'Right tribune', active: false },
        { id: 49, price: '', row: 10, seat: 51, Sector: 5, place: 'Right tribune', active: false },
        { id: 48, price: '', row: 10, seat: 52, Sector: 5, place: 'Right tribune', active: false },


        { id: 34, price: '', row: 4, seat: 1, place: 'turning stand', active: false },
        { id: 35, price: '', row: 4, seat: 2, place: 'turning stand', active: false },
        { id: 36, price: '', row: 4, seat: 3, place: 'turning stand', active: false },
        { id: 37, price: '', row: 4, seat: 4, place: 'turning stand', active: false },
        { id: 38, price: '', row: 4, seat: 5, place: 'turning stand', active: false },
        { id: 39, price: '', row: 4, seat: 6, place: 'turning stand', active: false },
        { id: 40, price: '', row: 4, seat: 7, place: 'turning stand', active: false },
        { id: 29, price: '', row: 4, seat: 8, place: 'turning stand', active: false },
        { id: 30, price: '', row: 4, seat: 9, place: 'turning stand', active: false },
        { id: 31, price: '', row: 4, seat: 10, place: 'turning stand', active: false },
        { id: 32, price: '', row: 4, seat: 11, place: 'turning stand', active: false },
        { id: 33, price: '', row: 4, seat: 12, place: 'turning stand', active: false },
        { id: 0, price: '', row: 4, seat: 13, place: 'turning stand', active: false },
        { id: 1, price: '', row: 4, seat: 14, place: 'turning stand', active: false },
        { id: 2, price: '', row: 4, seat: 15, place: 'turning stand', active: false },
        { id: 3, price: '', row: 4, seat: 16, place: 'turning stand', active: false },
        { id: 4, price: '', row: 4, seat: 17, place: 'turning stand', active: false },
        { id: 5, price: '', row: 4, seat: 18, place: 'turning stand', active: false },
        { id: 6, price: '', row: 4, seat: 19, place: 'turning stand', active: false },
        { id: 7, price: '', row: 4, seat: 20, place: 'turning stand', active: false },
        { id: 8, price: '', row: 4, seat: 21, place: 'turning stand', active: false },
        { id: 9, price: '', row: 4, seat: 22, place: 'turning stand', active: false },
        { id: 10, price: '', row: 4, seat: 23, place: 'turning stand', active: false },
        { id: 11, price: '', row: 4, seat: 24, place: 'turning stand', active: false },
        { id: 12, price: '', row: 4, seat: 25, place: 'turning stand', active: false },
        { id: 13, price: '', row: 4, seat: 26, place: 'turning stand', active: false },
        { id: 14, price: '', row: 4, seat: 27, place: 'turning stand', active: false },
        { id: 15, price: '', row: 4, seat: 28, place: 'turning stand', active: false },
        { id: 16, price: '', row: 4, seat: 29, place: 'turning stand', active: false },
        { id: 17, price: '', row: 4, seat: 30, place: 'turning stand', active: false },
        { id: 18, price: '', row: 4, seat: 31, place: 'turning stand', active: false },
        { id: 19, price: '', row: 4, seat: 32, place: 'turning stand', active: false },
        { id: 20, price: '', row: 4, seat: 33, place: 'turning stand', active: false },
        { id: 21, price: '', row: 4, seat: 34, place: 'turning stand', active: false },
        { id: 22, price: '', row: 4, seat: 35, place: 'turning stand', active: false },
        { id: 23, price: '', row: 4, seat: 36, place: 'turning stand', active: false },
        { id: 24, price: '', row: 4, seat: 37, place: 'turning stand', active: false },
        { id: 25, price: '', row: 4, seat: 38, place: 'turning stand', active: false },
        { id: 26, price: '', row: 4, seat: 39, place: 'turning stand', active: false },
        { id: 27, price: '', row: 4, seat: 40, place: 'turning stand', active: false },
        { id: 28, price: '', row: 4, seat: 41, place: 'turning stand', active: false },
        { id: 41, price: '', row: 4, seat: 42, place: 'turning stand', active: false },
        { id: 42, price: '', row: 4, seat: 43, place: 'turning stand', active: false },
        { id: 43, price: '', row: 4, seat: 44, place: 'turning stand', active: false },
        { id: 44, price: '', row: 4, seat: 45, place: 'turning stand', active: false },
        { id: 45, price: '', row: 4, seat: 46, place: 'turning stand', active: false },
        { id: 46, price: '', row: 4, seat: 47, place: 'turning stand', active: false },
        { id: 47, price: '', row: 4, seat: 48, place: 'turning stand', active: false },



        { id: 145, price: '', row: 22, seat: 1, place: 'Parterre', active: false },
        { id: 144, price: '', row: 22, seat: 2, place: 'Parterre', active: false },
        { id: 143, price: '', row: 22, seat: 3, place: 'Parterre', active: false },
        { id: 142, price: '', row: 22, seat: 4, place: 'Parterre', active: false },
        { id: 141, price: '', row: 22, seat: 5, place: 'Parterre', active: false },
        { id: 140, price: '', row: 22, seat: 6, place: 'Parterre', active: false },
        { id: 139, price: '', row: 22, seat: 7, place: 'Parterre', active: false },
        { id: 138, price: '', row: 22, seat: 8, place: 'Parterre', active: false },
        { id: 137, price: '', row: 22, seat: 9, place: 'Parterre', active: false },
        { id: 136, price: '', row: 22, seat: 10, place: 'Parterre', active: false },
        { id: 135, price: '', row: 22, seat: 11, place: 'Parterre', active: false },
        { id: 134, price: '', row: 22, seat: 12, place: 'Parterre', active: false },
        { id: 133, price: '', row: 22, seat: 13, place: 'Parterre', active: false },
        { id: 132, price: '', row: 22, seat: 14, place: 'Parterre', active: false },
        { id: 131, price: '', row: 22, seat: 15, place: 'Parterre', active: false },
        { id: 130, price: '', row: 22, seat: 16, place: 'Parterre', active: false },
        { id: 129, price: '', row: 22, seat: 17, place: 'Parterre', active: false },
        { id: 128, price: '', row: 22, seat: 18, place: 'Parterre', active: false },
        { id: 127, price: '', row: 22, seat: 19, place: 'Parterre', active: false },
        { id: 120, price: '', row: 22, seat: 20, place: 'Parterre', active: false },
        { id: 122, price: '', row: 22, seat: 21, place: 'Parterre', active: false },
        { id: 123, price: '', row: 22, seat: 22, place: 'Parterre', active: false },
        { id: 124, price: '', row: 22, seat: 23, place: 'Parterre', active: false },
        { id: 125, price: '', row: 22, seat: 24, place: 'Parterre', active: false },
        { id: 126, price: '', row: 22, seat: 25, place: 'Parterre', active: false },
        { id: 95, price: '', row: 22, seat: 26, place: 'Parterre', active: false },
        { id: 96, price: '', row: 22, seat: 27, place: 'Parterre', active: false },
        { id: 97, price: '', row: 22, seat: 28, place: 'Parterre', active: false },
        { id: 98, price: '', row: 22, seat: 29, place: 'Parterre', active: false },
        { id: 99, price: '', row: 22, seat: 30, place: 'Parterre', active: false },
        { id: 100, price: '', row: 22, seat: 31, place: 'Parterre', active: false },
        { id: 101, price: '', row: 22, seat: 32, place: 'Parterre', active: false },
        { id: 102, price: '', row: 22, seat: 33, place: 'Parterre', active: false },
        { id: 103, price: '', row: 22, seat: 34, place: 'Parterre', active: false },
        { id: 146, price: '', row: 22, seat: 35, place: 'Parterre', active: false },
        { id: 105, price: '', row: 22, seat: 36, place: 'Parterre', active: false },
        { id: 106, price: '', row: 22, seat: 37, place: 'Parterre', active: false },
        { id: 107, price: '', row: 22, seat: 38, place: 'Parterre', active: false },
        { id: 108, price: '', row: 22, seat: 39, place: 'Parterre', active: false },
        { id: 109, price: '', row: 22, seat: 40, place: 'Parterre', active: false },
        { id: 110, price: '', row: 22, seat: 41, place: 'Parterre', active: false },
        { id: 111, price: '', row: 22, seat: 42, place: 'Parterre', active: false },
        { id: 112, price: '', row: 22, seat: 43, place: 'Parterre', active: false },
        { id: 113, price: '', row: 22, seat: 44, place: 'Parterre', active: false },
        { id: 114, price: '', row: 22, seat: 45, place: 'Parterre', active: false },
        { id: 115, price: '', row: 22, seat: 46, place: 'Parterre', active: false },
        { id: 116, price: '', row: 22, seat: 47, place: 'Parterre', active: false },
        { id: 117, price: '', row: 22, seat: 48, place: 'Parterre', active: false },
        { id: 118, price: '', row: 22, seat: 49, place: 'Parterre', active: false },
        { id: 119, price: '', row: 22, seat: 50, place: 'Parterre', active: false },

        { id: 173, price: 1, row: 18, seat: 1, place: 'Parterre', active: false },
        { id: 172, price: 2, row: 18, seat: 2, place: 'Parterre', active: false },
        { id: 171, price: 3, row: 18, seat: 3, place: 'Parterre', active: false },
        { id: 170, price: 4, row: 18, seat: 4, place: 'Parterre', active: false },
        { id: 169, price: 5, row: 18, seat: 5, place: 'Parterre', active: false },
        { id: 200, price: 6, row: 18, seat: 6, place: 'Parterre', active: false },
        { id: 167, price: 7, row: 18, seat: 7, place: 'Parterre', active: false },
        { id: 166, price: 8, row: 18, seat: 8, place: 'Parterre', active: false },
        { id: 164, price: 9, row: 18, seat: 10, place: 'Parterre', active: false },
        { id: 163, price: 10, row: 18, seat: 11, place: 'Parterre', active: false },
        { id: 162, price: 11, row: 18, seat: 12, place: 'Parterre', active: false },
        { id: 161, price: 12, row: 18, seat: 13, place: 'Parterre', active: false },
        { id: 160, price: 13, row: 18, seat: 14, place: 'Parterre', active: false },
        { id: 159, price: 14, row: 18, seat: 15, place: 'Parterre', active: false },
        { id: 158, price: 15, row: 18, seat: 16, place: 'Parterre', active: false },
        { id: 157, price: 16, row: 18, seat: 17, place: 'Parterre', active: false },
        { id: 156, price: 17, row: 18, seat: 18, place: 'Parterre', active: false },
        { id: 155, price: 18, row: 18, seat: 19, place: 'Parterre', active: false },
        { id: 154, price: 19, row: 18, seat: 20, place: 'Parterre', active: false },
        { id: 152, price: 20, row: 18, seat: 22, place: 'Parterre', active: false },
        { id: 151, price: 21, row: 18, seat: 23, place: 'Parterre', active: false },
        { id: 150, price: 22, row: 18, seat: 24, place: 'Parterre', active: false },
        { id: 149, price: 23, row: 18, seat: 25, place: 'Parterre', active: false },
        { id: 148, price: 24, row: 18, seat: 26, place: 'Parterre', active: false },
        { id: 147, price: 25, row: 18, seat: 27, place: 'Parterre', active: false },
        { id: 198, price: 26, row: 18, seat: 29, place: 'Parterre', active: false },
        { id: 197, price: 27, row: 18, seat: 30, place: 'Parterre', active: false },
        { id: 196, price: 28, row: 18, seat: 31, place: 'Parterre', active: false },
        { id: 195, price: 29, row: 18, seat: 32, place: 'Parterre', active: false },
        { id: 194, price: 30, row: 18, seat: 33, place: 'Parterre', active: false },
        { id: 193, price: 31, row: 18, seat: 34, place: 'Parterre', active: false },
        { id: 192, price: 32, row: 18, seat: 35, place: 'Parterre', active: false },
        { id: 191, price: 33, row: 18, seat: 37, place: 'Parterre', active: false },
        { id: 190, price: 34, row: 18, seat: 38, place: 'Parterre', active: false },
        { id: 189, price: 35, row: 18, seat: 39, place: 'Parterre', active: false },
        { id: 188, price: 36, row: 18, seat: 40, place: 'Parterre', active: false },
        { id: 187, price: 37, row: 18, seat: 41, place: 'Parterre', active: false },
        { id: 186, price: 38, row: 18, seat: 42, place: 'Parterre', active: false },
        { id: 185, price: 39, row: 18, seat: 43, place: 'Parterre', active: false },
        { id: 184, price: 40, row: 18, seat: 44, place: 'Parterre', active: false },
        { id: 183, price: 41, row: 18, seat: 45, place: 'Parterre', active: false },
        { id: 182, price: 42, row: 18, seat: 46, place: 'Parterre', active: false },
        { id: 181, price: 43, row: 18, seat: 47, place: 'Parterre', active: false },
        { id: 180, price: 44, row: 18, seat: 48, place: 'Parterre', active: false },
        { id: 179, price: 45, row: 18, seat: 49, place: 'Parterre', active: false },
        { id: 178, price: 46, row: 18, seat: 50, place: 'Parterre', active: false },
        { id: 177, price: 47, row: 18, seat: 51, place: 'Parterre', active: false },
        { id: 176, price: 48, row: 18, seat: 52, place: 'Parterre', active: false },
        { id: 175, price: 49, row: 18, seat: 53, place: 'Parterre', active: false },
        { id: 174, price: 50, row: 18, seat: 54, place: 'Parterre', active: false },



        { id: 227, price: 9, row: 8, seat: 1, place: 'Parterre', active: false },
        { id: 226, price: 9, row: 8, seat: 2, place: 'Parterre', active: false },
        { id: 225, price: 9, row: 8, seat: 3, place: 'Parterre', active: false },
        { id: 224, price: 9, row: 8, seat: 4, place: 'Parterre', active: false },
        { id: 223, price: 9, row: 8, seat: 5, place: 'Parterre', active: false },
        { id: 222, price: 9, row: 8, seat: 6, place: 'Parterre', active: false },
        { id: 221, price: 9, row: 8, seat: 7, place: 'Parterre', active: false },
        { id: 219, price: 9, row: 8, seat: 8, place: 'Parterre', active: false },
        { id: 218, price: 9, row: 8, seat: 9, place: 'Parterre', active: false },
        { id: 217, price: 9, row: 8, seat: 10, place: 'Parterre', active: false },
        { id: 216, price: 9, row: 8, seat: 11, place: 'Parterre', active: false },
        { id: 215, price: 9, row: 8, seat: 12, place: 'Parterre', active: false },
        { id: 214, price: 9, row: 8, seat: 13, place: 'Parterre', active: false },
        { id: 213, price: 9, row: 8, seat: 14, place: 'Parterre', active: false },
        { id: 212, price: 9, row: 8, seat: 15, place: 'Parterre', active: false },
        { id: 211, price: 9, row: 8, seat: 16, place: 'Parterre', active: false },
        { id: 210, price: 9, row: 8, seat: 17, place: 'Parterre', active: false },
        { id: 209, price: 9, row: 8, seat: 18, place: 'Parterre', active: false },
        { id: 208, price: 9, row: 8, seat: 19, place: 'Parterre', active: false },
        { id: 207, price: 9, row: 8, seat: 20, place: 'Parterre', active: false },
        { id: 206, price: 9, row: 8, seat: 21, place: 'Parterre', active: false },
        { id: 205, price: 9, row: 8, seat: 22, place: 'Parterre', active: false },
        { id: 254, price: 9, row: 8, seat: 23, place: 'Parterre', active: false },
        { id: 203, price: 9, row: 8, seat: 24, place: 'Parterre', active: false },
        { id: 202, price: 9, row: 8, seat: 25, place: 'Parterre', active: false },
        { id: 253, price: 9, row: 8, seat: 26, place: 'Parterre', active: false },
        { id: 252, price: 9, row: 8, seat: 27, place: 'Parterre', active: false },
        { id: 256, price: 9, row: 8, seat: 28, place: 'Parterre', active: false },
        { id: 250, price: 9, row: 8, seat: 29, place: 'Parterre', active: false },
        { id: 249, price: 9, row: 8, seat: 30, place: 'Parterre', active: false },
        { id: 248, price: 9, row: 8, seat: 31, place: 'Parterre', active: false },
        { id: 247, price: 9, row: 8, seat: 32, place: 'Parterre', active: false },
        { id: 246, price: 9, row: 8, seat: 33, place: 'Parterre', active: false },
        { id: 245, price: 9, row: 8, seat: 34, place: 'Parterre', active: false },
        { id: 244, price: 9, row: 8, seat: 35, place: 'Parterre', active: false },
        { id: 243, price: 9, row: 8, seat: 36, place: 'Parterre', active: false },
        { id: 242, price: 9, row: 8, seat: 37, place: 'Parterre', active: false },
        { id: 240, price: 9, row: 8, seat: 38, place: 'Parterre', active: false },
        { id: 239, price: 9, row: 8, seat: 39, place: 'Parterre', active: false },
        { id: 238, price: 9, row: 8, seat: 40, place: 'Parterre', active: false },
        { id: 237, price: 9, row: 8, seat: 41, place: 'Parterre', active: false },
        { id: 236, price: 9, row: 8, seat: 42, place: 'Parterre', active: false },
        { id: 235, price: 9, row: 8, seat: 43, place: 'Parterre', active: false },
        { id: 234, price: 9, row: 8, seat: 44, place: 'Parterre', active: false },
        { id: 255, price: 9, row: 8, seat: 45, place: 'Parterre', active: false },
        { id: 232, price: 9, row: 8, seat: 46, place: 'Parterre', active: false },
        { id: 231, price: 9, row: 8, seat: 47, place: 'Parterre', active: false },
        { id: 230, price: 9, row: 8, seat: 48, place: 'Parterre', active: false },
        { id: 229, price: 9, row: 8, seat: 49, place: 'Parterre', active: false },
        { id: 228, price: 9, row: 8, seat: 50, place: 'Parterre', active: false },



        { id: 304, price: 3, row: 2, seat: 1, place: 'Parterre', active: false },
        { id: 303, price: 3, row: 2, seat: 2, place: 'Parterre', active: false },
        { id: 302, price: 3, row: 2, seat: 3, place: 'Parterre', active: false },
        { id: 301, price: 3, row: 2, seat: 4, place: 'Parterre', active: false },
        { id: 299, price: 3, row: 2, seat: 5, place: 'Parterre', active: false },
        { id: 298, price: 3, row: 2, seat: 6, place: 'Parterre', active: false },
        { id: 297, price: 3, row: 2, seat: 7, place: 'Parterre', active: false },
        { id: 296, price: 3, row: 2, seat: 8, place: 'Parterre', active: false },
        { id: 295, price: 3, row: 2, seat: 9, place: 'Parterre', active: false },
        { id: 294, price: 3, row: 2, seat: 10, place: 'Parterre', active: false },
        { id: 293, price: 3, row: 2, seat: 11, place: 'Parterre', active: false },
        { id: 292, price: 3, row: 2, seat: 12, place: 'Parterre', active: false },
        { id: 291, price: 3, row: 2, seat: 13, place: 'Parterre', active: false },
        { id: 290, price: 3, row: 2, seat: 14, place: 'Parterre', active: false },
        { id: 289, price: 3, row: 2, seat: 15, place: 'Parterre', active: false },
        { id: 288, price: 3, row: 2, seat: 16, place: 'Parterre', active: false },
        { id: 286, price: 3, row: 2, seat: 17, place: 'Parterre', active: false },
        { id: 285, price: 3, row: 2, seat: 18, place: 'Parterre', active: false },
        { id: 284, price: 3, row: 2, seat: 19, place: 'Parterre', active: false },
        { id: 283, price: 3, row: 2, seat: 20, place: 'Parterre', active: false },
        { id: 282, price: 3, row: 2, seat: 21, place: 'Parterre', active: false },
        { id: 281, price: 3, row: 2, seat: 22, place: 'Parterre', active: false },
        { id: 280, price: 3, row: 2, seat: 23, place: 'Parterre', active: false },
        { id: 279, price: 3, row: 2, seat: 24, place: 'Parterre', active: false },
        { id: 278, price: 3, row: 2, seat: 25, place: 'Parterre', active: false },
        { id: 335, price: 3, row: 2, seat: 26, place: 'Parterre', active: false },
        { id: 333, price: 3, row: 2, seat: 27, place: 'Parterre', active: false },
        { id: 332, price: 3, row: 2, seat: 28, place: 'Parterre', active: false },
        { id: 331, price: 3, row: 2, seat: 29, place: 'Parterre', active: false },
        { id: 329, price: 3, row: 2, seat: 30, place: 'Parterre', active: false },
        { id: 328, price: 3, row: 2, seat: 31, place: 'Parterre', active: false },
        { id: 327, price: 3, row: 2, seat: 32, place: 'Parterre', active: false },
        { id: 326, price: 3, row: 2, seat: 33, place: 'Parterre', active: false },
        { id: 325, price: 3, row: 2, seat: 34, place: 'Parterre', active: false },
        { id: 324, price: 3, row: 2, seat: 35, place: 'Parterre', active: false },
        { id: 323, price: 3, row: 2, seat: 36, place: 'Parterre', active: false },
        { id: 322, price: 3, row: 2, seat: 37, place: 'Parterre', active: false },
        { id: 321, price: 3, row: 2, seat: 38, place: 'Parterre', active: false },
        { id: 320, price: 3, row: 2, seat: 39, place: 'Parterre', active: false },
        { id: 319, price: 3, row: 2, seat: 40, place: 'Parterre', active: false },
        { id: 317, price: 3, row: 2, seat: 41, place: 'Parterre', active: false },
        { id: 316, price: 3, row: 2, seat: 42, place: 'Parterre', active: false },
        { id: 315, price: 3, row: 2, seat: 43, place: 'Parterre', active: false },
        { id: 314, price: 3, row: 2, seat: 44, place: 'Parterre', active: false },
        { id: 313, price: 3, row: 2, seat: 45, place: 'Parterre', active: false },
        { id: 312, price: 3, row: 2, seat: 46, place: 'Parterre', active: false },
        { id: 311, price: 3, row: 2, seat: 47, place: 'Parterre', active: false },
        { id: 309, price: 3, row: 2, seat: 48, place: 'Parterre', active: false },
        { id: 308, price: 3, row: 2, seat: 49, place: 'Parterre', active: false },
        { id: 307, price: 3, row: 2, seat: 50, place: 'Parterre', active: false },
    ])

    useEffect(() => {
        if (places?.length > 0) {
            setSeansArr(JSON.parse(places[0]))
        }
    }, [places])


    const [data, setData] = useState('')


    const getPrice = (y, i, x) => {

        let temp = [...data]
        if (temp.findIndex((el) => el.id == i) == -1) {
            temp.push({ "id": i, "price": "", "row": 4, "seat": temp.length + 1, "Sector": 2, })
        }
        // console.log(temp)
        // console.log("x: " + x, "y: " + y, "i", i)
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

    const addTicket = (i) => {
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
            {coordinatesState.map((e, i) => {
                let top = -5
                let left = -11
                let roted = 0
                if (e.x >= 386 && e.x <= 597 && e.y >= 2233 && e.y <= 2549) {
                    top = -20
                    left = -4
                    roted = -90
                }
                else if (e.x >= 951 && e.x <= 952 && e.y >= 2117 && e.y <= 2377) {
                    top = -20
                    left = -4
                    roted = -90
                }
                else if (e.x >= 881 && e.x <= 975 && e.y >= 1802 && e.y <= 2063) {
                    top = -20
                    left = -4
                    roted = -90
                }
                else if (e.x >= 316 && e.x <= 975 && e.y >= 1855 && e.y <= 2170) {
                    top = -20
                    left = -4
                    roted = -90
                }
                else if (e.x >= 905 && e.x <= 975 && e.y >= 1172 && e.y <= 1433) {
                    top = -20
                    left = -4
                    roted = -90
                }
                else if (e.x >= 738 && e.y >= 1091 && e.y <= 1387) {
                    top = -20
                    left = -4
                    roted = -90
                }
                // else if ((e.x >= 386 && (e.x != 627 && e.x != 620 && e.x != 642 && e.x != 653 && e.x != 648 && e.x != 649 && e.x != 664)) && e.x <= 667 && e.y <= 1780 && (e.y > 1487 || e.y == 1475)) {
                //     if (e.x != 627 || e.x != 620 || e.x != 642) {
                //         top = -12
                //         left = -4
                //         roted = -50
                //     }
                // }
                // else if (e.x >= 500 && e.x <= 879 && e.y >= 1269 && e.y <= 1648) {
                //     top = -5
                //     left = -7
                //     roted = -20
                // }
                // else if (e.x >= 954 && (e.x <= 1332 && e.x != 1267 && e.x != 1284 && e.x != 1295 && e.x != 1311 && e.x != 1300 && e.x != 1317 && e.x != 1328 && e.x != 1309 && e.x != 1325 && e.x != 1329) && e.y >= 1267 && (e.y <= 1646 && e.y != 1596 && e.y != 1579 && e.y != 1613 && e.y != 1630 && e.y != 1622 && e.y != 1596 && e.y != 1639)) {
                //     top = -3
                //     left = -13
                //     roted = 20
                // }
                // else if (e.x >= 1166 && (e.x <= 1435) && e.y >= 1372 && e.y <= 1773 && (e.x != 1424)) {
                //     top = -4
                //     left = -18
                //     roted = 50
                // }
                // else if (e.x >= 1272 && e.x <= 1473 && e.y >= 1765 && e.y <= 1937) {
                //     top = -8
                //     left = -24
                //     roted = 70
                // }
                // else if (e.x >= 148 && e.x <= 473 && e.y >= 1172 && e.y <= 1408) {
                //     top = -7
                //     left = -6
                //     roted = -30
                // }
                // else if (e.x >= 474 && e.x <= 875 && e.y >= 914 && e.y <= 1229) {
                //     top = -4
                //     left = -8
                //     roted = -10
                // }
                // else if (e.x >= 979 && e.x <= 1378 && e.y >= 913 && e.y <= 1220) {
                //     top = -3
                //     left = -12
                //     roted = 10
                // }

                // else if (e.x >= 979 && e.x <= 1378 && e.y >= 913 && e.y <= 1220) {
                //     top = -3
                //     left = -12
                //     roted = 10
                // }
                // else if (e.x >= 1391 && e.x <= 1704 && e.y >= 1169 && e.y <= 1405) {
                //     top = -3
                //     left = -14
                //     roted = 25
                // }

                // else if (e.x >= 190 && e.x <= 315 && e.y >= 776 && e.y <= 1033) {
                //     top = -18
                //     left = -4
                //     roted = -80
                // }
                // else if (e.x >= 213 && e.x <= 367 && e.y >= 471 && e.y <= 709) {
                //     top = -17
                //     left = -4
                //     roted = -70
                // }

                // else if (e.x >= 359 && e.x <= 559 && e.y >= 222 && e.y <= 437) {
                //     top = -8
                //     left = -4
                //     roted = -45
                // }
                // else if (e.x >= 640 && e.x <= 875 && e.y >= 96 && e.y <= 238) {
                //     top = -4
                //     left = -8
                //     roted = -10
                // }
                // else if (e.x >= 936 && e.x <= 1220 && e.y >= 96 && e.y <= 230) {
                //     top = -4
                //     left = -12
                //     roted = 15
                // }
                // else if (e.x >= 1279 && e.x <= 1505 && e.y >= 217 && e.y <= 427) {
                //     top = -4
                //     left = -16
                //     roted = 40
                // }
                // else if (e.x >= 1477 && e.x <= 1641 && e.y >= 467 && e.y <= 695) {
                //     top = -7
                //     left = -24
                //     roted = 70
                // }
                // else if (e.x >= 1543 && e.x <= 1671 && e.y >= 771 && e.y <= 1028) {
                //     top = -10
                //     left = -25
                //     roted = 90
                // }

                if (seansArr.find((e) => e.id == i)?.price && seansArr.find((e) => e.id == i)?.price > 0) {
                    if (soldTickets.findIndex((elm) => elm.id == e.id) < 0) {
                        return <button
                            key={i}
                            onMouseOver={() => {

                                getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                                setActiveButton(i)

                            }}
                            style={
                                {
                                    top: e?.y + top, left: e?.x + left,
                                    backgroundColor: tickets.find((elm) => elm.seatId == e.id) && '#24005C',
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
                                if (!click) {
                                    addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                }
                            }
                            }
                            onTouchStart={() => {
                                if (!click) {
                                    getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                                    setActiveButton(i)
                                }
                                if (click) {
                                    setActiveButton(null)
                                }
                            }}
                            onTouchEnd={() => {
                                if (!click) {
                                    addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                }
                                if (click) {
                                    setActiveButton(null)
                                }
                            }}
                        >

                            {!tickets.find((elm) => elm.seatId == e.id) &&
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
                            }
                        </button>
                    }
                }
            })
            }

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
export default Karendemrjyanmec
