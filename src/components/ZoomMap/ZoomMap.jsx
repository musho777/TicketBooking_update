import React, { useState } from 'react';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';
import { MapInteractionCSS } from 'react-map-interaction';
import Paronyan from '../photoMap/Paronyan';

export const ZoomMap = ({ event, getSinglPage, value, setValue, isParonyanEvent, paronyanSeans, open }) => {
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const [position, setPosition] = useState({ y: 0, x: 0 })
    const [activeTicket, setActiveTicket] = useState({})
    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={1.5}
        >
            {/* <div
                style={{ top: position.y - 150, left: position.x - 130, position: 'absolute' }} className='parter'>
                <p className='Teatertext'>շարք {activeTicket.row}</p>
                <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                <p className='Teatertext'>{activeTicket.price} դրամ</p>
            </div> */}
            {(event?.sessions[0]?.hallId?._id === '65ce79a7603a99ef4d2ba0a1' && !isParonyanEvent) &&

                <PhotoCoordinatesByColor
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
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    Timeline={paronyanSeans}
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

