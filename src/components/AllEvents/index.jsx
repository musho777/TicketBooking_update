import './styles.css'
import { useEffect } from "react"
import { EachTicket } from "../EachTicket"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetParonyanEvents, GetRandomEvents } from "../../services/action/action"
import { ShowAllButton } from '../Button/ShowAllButton'

export const ALLEvents = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getRandomEvents)

    useEffect(() => {
        dispatch(GetRandomEvents(1))
    }, [dispatch])

    console.log(events)
    return (
        <div>
            <div className='EventTitle'>
                <h2>{t('AllEvents')}</h2>
            </div>
            <div className="Allevents">
                {events?.events?.length > 0 && events?.events?.map((elm, i) => {
                    const dateObject = new Date(elm?.sessions[0]?.date)
                    let day = dateObject.getDate()
                    let month = dateObject.getMonth() + 1
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    if (month <= 9) {
                        month = `0${month}`
                    }
                    if (elm?.sessions?.length > 0 && i < 8) {
                        return (
                            <EachTicket
                                key={i}
                                id={elm?._id}
                                onClick={() => window.location = `/Single/${elm?._id}`}
                                location={elm?.sessions[0]?.hallId?.location}
                                location_en={elm?.sessions[0]?.hallId?.location_en}
                                location_ru={elm?.sessions[0]?.hallId?.location_ru}
                                title={elm?.title}
                                title_ru={elm?.title_ru}
                                title_en={elm?.title_en}
                                category_en={elm?.category.name_en}
                                category_ru={elm?.category.name_ru}
                                category={elm?.category.name}
                                time={elm?.sessions[0]?.time}
                                image={`${process.env.REACT_APP_IMAGE}/${elm.image}`}
                                date={`${day}-${month}-${dateObject.getFullYear()}, ${elm.sessions[0]?.time}`}
                                price={`${elm?.sessions[0]?.priceStart} - ${elm?.sessions[0]?.priceEnd} AMD`}
                            />
                        )
                    }
                    else if (elm.isParonyanEvent) {
                        const matchResult = elm.ParonyanTime.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                        const day = matchResult[1];
                        const divContent = matchResult[3];
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(divContent, "text/html");
                        const divElement = doc.body.firstChild;
                        divElement.removeChild(divElement.querySelector('br'));
                        const linesArray = Array.from(divElement.childNodes)
                            .filter(node => node.nodeType === 3)
                            .map(node => node.textContent.trim());
                        const time = matchResult[5];
                        return (
                            <EachTicket
                                key={i}
                                id={elm?._id}
                                onClick={() => window.location = `/Single/${elm?._id}`}
                                location={"Երևան"}
                                location_en={"Yerevan"}
                                location_ru={"Ереван"}
                                title={elm?.ParonyanName}
                                title_ru={elm?.ParonyanName}
                                title_en={elm?.ParonyanName}
                                category={
                                    {
                                        name: "Թատրոն",
                                        name_en: "Theatre",
                                        name_ru: "Театр",
                                        _id: "657b00c67a91070546630967"

                                    }
                                }
                                time={elm?.sessions[0]?.time}
                                image={`${elm.ParonyanImg}`}

                                date={`${day}-${linesArray[0]}-${2024}, ${time}`}
                                price={``}
                            />
                        )
                    }
                })}

            </div>
            <div className="ShowAllButtonWrappr">
                <ShowAllButton onClick={() => window.location = '/allEvents'} />
            </div>
        </div>
    )
}