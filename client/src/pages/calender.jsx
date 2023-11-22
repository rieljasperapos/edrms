import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../utils/calendar";
import dayjs from "dayjs";
import cn from "../utils/cn";
import { useState } from "react";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import Contents from "../components/contents.jsx";

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  console.log(currentDate);
  console.log(today);
  console.log(selectDate);

  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <div className="flex items-center justify-between border-b p-6">
          <h1 className="text-3xl font-bold uppercase text-black">Calendar</h1>
          <button className="bg-primary-green rounded-lg p-4 font-medium text-white">
            Add appointment
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between border bg-custom-gray p-6">
            <div>
              <h1 className="text-xl font-medium">
                {months[today.month()]} {today.year()}
              </h1>
            </div>
            <div className="flex w-44 place-content-center items-center gap-5 border p-2">
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
                    <h1
                      key={idx}
                      className="grid place-content-center border p-2 text-sm"
                    >
                      {day}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, indx) => {
                return (
                  <div
                    key={indx}
                    className="flex flex-col border pb-20 pl-4 pr-8"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-red-500 text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-primary-green text-white"
                          : "",
                        "hover:bg-primary-green mt-2 grid h-10 w-10 cursor-pointer place-content-center rounded-full transition-all hover:text-white",
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                      {cn(today ? "Static Appointment" : "")}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </Contents>
    </>
  );
};

export default Calendar;
