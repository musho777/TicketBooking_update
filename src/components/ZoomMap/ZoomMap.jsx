import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';

export const ZoomMap = ({ scale, event, getSinglPage }) => {

    const [panning, setPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const wrapperRef = useRef(null);
    const [pading, setPading] = useState(0)
    const handleWheelDebounced = debounce(handleWheel, 50);

    const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
            setPanning(true);
            setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
    };



    const handleTouchEnd = () => {
        setPanning(false);
    };

    function handleWheel(e) {
        e.preventDefault();
    }

    useEffect(() => {
        console.log(scale)
        if (scale == 1.2) {
            setPading(120)
        }
        else if (scale > 1.2 && scale <= 1.44) {
            setPading(100 * (scale) * 2)
        }
        else if (scale > 1.7) {
            setPading(100 * (scale) * 3)
        }
        else if (scale < 1.2) {
            setPading(0)
        }
    }, [scale])

    return (
        <div
            className="zoomable-image-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheelDebounced}

            ref={wrapperRef}
            style={{
                transform: `scale(${scale})`,
            }}
        >
            {event?.sessions[0]?.hallId._id === '652a6e93cebdd7a4ac8fc020' &&
                <PhotoCoordinatesByColor
                    pading={pading}
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {event?.sessions[0]?.hallId?._id === '653554d8709652928c006a15' &&
                <KarenDemerchyanMec
                    pading={pading}

                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {event?.sessions[0]?.hallId?._id === '6535520e0dc8b78f78b56997' &&
                <AramKhachatryan
                    pading={pading}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {/* <img
                className="zoomable-image"
                src={require('../../assets/AramKhachatryan.png')}
                style={{ paddingTop: pading, paddingLeft: pading }}
            /> */}
        </div>
    );
};

