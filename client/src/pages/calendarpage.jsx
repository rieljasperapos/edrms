import MonthView from '../components/calendarMonthView';
import { Routes, Route, Outlet } from 'react-router-dom';
import WeekView from '../components/calendarWeekView';
import Navbar from '../components/navbar';
import Contents from '../components/contents';

const Calendar = () => {
    return (
        <>
            <Navbar />
            <Contents>
                <Routes>
                    <Route path='/month' element={<MonthView />}/>
                    <Route path="/" element={<MonthView />} />
                    <Route path="week" element={<WeekView />} />
                </Routes>
                <Outlet />
            </Contents>
        </>
    )
}

export default Calendar;