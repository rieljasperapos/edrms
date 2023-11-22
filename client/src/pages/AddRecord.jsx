import React, { useState, useEffect } from "react";
import "../index.css";
import Contents from "../components/contents.jsx";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import { useNavigate } from "react-router-dom";

function AddRecord() {
  // State variables for input fields
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState(""); // 'male', 'female', or an empty string
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };
  // Handle form submission

  const handleSubmit = () => {
    // Check if required fields are empty
    if (
      !lastName ||
      !firstName ||
      !birthdate ||
      !sex ||
      !contactNumber ||
      !streetAddress ||
      !city
    ) {
      console.log("Please fill out all required fields");
    } else {
      // Prepare the data to be sent to the server
      const formData = {
        last_name: lastName,
        first_name: firstName,
        middle_name: middleName,
        birthdate: birthdate,
        sex: sex,
        contact_number: contactNumber,
        email: email, // Assuming you have defined 'email' state
        street_address: streetAddress,
        city: city,
      };

      // Assuming your backend API endpoint is '/addRecord'
      fetch("http://localhost:3000/addRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the response from the server

          // Check if the submission was successful
          if (data.message === "Registered Successfully") {
            // Redirect to the '/patientRecordList' route
            navigate("/patientRecordList");
          } else {
            // Handle other success scenarios or display a message to the user
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          // Handle or display an error message to the user
        });
    }
  };

  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <div className="flex items-center justify-between border-b bg-custom-blue px-12 pb-6 pt-8">
          <h1 className="font-Montserrat text-3xl font-bold uppercase text-white">
            Add Record
          </h1>
        </div>

        <form className="mb-8 grid grid-cols-6 flex-col justify-between gap-x-6 gap-y-10 px-12 py-8">
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">Last Name</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={lastName}
              onChange={(event) => handleInputChange(event, setLastName)}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3"> First Name</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={firstName}
              onChange={(event) => handleInputChange(event, setFirstName)}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">Middle Name</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={middleName}
              onChange={(event) => handleInputChange(event, setMiddleName)}
            />
          </div>
          {/* Improved Birthdate input field */}
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">Birthdate</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="date"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">Sex</label>
            <select
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              value={sex}
              onChange={(event) => setSex(event.target.value)}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-span-4 flex flex-col font-Karla text-lg">
            <label className="mb-3">Address</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={streetAddress}
              onChange={(event) => handleInputChange(event, setStreetAddress)}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">City</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={city}
              onChange={(event) => handleInputChange(event, setCity)}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">Contact Number</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={contactNumber}
              onChange={(event) => handleInputChange(event, setContactNumber)}
              required
            />
          </div>
          {/* Improved Email input field */}
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">Email</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="email"
              value={email}
              onChange={(event) => handleInputChange(event, setEmail)}
            />
          </div>

          <button
            className="col-span-2 h-12 w-40 place-self-end rounded-lg border-2 bg-custom-green font-Karla text-2xl font-bold text-white hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </Contents>
    </>
  );
}

export default AddRecord;
