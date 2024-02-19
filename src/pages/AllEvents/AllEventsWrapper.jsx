import { ShowAllButton } from "../../components/Button/ShowAllButton"
import { useTranslation } from "react-i18next";
import { Card } from "./Card";

export const AllEventsWrapper = ({ loading, data, setPage, page, showButton }) => {
    const { t } = useTranslation()
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <div>
        <div className='EventTitle'>
            <h2>{t('AllEvents')}</h2>
        </div>
        <div id='CategoryCardWrapper' className="AllTopEventWrapper">
            {
                data.length > 0 && data.map((elm, i) => {
                    const dateObject = new Date(elm?.date);
                    let day = dateObject.getDate();
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    let month = dateObject.getMonth();
                    let month1 = dateObject.getMonth();
                    let year = dateObject.getFullYear()
                    if (month1 <= 9) {
                        month1 = `0${month1 + 1}`
                    }
                    var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
                    return <Card
                        key={i}
                        day={day}
                        time={elm.time}
                        id={elm.eventId?._id}
                        image={`${process.env.REACT_APP_IMAGE}/${elm.eventId
                            .largeImage}`}
                        year={year}
                        month1={month1}
                        category={elm.eventId.category}
                        location={elm?.location}
                        location_en={elm?.hallId?.location_en}
                        location_ru={elm?.hallId?.location_ru}
                        hall={elm.hallId?.place}
                        hall_en={elm.hallId?.place_en}
                        hall_ru={elm.hallId?.place_ru}
                        months={months[month]}
                        currentDayOfWeek={currentDayOfWeek}
                        data={elm}
                        price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                    />
                    // }
                    // else {
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
                    //     return <Card
                    //         key={i}
                    //         day={day}
                    //         id={elm?.ParonyanEventId}
                    //         year={2024}
                    //         month1={linesArray[0]}
                    //         image={`${elm.ParonyanImg}`}
                    //         months={linesArray[0]}
                    //         currentDayOfWeek={linesArray[1]}
                    //         time={time}
                    //         location={"Երևան"}
                    //         location_en={"Yerevan"}
                    //         location_ru={"Ереван"}
                    //         hall={elm?.ParonyanGroup_name}
                    //         hall_en={'H. Paronyan State Theater'}
                    //         hall_ru={'A.Государственный театр Пароняна'}
                    //         category={
                    //             {
                    //                 name: "Թատրոն",
                    //                 name_en: "Theatre",
                    //                 name_ru: "Театр",
                    //                 _id: "657b00c67a91070546630967"

                    //             }
                    //         }
                    //         data={{
                    //             title: elm.ParonyanName,
                    //             title_ru: elm.ParonyanName,
                    //             title_en: elm.ParonyanName
                    //         }}
                    //     // price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                    //     />
                    // }
                })}
        </div>
        {showButton && <div className="ShowAllButtonWrappr">
            <ShowAllButton loading={loading} onClick={() => setPage(page + 1)} />
        </div>}
    </div>
}