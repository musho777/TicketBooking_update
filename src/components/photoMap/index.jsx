import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'
import { PuffLoader } from 'react-spinners'

const PhotoCoordinatesByColor = ({ secion, soldTickets, sessionID, eventId }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const [loading, setLoading] = useState(true)
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



    const getPrice = (y, i, x, price, row, id, parterre, amphitheater, lodge) => {
        setPosition({ x, y })
        let seat = 0
        const result = coordinatesState.filter((elm) => elm.y === y);
        const index = result.findIndex((elm) => elm.x === x)
        seat = result.length - (result.length - index - 1)
        setActiveTicket({
            row: row,
            price: price,
            seat,
            seatId: i,
            sessionId: sessionID,
            parterre: parterre,
            amphitheater: amphitheater,
            lodge: lodge,
            eventId: eventId,
        })
        setShowModal(true)
    }


    const addTicket = (y, i, x, price, row, id, parterre, amphitheater, lodge) => {
        let data = [...coordinatesState]
        let seat = 0
        const result = coordinatesState.filter((elm) => elm.y === y);
        const index = result.findIndex((elm) => elm.x === x)
        seat = result.length - (result.length - index - 1)
        let item = {}
        data[i].active = !data[i].active
        if (windowSize.width <= 768) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 5000)
            item = {
                row: row,
                price: price,
                seat,
                seatId: i,
                sessionId: sessionID,
                parterre: parterre,
                amphitheater: amphitheater,
                lodge: lodge,
                eventId: eventId,
            }
        }
        else {
            item = activeTicket
        }
        if (data[i].active) {
            dispatch(SetTicketsAction(item))
        }
        else {
            setShowModal(false)
            dispatch(RemoveTicketsAction(item))
        }

        setCoordinatesState(data)
    }

    useEffect(() => {
        const image = new Image()
        image.src = require('../../assets/ActualPlan.png')
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)

            const imageData = ctx.getImageData(0, 0, image.width, image.height)
            const pixelData = imageData.data
            const coordinates = []
            let id = 0
            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    const offset = (y * image.width + x) * 4
                    const r = pixelData[offset]
                    const g = pixelData[offset + 1]
                    const b = pixelData[offset + 2]
                    let parterre = false
                    let amphitheater = false
                    let lodge = false
                    if (r >= 100 && g <= 30 && b <= 30) {
                        id = coordinates.length
                        let row = 1
                        let row2 = 1
                        let section = 0
                        if (y === 885) {
                            row = 1
                            row2 = 1
                        }
                        else if (y === 866) {
                            row = 2
                            row2 = 2
                        }
                        else if (y === 847) {
                            row = 3
                            row2 = 3
                        }
                        else if (y === 828) {
                            row = 4
                            row2 = 4
                        }
                        else if (y === 809) {
                            row = 5
                            row2 = 5
                        }
                        else if (y === 789) {
                            row = 6
                            row2 = 6
                        }
                        else if (y === 770) {
                            row = 7
                            row2 = 7
                        }

                        else if (y === 751) {
                            row = 8
                            row2 = 8

                        }
                        else if (y === 732) {
                            row = 9
                            row2 = 9
                        }
                        else if (y === 713) {
                            row = 10
                            row2 = 10
                        }
                        else if (y === 674) {
                            row = 11
                            row2 = 1
                        }
                        else if (y === 655) {
                            row = 12
                            row2 = 2
                        }
                        else if (y === 635) {
                            row = 13
                            row2 = 3
                        }
                        else if (y === 616) {
                            row = 14
                            row2 = 4
                        }
                        else if (y === 597) {
                            row = 15
                            row2 = 5
                        }
                        else if (y === 559) {
                            row = 16
                            row2 = 1
                        }
                        else if (y === 540) {
                            row = 17
                            row2 = 2
                        }
                        else if (y === 521) {
                            row = 18
                            row2 = 3
                        }
                        else if (y === 502) {
                            row = 19
                            row2 = 4
                        }
                        else if (y === 483) {
                            row = 20
                            row2 = 5
                        }
                        else if (y === 432) {
                            row = 1
                            row2 = 1
                        }
                        else if (y === 413) {
                            row = 2
                            row2 = 2
                        }
                        else if (y === 394) {
                            row = 3
                            row2 = 3
                        }
                        else if (y === 375) {
                            row = 4
                            row2 = 4
                        }
                        else if (y === 355) {
                            row = 5
                            row2 = 5
                        }
                        else if (y === 336) {
                            row = 6
                            row2 = 6

                        }
                        else if (y === 317) {
                            row = 7
                            row2 = 7

                        }
                        else if (y === 273) {
                            row = 8
                            row2 = 1
                        }
                        else if (y === 253) {
                            row = 9
                            row2 = 2
                        }
                        else if (y === 234) {
                            row = 10
                            row2 = 3
                        }
                        else if (y === 215) {
                            row = 11
                            row2 = 4
                        }
                        else if (y === 196) {
                            row = 12
                            row2 = 5
                        }
                        else if (y === 177) {
                            row = 13
                            row2 = 6
                        }
                        else if (y === 158) {
                            row = 14
                            row2 = 7
                        }
                        else if (y === 139) {
                            row = 15
                            row2 = 8
                        }
                        else if (y === 120) {
                            row = 16
                            row2 = 9
                        }
                        else if (y === 101) {
                            row = 17
                            row2 = 10
                        }
                        else if (y === 82) {
                            row = 18
                            row2 = 11
                        }
                        else if (y === 62) {
                            row = 19
                            row2 = 1
                        }

                        if ((id <= 2005 && id >= 1998) || (id <= 1961 && id >= 1953) || (id <= 1915 && id >= 1906) || (id <= 1867 && id >= 1858) || (id <= 1816 && id >= 1806) || (id <= 1764 && id >= 1754) || (id <= 1711 && id >= 1701) || (id <= 1655 && id >= 1644) || (id <= 1598 && id >= 1587) || (id <= 1541 && id >= 1530)) {
                            section = 1
                            parterre = true
                            amphitheater = false
                            lodge = false

                        }
                        else if ((id <= 2014 && id >= 2006) || (id <= 1970 && id >= 1962) || (id <= 1924 && id >= 1916) || (id <= 1876 && id >= 1868) || (id <= 1826 && id >= 1817) || (id <= 1774 && id >= 1765) || (id <= 1721 && id >= 1712) || (id <= 1666 && id >= 1656) || (id <= 1609 && id >= 1599) || (id <= 1552 && id >= 1542)) {
                            section = 2
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 2023 && id >= 2015) || (id <= 1979 && id >= 1971) || (id <= 1933 && id >= 1925) || (id <= 1885 && id >= 1877) || (id <= 1836 && id >= 1827) || (id <= 1784 && id >= 1775) || (id <= 1731 && id >= 1722) || (id <= 1677 && id >= 1667) || (id <= 1620 && id >= 1610) || (id <= 1563 && id >= 1553)) {
                            section = 3
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }

                        else if ((id <= 2032 && id >= 2024) || (id <= 1988 && id >= 1980) || (id <= 1942 && id >= 1934) || (id <= 1895 && id >= 1886) || (id <= 1846 && id >= 1837) || (id <= 1794 && id >= 1785) || (id <= 1742 && id >= 1732) || (id <= 1688 && id >= 1678) || (id <= 1631 && id >= 1621) || (id <= 1574 && id >= 1564)) {
                            section = 4
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 2040 && id >= 2033) || (id <= 1997 && id >= 1989) || (id <= 1952 && id >= 1943) || (id <= 1905 && id >= 1896) || (id <= 1857 && id >= 1847) || (id <= 1805 && id >= 1795) || (id <= 1753 && id >= 1743) || (id <= 1700 && id >= 1689) || (id <= 1643 && id >= 1632) || (id <= 1586 && id >= 1575)) {
                            section = 5
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1482 && id >= 1473) || (id <= 1425 && id >= 1415) || (id <= 1364 && id >= 1354) || (id <= 1303 && id >= 1293) || (id <= 1241 && id >= 1230)) {
                            section = 6
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1494 && id >= 1483) || (id <= 1437 && id >= 1426) || (id <= 1377 && id >= 1365) || (id <= 1316 && id >= 1304) || (id <= 1254 && id >= 1242)) {
                            section = 7
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1506 && id >= 1495) || (id <= 1449 && id >= 1438) || (id <= 1390 && id >= 1378) || (id <= 1329 && id >= 1317) || (id <= 1267 && id >= 1255)) {
                            section = 8
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1518 && id >= 1507) || (id <= 1461 && id >= 1450) || (id <= 1403 && id >= 1391) || (id <= 1342 && id >= 1330) || (id <= 1280 && id >= 1268)) {
                            section = 9
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1529 && id >= 1519) || (id <= 1472 && id >= 1462) || (id <= 1414 && id >= 1404) || (id <= 1353 && id >= 1343) || (id <= 1292 && id >= 1281)) {
                            section = 10
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1194 && id >= 1186) || (id <= 1148 && id >= 1139) || (id <= 1110 && id >= 1101) || (id <= 1072 && id >= 1063) || (id <= 1021 && id >= 1008)) {
                            section = 11
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1202 && id >= 1195) || (id <= 1157 && id >= 1149) || (id <= 1119 && id >= 1111) || (id <= 1081 && id >= 1073) || (id <= 1034 && id >= 1022)) {
                            section = 12
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1211 && id >= 1203) || (id <= 1166 && id >= 1158)) {
                            section = 13
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1219 && id >= 1212) || (id <= 1175 && id >= 1167) || (id <= 1128 && id >= 1120) || (id <= 1090 && id >= 1082) || (id <= 1047 && id >= 1035)) {
                            section = 14
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1229 && id >= 1220) || (id <= 1185 && id >= 1176) || (id <= 1138 && id >= 1129) || (id <= 1100 && id >= 1091) || (id <= 1062 && id >= 1048)) {
                            section = 15
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 970 && id >= 966) || (id <= 927 && id >= 922) || (id <= 883 && id >= 878) || (id <= 836 && id >= 830) || (id <= 787 && id >= 780) || (id <= 736 && id >= 729) || (id <= 684 && id >= 676)) {
                            section = 16
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 986 && id >= 971) || (id <= 943 && id >= 928) || (id <= 899 && id >= 884) || (id <= 853 && id >= 837) || (id <= 804 && id >= 788) || (id <= 754 && id >= 737) || (id <= 702 && id >= 685)) {
                            section = 17
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 1002 && id >= 987) || (id <= 959 && id >= 944) || (id <= 915 && id >= 900) || (id <= 870 && id >= 854) || (id <= 821 && id >= 805) || (id <= 771 && id >= 755) || (id <= 719 && id >= 700)) {
                            section = 18
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 1007 && id >= 1003) || (id <= 965 && id >= 960) || (id <= 921 && id >= 916) || (id <= 877 && id >= 871) || (id <= 829 && id >= 822) || (id <= 779 && id >= 772) || (id <= 728 && id >= 720)) {
                            section = 19
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 646 && id >= 632) || (id <= 602 && id >= 588) || (id <= 558 && id >= 544) || (id <= 514 && id >= 500) || (id <= 458 && id >= 438) || (id <= 396 && id >= 376) || (id <= 334 && id >= 314) || (id <= 271 && id >= 251) || (id <= 209 && id >= 189) || (id <= 147 && id >= 128) || (id <= 86 && id >= 67)) {
                            section = 20
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 660 && id >= 647) || (id <= 616 && id >= 603) || (id <= 572 && id >= 559) || (id <= 528 && id >= 515) || (id <= 478 && id >= 459) || (id <= 416 && id >= 397) || (id <= 354 && id >= 335) || (id <= 292 && id >= 272) || (id <= 230 && id >= 210) || (id <= 168 && id >= 148) || (id <= 108 && id >= 87)) {
                            section = 21
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 675 && id >= 661) || (id <= 631 && id >= 617) || (id <= 587 && id >= 573) || (id <= 543 && id >= 529) || (id <= 499 && id >= 479) || (id <= 437 && id >= 417) || (id <= 375 && id >= 355) || (id <= 313 && id >= 293) || (id <= 250 && id >= 231) || (id <= 188 && id >= 169) || (id <= 127 && id >= 109)) {
                            section = 22
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if (id <= 66 && id >= 0) {
                            section = 23
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        let item = secion.filter((elm) => elm.section === section);
                        let rows = item[0]?.price.filter((elm) => elm?.row === row2);
                        let price = 0
                        if (rows?.length) {
                            price = rows[0].price
                        }
                        let sold = soldTickets.findIndex((elm) => elm.id == id)
                        coordinates.push({ x, y, active: false, id: coordinates.length, row: row, section: section, price: price, sold: sold >= 0, id: id, parterre: parterre, amphitheater: amphitheater, lodge: lodge })
                    }
                }
            }
            setLoading(false)
            setCoordinatesState(coordinates)
        };
    }, []);

    if (loading) {
        return <div className='loading'>
            <PuffLoader color="#FEE827" />
        </div>
    }
    return (
        <div className='hallWrapper'>
            <div className='hall' >
                <div >
                    <img alt='' src={require('../../assets/ActualPlan.png')} />
                    {coordinatesState?.map((e, i) => {
                        if (e.price && !e.sold)
                            return <button
                                key={i}
                                onMouseOver={() => {
                                    getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                                    setActiveButton(i)
                                }}
                                style={
                                    {
                                        top: e?.y - 4,
                                        left: e?.x - 4,
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
                                onClick={() => addTicket(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)}
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
            </div>
        </div>
    )
}
export default PhotoCoordinatesByColor
