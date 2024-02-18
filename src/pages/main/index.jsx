import './style.css'
import { useEffect } from 'react'
import { PuffLoader } from 'react-spinners'
import { Carusel } from '../../components/Slider'
import { ALLEvents } from '../../components/AllEvents'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAds, GetGenerealEvents, WeekEvetntApi } from '../../services/action/action'
import { ExpectedEvents } from '../../components/ExpectedEvents'
import { WeekEvents } from '../../components/WeekEvents'
import { TopEventsComponent } from '../../components/TopEvents'


export const Main = () => {

    const dispatch = useDispatch()
    const general = useSelector((st) => st.general)
    const { getWeekEvent } = useSelector((st) => st)

    // const BuyTickets = () => {

    //     const keys = "hYDepOnSarMi";
    //     const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    //     const requestType = "buyTickets";

    //     const params = {
    //         group_id: "12",
    //         timeline_id: "6750",
    //         event_id: "92",
    //     };

    //     const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    //         acc[key] = params[key];
    //         return acc;
    //     }, {});

    //     sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();


    //     sortedParams.data = JSON.stringify({
    //         data: [
    //             {
    //                 LevelId: "2",
    //                 Places: [
    //                     {
    //                         Row: "2",
    //                         Seat: '2'
    //                     },
    //                     {
    //                         Row: "2",
    //                         Seat: '1'
    //                     }
    //                 ]
    //             }
    //         ]
    //     });

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(sortedParams)
    //     };

    //     fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
    //         .then(response => response.json())
    //         .then(data => {
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // };


    // const returnTickets = () => {

    //     const keys = "hYDepOnSarMi";
    //     const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    //     const requestType = "backTickets";

    //     const params = {
    //         group_id: "12",
    //         timeline_id: "6750",
    //         event_id: "92",
    //         order_id: "346"
    //     };

    //     const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    //         acc[key] = params[key];
    //         return acc;
    //     }, {});

    //     sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();


    //     sortedParams.data = JSON.stringify({
    //         data: [
    //             {
    //                 LevelId: "2",
    //                 Places: [
    //                     {
    //                         Row: "2",
    //                         Seat: '2'
    //                     },
    //                     {
    //                         Row: "2",
    //                         Seat: '1'
    //                     }
    //                 ]
    //             }
    //         ]
    //     });


    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(sortedParams)
    //     };

    //     fetch(`https://api.haytoms.am/sync/${secretKey}/${requestType}`, options)
    //         .then(response => response.json())
    //         .then(data => {
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }







    useEffect(() => {
        localStorage.setItem('orderId', '')
        dispatch(GetGenerealEvents())
        dispatch(GetAllAds())
        dispatch(WeekEvetntApi())
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
                {general?.events?.length > 0 &&
                    <Carusel />
                }
                <TopEventsComponent />
            </div>
            {
                getWeekEvent.events.length > 0 &&
                <WeekEvents />
            }
            <div className='container'>
                <ALLEvents />
                <ExpectedEvents />
            </div>
        </div>
    )
}