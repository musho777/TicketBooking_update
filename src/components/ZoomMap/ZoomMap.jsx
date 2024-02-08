import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';
import ParonyanPoqr from '../photoMap/ParonyanPoqr';
import { MapInteractionCSS } from 'react-map-interaction';

export const ZoomMap = ({ event, getSinglPage, value, setValue }) => {

    const handleChange = (newValue) => {
        console.log(newValue.scale, '2')
        setValue(newValue);
    };


    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={10}
        >
            {event?.sessions[0]?.hallId._id === '652a6e93cebdd7a4ac8fc020' &&

                <PhotoCoordinatesByColor
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                event?.sessions[0]?.hallId?._id === '653554d8709652928c006a15' &&
                <KarenDemerchyanMec
                    eventId={getSinglPage.events.event?._id} sessionID={getSinglPage.events.event?.sessions[0]._id} soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets} secion={getSinglPage.events.event?.sessions[0]?.price} />
            }
            {
                event?.sessions[0]?.hallId?._id === '6535520e0dc8b78f78b56997' &&
                <AramKhachatryan
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {
                !event?.sessions[0]?.hallId?._id &&
                <ParonyanPoqr
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
        </MapInteractionCSS>
    );
};

