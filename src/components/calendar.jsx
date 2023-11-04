import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../utils/calendar";
import dayjs from "dayjs";
import cn from "../utils/cn";
import { useState } from "react";

const Calendar = () => {
    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    console.log(currentDate);
    console.log(today);
    console.log(selectDate);
    
    return (
        <>
            <div className="flex justify-between items-center p-6 border-b">
                <h1 className="text-black font-bold text-3xl uppercase">Calendar</h1>
                <button className="bg-primary-green text-white font-medium rounded-lg p-4">Add appointment</button>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-center bg-custom-gray border p-6">
                    <div>
                        <h1 className="font-medium text-xl">{months[today.month()]} {today.year()}</h1>
                    </div>
                    <div className="flex items-center place-content-center gap-5 border w-44 p-2">
                        <GrFormPrevious 
                            className="h-5"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1>{months[today.month()]}</h1>
                        <GrFormNext 
                            className="h-5"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-7">
                        {days.map((day, idx) => {
                            return (
                                <div>
                                    <h1 key={idx} className="text-sm grid place-content-center border p-2">{day}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-7">
                    {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, indx) => {
                        return (
                            <div key={indx} className="flex flex-col border pr-8 pb-20 pl-4">
                                <h1 className={cn(
                                    currentMonth ? "" : "text-gray-400", 
                                    today ? "bg-red-500 text-white" : "", 
                                    selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-primary-green text-white": "",
                                    "h-10 w-10 mt-2 grid place-content-center rounded-full hover:bg-primary-green cursor-pointer hover:text-white transition-all"
                                    )}
                                    onClick={() => {
                                        setSelectDate(date);
                                    }}
                                >{date.date()}</h1>
                                <p className="text-sm text-gray-500 mt-2">{cn(today ? "Static Appointment" : "")}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </>
    )
}

export default Calendar;