import { TopEvents } from "../../components/TopEvents/TopEvents"
import { ShowAllButton } from "../../components/Button/ShowAllButton"

export const CategoryCardWrapper = ({ loading, data, paronyan, setPage, page, showButton }) => {
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    console.log(data)
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <div>
        <div className='EventTitle' />
        <div id='CategoryCardWrapper' className="TopEventWrapper">
            {
                data.length > 0 && data.map((elm, i) => {
                    const dateObject = new Date(elm?.date);
                    let day = dateObject.getDate();
                    let month = dateObject.getMonth();
                    var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
                    if (elm?.eventId) {
                        console.log(elm.eventId.category)
                        return <TopEvents
                            key={i}
                            day={day}
                            id={elm.eventId._id}
                            image={`${process.env.REACT_APP_IMAGE}/${elm.eventId?.image}`}
                            title={elm.title}
                            category={elm.eventId?.category}
                            location={elm?.hallId?.location}
                            location_en={elm?.eventId?.hallId?.location_en}
                            location_ru={elm?.eventId?.hallId?.location_ru}
                            hall={elm.hallId.hall}
                            time={elm.time}
                            hall_en={elm.hallId.hall_en}
                            hall_ru={elm.hallId.hall_ru}
                            months={months[month]}
                            currentDayOfWeek={currentDayOfWeek}
                            data={elm.eventId}
                            price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                        />
                    }
                    else {

                        const matchResult = elm?.ParonyanTime?.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                        const day = matchResult[1];
                        const divContent = matchResult[3];
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(divContent, "text/html");
                        const divElement = doc.body.firstChild;
                        divElement.removeChild(divElement.querySelector('br'));
                        const linesArray = Array.from(divElement.childNodes)
                            .filter(node => node.nodeType === 3) // Filter out non-text nodes
                            .map(node => node.textContent.trim());
                        const time = matchResult[5];
                        return <TopEvents
                            key={i}
                            id={elm._id}
                            image={elm.ParonyanImg}
                            category={
                                {
                                    name: "Թատրոն",
                                    name_en: "Theatre",
                                    name_ru: "Театр",
                                    _id: "657b00c67a91070546630967"

                                }
                            }
                            location={"Երևան"}
                            location_en={"Yerevan"}
                            location_ru={"Ереван"}
                            hall={elm?.ParonyanGroup_name}
                            hall_en={'H. Paronyan State Theater'}
                            hall_ru={'A.Государственный театр Пароняна'}
                            months={linesArray[0]}
                            currentDayOfWeek={linesArray[1]}
                            time={time}
                            time2={elm.time}
                            day={day}
                            data={{
                                title: elm.ParonyanName,
                                title_ru: elm.ParonyanName,
                                title_en: elm.ParonyanName
                            }}
                        />
                    }
                })}
        </div>
        {!showButton && (data.length > 0 || paronyan?.length > 0) && <div className="ShowAllButtonWrappr">
            <ShowAllButton loading={loading} onClick={() => setPage(page + 1)} />
        </div>}
    </div>
}


//     />
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
// })