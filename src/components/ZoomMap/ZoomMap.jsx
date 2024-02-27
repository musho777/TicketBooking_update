import React, { useEffect, useState } from 'react';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';
import { MapInteractionCSS } from 'react-map-interaction';
import Paronyan from '../photoMap/Paronyan';

export const ZoomMap = ({ event, getSinglPage, value, setValue, isParonyanEvent, paronyanSeans, open }) => {
    const [isInteracting, setIsInteracting] = useState(false);
    const handleChange = (newValue) => {
        setIsInteracting(true)
        setValue(newValue);
        setIsInteracting(true)
    };
    useEffect(() => {
        const interactionTimeout = 250; // Adjust as needed
        let timeoutId;
        if (isInteracting) {
            timeoutId = setTimeout(() => {
                setIsInteracting(false);
            }, interactionTimeout);
        } else {
            clearTimeout(timeoutId);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isInteracting, setValue]);



    const [position, setPosition] = useState({ y: 0, x: 0 })
    const [activeTicket, setActiveTicket] = useState({})
    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={1.5}
            translationBounds={
                value.scale < 0.7 && {
                    yMin: -200 / (0.7 - value.scale),
                    yMax: 1400 / 2
                }}
        >
            {(event?.sessions[0]?.hallId?._id === '65ce79a7603a99ef4d2ba0a1' && !isParonyanEvent) &&

                <PhotoCoordinatesByColor
                    isInteracting={isInteracting}
                    value={value}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                    setPosition={(e) => setPosition({ y: e.y, x: e.x })}
                    activeTicket={activeTicket}
                    position={position}
                    setActiveTicket={(e) => setActiveTicket(e)}
                />
            }
            {
                (event?.sessions[0]?.hallId?._id === '65ce79e5603a99ef4d2ba0a5' && !isParonyanEvent) &&
                <KarenDemerchyanMec
                    value={value}

                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                (event?.sessions[0]?.hallId?._id === "65ce79ca603a99ef4d2ba0a3" && !isParonyanEvent) &&
                <AramKhachatryan
                    value={value}
                    isInteracting={isInteracting}
                    places={getSinglPage.events?.event?.sessions[0].places}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {/* {
                getSinglPage?.events?.event?.ParonyanHall_id == "65ce79e5603a99ef4d2ba0a5" &&
                < ParonyanPoqr
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    Timeline={paronyanSeans}
                    id={getSinglPage?.events?.event?.ParonyanEventId}
                    open={open}
                />
            } */}
            {
                event?.sessions[0]?.hallId?._id == '65ce7a13603a99ef4d2ba0a7' &&
                <Paronyan
                    value={value}
                    isInteracting={isInteracting}
                    eventId={getSinglPage.events.event?._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    Timeline={paronyanSeans}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    id={getSinglPage?.events?.event?.ParonyanEventId}
                    open={open}
                    activeTicket={activeTicket}
                    setActiveTicket={(e) => setActiveTicket(e)}
                    places={getSinglPage.events?.event?.sessions[0].places}
                />
            }
        </MapInteractionCSS>
    );
};

