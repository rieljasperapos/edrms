import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../utils/calendar";
import dayjs from "dayjs";
import cn from "../utils/cn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAppointment from "./addAppointmentsModal";

const calendarMonthView = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  // console.log(showModal);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    navigate("/calendar/week");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/`appointments`", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          // console.log(data);
          setAppointments(data);
        } else {
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [showModal]);

  console.log(appointments);
  appointments.map((event) => {
    console.log(event.date_schedule);
  });

  console.log(showModal);

  // console.log(`Current Date: ${currentDate.format("HH:mm")}`);
  // console.log(hours);
  // console.log(`Today: ${today.hour()} : ${today.minute()}`);
  // console.log(selectDate);
  // console.log(`Today.month: ${today.month()}`)
  // console.log(currentDate.month());
  // console.log(today);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-center justify-between border-b p-6">
        <h1 className="text-3xl font-bold uppercase text-black">Calendar</h1>
        <button
          className="rounded-lg bg-custom-green p-3 font-medium text-white"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add appointment
        </button>
        <AddAppointment isVisible={showModal} handleClose={handleClose} />
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between border bg-custom-gray p-6">
          <div className="flex items-center gap-4 p-2">
            <GrFormPrevious
              size={25}
              className=" rounded-full hover:bg-gray-300"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <GrFormNext
              size={25}
              className=" rounded-full hover:bg-gray-300"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
            <button
              className="cursor-pointer rounded-lg border bg-white px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </button>
            <h1 className="text-xl font-medium">
              {months[today.month()]} {today.year()}
            </h1>
          </div>
          <div className="relative ml-4 inline-block text-left">
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none"
              onClick={toggleDropdown}
            >
              Month
              <svg
                className={`ml-2 h-2.5 w-2.5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleClick}
                  >
                    Week
                  </a>
                </div>
              </div>
            )}
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
              // console.log(today);
              // console.log(date);
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
                  <div className="p-2">
                    {appointments
                      .filter(
                        (event) => date.isSame(event.date_schedule),
                        "day",
                      )
                      .map((event, index) => {
                        const timeParts = event.time_schedule.split(":");
                        const hours = parseInt(timeParts[0], 10);
                        const minutes = timeParts[1];
                        const amPm = hours >= 12 ? "PM" : "AM";
                        const formattedHours =
                          hours % 12 === 0 ? 12 : hours % 12;
                        const formattedTime = `${formattedHours}:${minutes}`;
                        return (
                          <div className="mt-2 flex cursor-pointer flex-col gap-2 rounded-lg bg-custom-blue p-2 text-sm text-white transition-transform ease-in hover:scale-105">
                            <p className="font-semibold">
                              {formattedTime} {amPm}
                            </p>
                            <p>{event.purpose}</p>
                          </div>
                        );
                      })}
                    {/* <p className={`text-sm mt-2 bg-custom-blue rounded-lg text-white cursor-pointer hover:scale-105 transition-transform ease-in ${today ? 'p-2' : ''}`}>{cn(today ? `Static Appointment, ${currentDate.format("HH:mm")}` : "")}</p> */}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </>
  );
};

export default calendarMonthView;
