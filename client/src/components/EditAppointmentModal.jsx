import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditAppointmentsModal = ({
  handleClose,
  EditVisible,
  appointmentDetails,
  fetchAppointments,
}) => {
  const [date, setDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [timeSchedule, setTimeSchedule] = useState("");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  console.log(date);
  console.log(contactNumber);
  console.log(timeSchedule);
  console.log(purpose);
  console.log(name);

  console.log("Appointment ID");
  console.log(appointmentDetails?.appointment_id);

  const handleClick = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3000/appointments/edit/${appointmentDetails?.appointment_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          timeSchedule,
          name,
          contactNumber,
          purpose,
        }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          handleClose();
        } else {
          // Handle the case where data is falsy
        }
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        fetchAppointments();
      });
  };

  console.log(appointmentDetails);

  const formatDate = (dateString) => {
    const originalDate = new Date(dateString);

    // Format the date to "yyyy-MM-dd"
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  useEffect(() => {
    if (appointmentDetails) {
      setDate(formatDate(appointmentDetails.date_schedule));
      setContactNumber(appointmentDetails.contact_number);
      setTimeSchedule(appointmentDetails.time_schedule);
      setPurpose(appointmentDetails.purpose);
      setName(appointmentDetails.name);
    }
  }, [appointmentDetails]);

  return (
    <>
      {EditVisible && (
        <div
          id="default-modal"
          className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="relative max-h-full w-full max-w-3xl p-4">
            <div className="relative rounded-lg bg-white shadow-xl">
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b bg-custom-blue p-4 dark:border-gray-600 md:p-5">
                <h3 className="text-xl font-semibold text-white dark:text-white">
                  Edit appointment
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-100 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal Body */}
              <div className="flex flex-wrap items-center justify-center gap-5 px-2 py-12">
                <div className="flex flex-col gap-1">
                  <p>Date</p>
                  <input
                    value={date}
                    type="date"
                    className="w-96 rounded-lg border p-4"
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Time</p>
                  <input
                    value={timeSchedule}
                    type="time"
                    className="w-96 rounded-lg border p-4"
                    onChange={(e) => setTimeSchedule(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Name</p>
                  <input
                    value={name}
                    type="text"
                    className="w-96 rounded-lg border p-4"
                    placeholder="e.g John Doe"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Contact Number</p>
                  <input
                    value={contactNumber}
                    type="text"
                    className="w-96 rounded-lg border p-4"
                    placeholder="09XXXXXXXXX"
                    onChange={(e) => setContactNumber(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Purpose</p>
                  <textarea
                    value={purpose}
                    rows="4"
                    type="text"
                    className="w-96 rounded-lg border p-4"
                    placeholder="e.g Monthly teeth cleaning"
                    onChange={(e) => setPurpose(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-10">
                  <button
                    className="w-96 rounded-lg bg-custom-green p-4 text-white hover:bg-green-300"
                    onClick={handleClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAppointmentsModal;
