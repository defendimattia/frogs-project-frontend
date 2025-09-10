import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import FrogsPage from "./pages/FrogsPage"
import FrogDetailsPage from "./pages/FrogDetailsPage"
import HabitatsPage from "./pages/HabitatsPage"
import HabitatDetailsPage from "./pages/HabitatDetailsPage"
import ConservationStatusesPage from "./pages/ConservationStatusesPage"
import ConservationStatusDetailsPage from "./pages/ConservationStatusDetailsPage"
import AboutUs from "./pages/AboutUs"
import NotFound from "./pages/NotFound"
import DefaultLayout from "./layouts/DefaultLayout"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/frogs" element={<FrogsPage />} />
            <Route path="/frogs/:id" element={<FrogDetailsPage />} />
            <Route path="/habitats" element={<HabitatsPage />} />
            <Route path="/habitats/:id" element={<HabitatDetailsPage />} />
            <Route path="/conservationStatuses" element={<ConservationStatusesPage />} />
            <Route path="/conservationStatuses/:id" element={<ConservationStatusDetailsPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
