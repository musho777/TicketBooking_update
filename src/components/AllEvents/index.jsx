import './styles.css'
import { useEffect } from "react"
import { EachTicket } from "../EachTicket"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetAllEvents2, GetRandomEvents } from "../../services/action/action"
import { ShowAllButton } from '../Button/ShowAllButton'

export const ALLEvents = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getAllEventes)
    function truncateText(text) {
        if (text?.length > 15) {
            return text.substring(0, 14) + '...';
        }
        else {
            return text;
        }
    }

    useEffect(() => {
        dispatch(GetAllEvents2(1))
    }, [])

    return (
        <div>
            <div className='EventTitle'>
                <h2>{t('AllEvents')}</h2>
            </div>
            <div className="Allevents">
                {events.events?.events?.length > 0 && events.events?.events?.map((elm, i) => {
                    const dateObject = new Date(elm?.date)
                    let day = dateObject.getDate()
                    let month = dateObject.getMonth() + 1
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    if (month <= 9) {
                        month = `0${month}`
                    }
                    if (i < 9) {
                        return (
                            <EachTicket
                                key={i}
                                id={elm.eventId._id}
                                onClick={() => window.location = `/Single/${elm.eventId._id}`}
                                location={elm?.hallId?.location}
                                location_en={elm?.hallId?.location_en}
                                location_ru={elm?.hallId?.location_ru}
                                title={truncateText(elm.eventId?.title)}
                                title_ru={truncateText(elm.eventId?.title_ru)}
                                title_en={truncateText(elm.eventId?.title_en)}
                                category_en={elm?.eventId?.category?.name_en}
                                category_ru={elm?.eventId?.category?.name_ru}
                                category={elm?.eventId?.category?.name}
                                // time={elm?.sessions[0]?.time}
                                image={`${process.env.REACT_APP_IMAGE}/${elm.eventId?.largeImage}`}
                                date={`${day}-${month}-${dateObject.getFullYear()}, ${elm?.time}`}
                                price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                            />
                        )
                    }
                    // else if (elm.isParonyanEvent) {
                    //     const matchResult = elm.ParonyanTime.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                    //     const day = matchResult[1];
                    //     const divContent = matchResult[3];
                    //     const parser = new DOMParser();
                    //     const doc = parser.parseFromString(divContent, "text/html");
                    //     const divElement = doc.body.firstChild;
                    //     divElement.removeChild(divElement.querySelector('br'));
                    //     const linesArray = Array.from(divElement.childNodes)
                    //         .filter(node => node.nodeType === 3)
                    //         .map(node => node.textContent.trim());
                    //     const time = matchResult[5];
                    //     return (
                    //         <EachTicket
                    //             key={i}
                    //             id={elm?._id}
                    //             onClick={() => window.location = `/Single/${elm?._id}`}
                    //             location={"Երևան"}
                    //             location_en={"Yerevan"}
                    //             location_ru={"Ереван"}
                    //             title={elm?.ParonyanName}
                    //             title_ru={elm?.ParonyanName}
                    //             title_en={elm?.ParonyanName}
                    //             category={
                    //                 {
                    //                     name: "Թատրոն",
                    //                     name_en: "Theatre",
                    //                     name_ru: "Театр",
                    //                     _id: "657b00c67a91070546630967"

                    //                 }
                    //             }
                    //             // time={elm?.sessions[0]?.time}
                    //             image={`${elm.ParonyanImg}`}

                    //             date={`${day}-${linesArray[0]}-${2024}, ${time}`}
                    //             price={``}
                    //         />
                    //     )
                    // }
                })}

            </div>
            <div className="ShowAllButtonWrappr">
                <ShowAllButton onClick={() => window.location = '/allEvents'} />
            </div>
        </div>
    )
}