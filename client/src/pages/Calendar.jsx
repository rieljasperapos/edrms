import MonthView from "../components/CalendarMonthView.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import WeekView from "../components/CalendarWeekview.jsx";
import Navbar from "../components/Navbar.jsx";
import Contents from "../components/Contents.jsx";
import useAuth from "../hooks/useAuth.js";

const Calendar = () => {
  const { authenticated } = useAuth();
  return (
    <>
      <Navbar />
      <Contents>
        <Routes>
          <Route path="month" element={<MonthView />} />
          <Route path="/" element={<MonthView />} />
          <Route path="week" element={<WeekView />} />
        </Routes>
        <Outlet />
      </Contents>
    </>
  );
};

export default Calendar;
