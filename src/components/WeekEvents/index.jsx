import { useTranslation } from "react-i18next"
import { WeekCard } from "./card"
import { ShowAllButton } from "../Button/ShowAllButton"
import { LeftSvg, RightSvg } from "../svg"

export const WeekEvents = () => {
    const { t } = useTranslation()
    return <div className="WeekEvents">
        <div className="container">
            <div className='WeekEventTitle'>
                <h2>{t('TopEvents')}</h2>
                <div className="WeekArrow">
                    <RightSvg />
                    <LeftSvg />
                </div>
            </div>
            <div className="WeekCardWrapper">
                <WeekCard />
                <WeekCard />
                <WeekCard />
                <WeekCard />
                <WeekCard />
                <WeekCard />
                <WeekCard />
            </div>
            <div className="ShowAllButtonWrappr">
                <ShowAllButton />
            </div>
        </div>
    </div>
}