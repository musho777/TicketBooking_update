import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';
import ParonyanPoqr from '../photoMap/ParonyanPoqr';

export const ZoomMap = ({ setScale, scale, event, getSinglPage }) => {

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

    useEffect(() => {
        // Set the scroll position of the div to center when the component mounts
        if (wrapperRef.current) {
            console.log('11')
            const containerHeight = wrapperRef.current.clientHeight;
            const divHeight = 3000;
            const scrollTop = (divHeight - containerHeight) / 2;
            wrapperRef.current.scrollTop = scrollTop;
        }
    }, []);


    const handleTouchEnd = () => {
        setPanning(false);
    };

    function handleWheel(e) {
        if (e.metaKey || e.ctrlKey) { // Check if the user is holding down a modifier key (e.g., Ctrl or Command)
            e.preventDefault();
            const deltaY = e.deltaY;
            const factor = deltaY > 0 ? 0.9 : 1.1; // Adjust the scale factor as needed
            setScale(prevScale => prevScale * factor);
        }
    }

    useEffect(() => {
        // if (scale > 0.47 && scale < 0.99) {
        //     setPading(100 * (scale) * 5)
        // }
        // else if (scale > 0.99 && scale <= 1.44) {
        //     setPading(100 * (scale) * 5)
        // }
        // else if (scale > 1.7) {
        //     setPading(100 * (scale) * 5)
        // }
        // if (scale < 1.2) {
        //     setPading(0)
        // }
        if (scale > 0.47) {
            setPading(100 * (scale) * 5)
        }
    }, [scale])
    console.log(pading)

    return (
        <div
            className="zoomable-image-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}

            // ref={wrapperRef}
            style={{
                // transform: `scale(${scale})`,
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                height: '100%',
                boxSizing: 'border-box',
                padding: pading
            }}
        >

            <div
                ref={wrapperRef}
                style={{
                    transform: `scale(${scale})`,
                    transition: "500ms"
                }}>
                {event?.sessions[0]?.hallId._id === '652a6e93cebdd7a4ac8fc020' &&

                    <PhotoCoordinatesByColor
                        // pading={pading}
                        scale={scale}

                        eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
                }
            </div>

            {
                event?.sessions[0]?.hallId?._id === '653554d8709652928c006a15' &&
                <KarenDemerchyanMec
                    // pading={pading}

                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                event?.sessions[0]?.hallId?._id === '6535520e0dc8b78f78b56997' &&
                <AramKhachatryan
                    // pading={pading}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {
                !event?.sessions[0]?.hallId?._id &&
                <ParonyanPoqr
                    pading={pading}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
        </div >
    );
};

