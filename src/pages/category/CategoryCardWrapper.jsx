import { TopEvents } from "../../components/TopEvents/TopEvents"
import { ShowAllButton } from "../../components/Button/ShowAllButton"

export const CategoryCardWrapper = ({ data, paronyan }) => {
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <div>
        <div className='EventTitle' />
        <div className="TopEventWrapper">
            {
                data.events.sessions?.length > 0 && data?.events?.sessions?.map((elm, i) => {
                    const dateObject = new Date(elm?.date);
                    let day = dateObject.getDate();
                    console.log(elm)
                    let month = dateObject.getMonth();
                    var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
                    return <TopEvents
                        key={i}
                        id={elm.eventId._id}
                        image={`${process.env.REACT_APP_IMAGE}/${elm.eventId?.image}`}
                        title={elm.title}
                        category={elm.eventId?.category}
                        location={elm?.hallId?.location}
                        location_en={elm?.eventId?.hallId?.location_en}
                        location_ru={elm?.eventId?.hallId?.location_ru}
                        hall={elm.hallId.hall}
                        hall_en={elm.hallId.hall_en}
                        hall_ru={elm.hallId.hall_ru}
                        months={months[month]}
                        currentDayOfWeek={currentDayOfWeek}
                        day={day}
                        time={elm?.time}
                        months={months[month]}
                        data={elm.eventId}
                        price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                    />
                })}
            {

                paronyan?.map((elm, i) => {
                    return <TopEvents
                        key={i}
                        image={`${elm.img}`}
                        title={elm.title}
                        category={{ _id: '657b00c67a91070546630967', name: 'Թատրոն', name_en: 'Theatre', name_ru: 'Театр' }}
                        hall={elm?.group_name}
                        hall_en={'H. Paronyan State Theater'}
                        hall_ru={'A.Государственный театр Пароняна'}
                        data={{
                            title: elm.name,
                            title_ru: elm.name,
                            title_en: elm.name
                        }}
                        price={''}
                    />
                })
            }
        </div>
        <div className="ShowAllButtonWrappr">
            <ShowAllButton />
        </div>
    </div>
}