import { TopEvents } from "../../components/TopEvents/TopEvents"
import { ShowAllButton } from "../../components/Button/ShowAllButton"

export const CategoryCardWrapper = ({ data }) => {
    return <div>
        <div className='EventTitle'>
        </div>
        <div className="TopEventWrapper">
            {
                data.events.sessions?.length > 0 && data?.events?.sessions?.map((elm, i) => {
                    const dateObject = new Date(elm?.date);
                    let day = dateObject.getDate();
                    let month = dateObject.getMonth() + 1;
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    if (month <= 9) {
                        month = `0${month}`
                    }

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
                        data={elm}
                        price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                    />
                })}
        </div>
        <div className="ShowAllButtonWrappr">
            <ShowAllButton />
        </div>
    </div>
}