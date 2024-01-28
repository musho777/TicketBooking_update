import './style.css'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next'
import { Carusel } from '../../components/Slider'
import { ALLEvents } from '../../components/AllEvents'
import { useDispatch, useSelector } from 'react-redux'
import { CardSlider } from '../../components/CardSlider'
import { SearchEvent } from '../../components/SearchEvent'
import { BuyTicketFromParonyan, GetAllAds, GetGenerealEvents, GetParoninaSinglHallSeats, GetParonyanEvents } from '../../services/action/action'
import { HP85 } from '../../components/Halls/HP85'
import { CartPopup } from '../../components/popup/cart'
import { MD5 } from 'crypto-js'
import { ExpectedEvents } from '../../components/ExpectedEvents'
import { WeekEvents } from '../../components/WeekEvents'
import { TopEventsComponent } from '../../components/TopEvents'


export const Main = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const topEvents = useSelector((st) => st.topEvents)
    const general = useSelector((st) => st.general)
    const { getAds } = useSelector((st) => st)

    const BuyTickets = () => {

        const keys = "hYDepOnSarMi";
        const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
        const requestType = "buyTickets";

        const params = {
            group_id: "12",
            timeline_id: "6750",
            event_id: "92",
        };

        const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

        sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();


        sortedParams.data = JSON.stringify({
            data: [
                {
                    LevelId: "2",
                    Places: [
                        {
                            Row: "2",
                            Seat: '2'
                        },
                        {
                            Row: "2",
                            Seat: '1'
                        }
                    ]
                }
            ]
        });

        console.log((sortedParams))

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(sortedParams)
        };

        fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    const returnTickets = () => {

        const keys = "hYDepOnSarMi";
        const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
        const requestType = "backTickets";

        const params = {
            group_id: "12",
            timeline_id: "6750",
            event_id: "92",
            order_id: "346"
        };

        const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

        sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();


        sortedParams.data = JSON.stringify({
            data: [
                {
                    LevelId: "2",
                    Places: [
                        {
                            Row: "2",
                            Seat: '2'
                        },
                        {
                            Row: "2",
                            Seat: '1'
                        }
                    ]
                }
            ]
        });

        console.log((sortedParams))

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(sortedParams)
        };

        fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }








    useEffect(() => {
        dispatch(GetGenerealEvents())
        dispatch(GetAllAds())
        dispatch(GetParonyanEvents())
        dispatch(GetParoninaSinglHallSeats())
        // dispatch(BuyTickets())
    }, [])
        ;

    if (general?.loading) {
        return (
            <div className='loading'>
                <PuffLoader color="#FEE827" />
            </div>
        )
    }
    return (

        <div className='mainPage'>
            <div className='container'>
                <Carusel />
                <TopEventsComponent />
            </div>
            <WeekEvents />
            <div className='container'>
                <ALLEvents />
                {/* <ExpectedEvents /> */}
            </div>
        </div>
    )
}