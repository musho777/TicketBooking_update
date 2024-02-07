import { TopEvents } from "../../components/TopEvents/TopEvents"
import { ShowAllButton } from "../../components/Button/ShowAllButton"
import { useTranslation } from "react-i18next";
import { Card } from "./Card";

export const AllEventsWrapper = ({ loading, data, paronyan, setPage, page, showButton }) => {
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
        <div id='CategoryCardWrapper' className="TopEventWrapper">
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
                        month1 = `0${month1}`
                    }

                    var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
                    return <Card
                        key={i}
                        day={day}
                        time={elm.time}
                        id={elm.eventId._id}
                        image={`${process.env.REACT_APP_IMAGE}/${elm.eventId?.image}`}
                        title={elm.title}
                        year={year}
                        month1={month1}
                        category={elm.eventId?.category}
                        location={elm?.hallId?.location}
                        location_en={elm?.eventId?.hallId?.location_en}
                        location_ru={elm?.eventId?.hallId?.location_ru}
                        hall={elm.hallId.hall}
                        hall_en={elm.hallId.hall_en}
                        hall_ru={elm.hallId.hall_ru}
                        months={months[month]}
                        currentDayOfWeek={currentDayOfWeek}
                        data={elm.eventId}
                        price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                    />
                })}
            {
                // <Card />

                // paronyan?.map((elm, i) => {
                //     const matchResult = elm.time.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                //     const day = matchResult[1];
                //     const divContent = matchResult[3];
                //     const parser = new DOMParser();
                //     const doc = parser.parseFromString(divContent, "text/html");
                //     const divElement = doc.body.firstChild;
                //     divElement.removeChild(divElement.querySelector('br'));
                //     const linesArray = Array.from(divElement.childNodes)
                //         .filter(node => node.nodeType === 3) // Filter out non-text nodes
                //         .map(node => node.textContent.trim());
                //     const time = matchResult[5];
                //     return <TopEvents
                //         key={i}
                //         image={`${elm.img}`}
                //         type={false}
                //         day={day}
                //         title={elm.title}
                //         category={{ _id: '657b00c67a91070546630967', name: 'Թատրոն', name_en: 'Theatre', name_ru: 'Театр' }}
                //         hall={elm?.group_name}
                //         hall_en={'H. Paronyan State Theater'}
                //         hall_ru={'A.Государственный театр Пароняна'}
                //         months={linesArray[0]}
                //         currentDayOfWeek={linesArray[1]}
                //         time={time}
                //         time2={elm.time}
                //         id={elm.id}
                //         data={{
                //             title: elm.name,
                //             title_ru: elm.name,
                //             title_en: elm.name
                //         }}
                //         price={''}
                //     />
                // })
            }
        </div>
        {!showButton && (data.length > 0 || paronyan?.length > 0) && <div className="ShowAllButtonWrappr">
            <ShowAllButton loading={loading} onClick={() => setPage(page + 1)} />
        </div>}
    </div>
}