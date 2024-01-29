import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import './styles.css';

export const ZoomMap = ({ scale, handleZoomIn, handleZoomOut }) => {
    // const [scale, setScale] = useState(1);

    const [panning, setPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const wrapperRef = useRef(null);
    const [pading, setPading] = useState(0)
    // Debounce the handleWheel function to prevent rapid firing
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
        // const newScale = scale - e.deltaY / 1000;
        // setScale(Math.max(0.2, Math.min(newScale, 5)));
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
            <img
                className="zoomable-image"
                src={require('../../assets/AramKhachatryan.png')}
                style={{ paddingTop: pading, paddingLeft: pading }}
            />
        </div>
    );
};

