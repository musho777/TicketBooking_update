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

    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={10}
        >
            {(event?.sessions[0]?.hallId?._id === '652a6e93cebdd7a4ac8fc020' && !isParonyanEvent) &&

                <PhotoCoordinatesByColor
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                (event?.sessions[0]?.hallId?._id === '653554d8709652928c006a15' && !isParonyanEvent) &&
                <KarenDemerchyanMec
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                (event?.sessions[0]?.hallId?._id === '6535520e0dc8b78f78b56997' && !isParonyanEvent) &&
                <AramKhachatryan
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {
                getSinglPage?.events?.event?.ParonyanHall_id == '85' &&
                <ParonyanPoqr
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    Timeline={paronyanSeans}
                    id={getSinglPage?.events?.event?.ParonyanEventId}
                    open={open}
                />
            }
            {
                event?.sessions[0]?.hallId?._id == '65cd06eae8679feb09775695' &&
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

