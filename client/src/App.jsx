import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';
import Calendar from './pages/calendarpage';
import Visit from './pages/Visit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/calendar/*' element={<Calendar />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/visit" element={<Visit />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
