import React, { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import AddAppointment from "./AddAppointmentsModal.jsx";

const CalendarWeekview = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  const nextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"));
  };

  const prevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"));
  };

  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(currentWeek.add(i, "day"));
  }

  const staticAppointments = [
    { title: "Meeting 1", date: "2023-11-24" },
    { title: "Appointment 2", date: "2023-11-23" },
    { title: "Event 3", date: "2023-11-23" },
    { title: "Event 3", date: "2023-11-21" },
    { title: "Event 3", date: "2023-11-22" },
    { title: "Event 3", date: "2023-11-23" },
    { title: "Event 3", date: "2023-11-23" },
    { title: "Event 3", date: "2023-11-21" },
    { title: "Event 3", date: "2023-11-21" },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    navigate("/calendar/month");
  };

  console.log(daysOfWeek);
  console.log(today);
  console.log(today.format("HH:mm"));
  console.log(staticAppointments);

  useEffect(() => {
    fetch("http://localhost:3000/appointments", {
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
          setAppointments(data.data);
        } else {
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [showModal]);

  console.log(appointments);

  return (
    <>
      <div className="flex items-center justify-between border-b p-6">
        <h1 className="text-3xl font-bold uppercase text-black">Calendar</h1>
        <button
          className="rounded-lg bg-custom-green p-3 font-medium text-white"
          onClick={() => setShowModal(true)}
        >
          Add appointment
        </button>

        <AddAppointment
          isVisible={showModal}
          handleClose={() => setShowModal(false)}
        />
      </div>

      <div className="min-h-full p-8">
        <div className="flex min-w-full items-center justify-between border bg-custom-gray p-6">
          <div className="flex items-center gap-4 p-2">
            <GrFormPrevious
              size={25}
              className=" rounded-full hover:bg-gray-300"
              onClick={prevWeek}
            />
            <GrFormNext
              size={25}
              className=" rounded-full hover:bg-gray-300"
              onClick={nextWeek}
            />
            <button
              className="cursor-pointer rounded-lg border bg-white px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setCurrentWeek(today.startOf("week"));
              }}
            >
              Today
            </button>

            <h1 className="text-xl font-medium">
              {currentWeek.format("MMMM YYYY")}
            </h1>
          </div>
          <div className="relative ml-4 inline-block text-left">
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              Week
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
                    Month
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <table className="h-full min-w-full border">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th
                  key={day.format("YYYY-MM-DD")}
                  className={`w-40 border bg-gray-50 px-6 py-3 text-left font-medium uppercase leading-4 tracking-wider text-gray-500`}
                >
                  <div className="flex items-center gap-2">
                    <p>{day.format("ddd")}</p>
                    <p
                      className={`${
                        day.isSame(today, "day") ? "bg-red-500 text-white" : ""
                      } rounded-full p-4`}
                    >
                      {day.format("D")}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="h-full">
              {daysOfWeek.map((day) => (
                <td
                  key={day.format("YYYY-MM-DD")}
                  className="whitespace-no-wrap w-40 border border-b-0 border-gray-200 px-6 py-4"
                >
                  {appointments
                    .filter((event) => day.isSame(event.date_schedule, "day"))
                    .map((event, index) => {
                      const timeParts = event.time_schedule.split(":");
                      const hours = parseInt(timeParts[0], 10);
                      const minutes = timeParts[1];
                      const amPm = hours >= 12 ? "PM" : "AM";
                      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
                      const formattedTime = `${formattedHours}:${minutes}`;
                      return (
                        <div
                          key={index}
                          className="mb-2 w-full min-w-full max-w-full justify-between rounded-lg bg-custom-blue p-2 text-white"
                        >
                          <p className="mb-2">
                            {formattedTime} {amPm}
                          </p>
                          <p>{event.purpose}</p>
                        </div>
                      );
                    })}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarWeekview;
