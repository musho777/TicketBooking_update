import React from 'react';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';
import ParonyanPoqr from '../photoMap/ParonyanPoqr';
import { MapInteractionCSS } from 'react-map-interaction';
import Paronyan from '../photoMap/Paronyan';

export const ZoomMap = ({ event, getSinglPage, value, setValue, isParonyanEvent, paronyanSeans, open }) => {
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    console.log(event?.sessions[0]?.hallId?._id)
    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={10}
        >
            {(event?.sessions[0]?.hallId?._id === '65ce79a7603a99ef4d2ba0a1' && !isParonyanEvent) &&

                <PhotoCoordinatesByColor
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                (event?.sessions[0]?.hallId?._id === '65ce79e5603a99ef4d2ba0a5' && !isParonyanEvent) &&
                <KarenDemerchyanMec
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                (event?.sessions[0]?.hallId?._id === "65ce79ca603a99ef4d2ba0a3" && !isParonyanEvent) &&
                <AramKhachatryan
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
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    Timeline={paronyanSeans}
                    id={getSinglPage?.events?.event?.ParonyanEventId}
                    open={open}
                    places={getSinglPage.events?.event?.sessions[0].places}
                // eventId={getSinglPage.events.event?._id}
                // sessionID={getSinglPage.events.event?.sessions[0]._id}
                // soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                // secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
        </MapInteractionCSS>
    );
};

