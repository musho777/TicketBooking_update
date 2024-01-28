import './styles.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// import Carousel from 'react-elastic-carousel'
import { EachTopEvent } from '../EachTopEvent'
import 'react-alice-carousel/lib/alice-carousel.css'
import { GetTopEvents } from '../../services/action/action'
// import Slider from 'infinite-react-carousel';
import Carousel from 'react-grid-carousel'
export const CardSlider = ({ data }) => {
    const dispatch = useDispatch()
    const [count, setCount] = useState(3)
    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {
        dispatch(GetTopEvents())
        function handleWindowResize() {
            setWindowSize(getWindowSize())
        }
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    useEffect(() => {
        if (windowSize.innerWidth <= 632) {
            setCount(1)
        } if (windowSize.innerWidth >= 633 && windowSize.innerWidth <= 1200) {
            setCount(2)
        } else if (windowSize.innerWidth > 1200) {
            setCount(4)
        }
    }, [windowSize])

    function getWindowSize() {
        const { innerWidth, innerHeight } = window
        return { innerWidth, innerHeight }
    }



    return <Carousel
        rows={1}
        cols={count}
        scrollSnap={true}
        loop={true}
        autoplay={3500}
    >

        {data?.length > 0 && data?.map((elm, i) => {
            const dateObject = new Date(elm.sessions[0]?.date);
            let day = dateObject.getDate();
            let month = dateObject.getMonth() + 1;
            if (day <= 9) {
                day = `0${day}`
            }
            if (month <= 9) {
                month = `0${month}`
            }
            if (elm?.sessions.length) {
                return <Carousel.Item >
                    <EachTopEvent
                        id={elm?._id}
                        key={i}
                        image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                        title={elm.title}
                        location={elm?.sessions[0]?.hallId?.location}
                        location_en={elm?.sessions[0]?.hallId?.location_en}
                        location_ru={elm?.sessions[0]?.hallId?.location_ru}
                        date={`${day}-${month}-${dateObject.getFullYear()}, ${elm.sessions[0]?.time}`}
                        data={elm}
                        price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
                    />
                </Carousel.Item>
            }
        })}
    </Carousel>
}