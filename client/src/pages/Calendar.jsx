import MonthView from "../components/calendarMonthView";
import { Routes, Route, Outlet } from "react-router-dom";
import WeekView from "../components/calendarWeekView";
import Navbar from "../components/navbar.jsx";
import Contents from "../components/contents.jsx";
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
