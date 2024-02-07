import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "../components/Layout"
import { Main } from '../pages/main/index.jsx'
import { Category } from "../pages/category"
import { Single } from "../pages/Single"
import { Page404 } from "../pages/404"
import { PrivatePolice } from "../components/privatePolice"
import { StatusPage } from "../pages/StatusPage/index.jsx"
import { StatusPageReject } from "../pages/StatusPage/reject.jsx"
import { StatusACBA } from '../pages/StatusPage/telcellData.jsx'
import { BuyTickets } from "../pages/BuyTickets/index.jsx"
import { AllEventss } from '../pages/AllEvents/index.jsx'
import { AllWeekEvents } from "../components/AllWeekEvents/index.jsx"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/Category/:id/:id" element={<Category />} />
                    <Route path="/Single/:id" element={<Single />} />
                    <Route path="/PrivacyPolicy" element={<PrivatePolice />} />
                    <Route path="/StatusPage " element={<StatusPage />} />
                    <Route path="/Reject" element={<StatusPageReject />} />
                    <Route path="/StatusACBA" element={<StatusACBA />} />
                    <Route path="/BuyTickets/:id" element={<BuyTickets />} />
                    <Route path="/allEvents" element={<AllEventss />} />
                    <Route path="/allWeekEvents" element={<AllWeekEvents />} />

                    <Route path='*' element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
// StatusPage