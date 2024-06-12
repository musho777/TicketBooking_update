import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'
import { color } from '@mui/system'

const RestauranHall = ({ eventId, soldTickets, sessionID, pading, value, places, isInteracting, price }) => {
  const dispatch = useDispatch()
  const [coordinatesState, setCoordinatesState] = useState([])
  const [activeTicket, setActiveTicket] = useState({})
  const [position, setPosition] = useState({ x: '', y: '' })
  const [showModal, setShowModal] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const { tickets } = useSelector((st) => st.tiketsForBuy)
  const [click, setClick] = useState(isInteracting)
  const color = ['#18ff00', '#ee9dd6', "#79caff", "#ff8d24", "#dee362", "red", '#f43b45', "#5c99d4", "#930b92", "#63c164", "#445485",]


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
  ])

  useEffect(() => {
    if (places.length > 0) {
      setSeansArr(JSON.parse(places[0]))
    }
  }, [places])

  const [data, setData] = useState('')

  const getPrice = (y, i, x) => {
    let temp = [...data]
    // if (temp.findIndex((el) => el.id == i) == -1) {
    //   // temp.push({ "id": i, "price": "", "row": 4, "seat": temp.length + 1, parterre: false, amphitheater: true, lodge: false, stage: false },)
    // }





    setData(temp)
    setPosition({ x, y })
    let item = seansArr.find((elm) => elm.id === i)
    console.log(item)
    setActiveTicket({
      row: item?.row,
      price: item?.price,
      seat: item?.seat_count,
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
    image.src = require('../../assets/resturanHall.png')

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
        alt='' src={require('../../assets/resturanHall.png')} />
      {coordinatesState.map((e, i) => {
        // console.log(e)
        let top = -15
        let left = 10
        let width = 20
        let height = 20
        let borderRad = 0
        let roted = 0
        if (e.x == 511 && e.y >= 233) {
          top = -50
          left = -68
          width = 110
          height = 110
          borderRad = '50%'
        }
        if (e.x == 231 && e.y == 121) {
          top = -50
          left = -70
          width = 115
          height = 115
          borderRad = '50%'
        }
        if (e.x == 231 && e.y == 345) {
          top = -45
          left = -68
          width = 110
          height = 110
          borderRad = '50%'
        }
        if (e.x == 231 && e.y == 565) {
          top = -40
          left = -68
          width = 110
          height = 110
          borderRad = '50%'
        }
        if (e.x == 144 && e.y == 1810) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 516 && e.y == 1810) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 144 && e.y == 2134) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 516 && e.y == 2134) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 306 && e.y == 1840) {
          top = -48
          left = -14
          width = 80
          height = 80
          borderRad = '50%'
        }
        if (e.x == 306 && e.y == 2164) {
          top = -48
          left = -14
          width = 80
          height = 80
          borderRad = '50%'
        }
        if (e.x == 139 && e.y == 2601) {
          top = -48
          left = -14
          width = 80
          height = 80
          borderRad = '50%'
        }
        if (e.x == 309 && e.y == 2858) {
          top = -50
          left = -16
          width = 80
          height = 80
          borderRad = '50%'
        }
        if (e.x == 309 && e.y == 3182) {
          top = -50
          left = -16
          width = 80
          height = 80
          borderRad = '50%'
        }
        if (e.x == 1743 && e.y == 3227) {
          top = -30
          left = -35
          width = 95
          height = 95
          borderRad = '50%'
        }
        if (e.x == 1747 && e.y == 3005) {
          top = -32
          left = -38
          width = 95
          height = 95
          borderRad = '50%'
        }
        if (e.x == 1747 && e.y == 2781) {
          top = -32
          left = -38
          width = 95
          height = 95
          borderRad = '50%'
        }
        if (e.x == 1747 && e.y == 2557) {
          top = -32
          left = -38
          width = 95
          height = 95
          borderRad = '50%'
        }
        if (e.x == 1747 && e.y == 2333) {
          top = -32
          left = -38
          width = 95
          height = 95
          borderRad = '50%'
        }
        if (e.x == 1747 && e.y == 2109) {
          top = -32
          left = -38
          width = 95
          height = 95
          borderRad = '50%'
        }
        if (e.x == 1026 && e.y == 1493) {
          top = -35
          left = -55
          width = 105
          height = 105
          borderRad = '50%'
        }
        if (e.x == 1206 && e.y == 1493) {
          top = -35
          left = -55
          width = 105
          height = 105
          borderRad = '50%'
        }
        if (e.x == 1382 && e.y == 1493) {
          top = -35
          left = -55
          width = 105
          height = 105
          borderRad = '50%'
        }
        if (e.x == 2932 && e.y == 2911) {
          top = -73
          left = -92
          width = 180
          height = 180
          borderRad = '50%'
        }
        if (e.x == 2676 && e.y == 2699) {
          top = -73
          left = -92
          width = 180
          height = 180
          borderRad = '50%'
        }
        if (e.x == 2932 && e.y == 2487) {
          top = -73
          left = -92
          width = 180
          height = 180
          borderRad = '50%'
        }
        if (e.x == 2489 && e.y == 1324) {
          top = -92
          left = -130
          width = 230
          height = 230
          borderRad = '50%'
        }
        if (e.x == 2861 && e.y == 1324) {
          top = -92
          left = -130
          width = 230
          height = 230
          borderRad = '50%'
        }
        if (e.x == 516 && e.y == 2828) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 144 && e.y == 2828) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 144 && e.y == 3152) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 516 && e.y == 3151) {
          top = -45
          left = 62
          width = 200
          height = 65
          borderRad = 30
          roted = 135
        }
        if (e.x == 875 && e.y == 1865) {
          top = -65
          left = 95
          width = 220
          height = 80
          roted = 135
        }
        if (e.x == 875 && e.y == 2153) {
          top = -65
          left = 95
          width = 220
          height = 80
          roted = 135
        }
        if (e.x == 875 && e.y == 2745) {
          top = -65
          left = 95
          width = 220
          height = 80
          roted = 135
        }
        if (e.x == 875 && e.y == 3029) {
          top = -65
          left = 95
          width = 220
          height = 80
          roted = 135
        }
        if (e.x == 1502 && e.y == 1839) {
          top = -80
          left = -67
          width = 230
          height = 80
          roted = 45
        }
        if (e.x == 1502 && e.y == 2127) {
          top = -80
          left = -67
          width = 230
          height = 80
          roted = 45
        }
        if (e.x == 1502 && e.y == 2415) {
          top = -80
          left = -67
          width = 230
          height = 80
          roted = 45
        }
        if (e.x == 1502 && e.y == 2699) {
          top = -80
          left = -67
          width = 230
          height = 80
          roted = 45
        }
        if (e.x == 1502 && e.y == 3003) {
          top = -80
          left = -67
          width = 230
          height = 80
          roted = 45
        }
        if (e.x == 2392 && e.y == 2578) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2080 && e.y == 2266) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2389 && e.y == 2243) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2553 && e.y == 2079) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2077 && e.y == 1931) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2242 && e.y == 1767) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2884 && e.y == 2082) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2572 && e.y == 1770) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2896 && e.y == 1762) {
          top = -145
          left = -108
          width = 330
          height = 115
          roted = 45
        }
        if (e.x == 2073 && e.y == 2688) {
          top = -80
          left = -180
          width = 330
          height = 215
        }
        if (e.x == 2073 && e.y == 3132) {
          top = -80
          left = -180
          width = 330
          height = 215
        }
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
              {/* <div style={{ background: 'red', width: width, height: height, borderRadius: borderRad }} /> */}

              {
                !tickets.find((elm) => elm.seatId == e.id) &&
                price.map((el, ind) => {
                  if (el.price == seansArr.find((e) => e.id == i)?.price && el.active == 1) {
                    return <div style={{ background: color[ind], width: width, height: height, borderRadius: borderRad }} />
                  }
                })
              }
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
          <p className='Teatertext'>սեղան N {activeTicket.seatId}</p>
          <p className='Teatertext'>{activeTicket.seat} անձ</p>
          <p className='Teatertext'>{activeTicket.price} դրամ</p>
        </div>
      }
    </div>
  )
}
export default RestauranHall
