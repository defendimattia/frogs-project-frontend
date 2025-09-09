import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/frogs" element={<FrogsPage />} />
          <Route path="/frogs/:id" element={<FrogDetailsPage />} />
          <Route path="/habitats" element={<HabitatsPage />} />
          <Route path="/habitats/:id" element={<HabitatDetailsPage />} />
          <Route path="/conservationStatuses" element={<ConservationStatusesPage />} />
          <Route path="/conservationStatuses/:id" element={<ConservationStatusDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
