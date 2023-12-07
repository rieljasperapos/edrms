import React, { useState, useEffect } from "react";
import "../index.css";
import Contents from "../components/contents.jsx";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import { useNavigate } from "react-router-dom";

import { MdError } from "react-icons/md";
import { FaAsterisk } from "react-icons/fa";

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

  const [isFormValid, setFormValid] = useState(false);
  const [isValidContactNumber, setValidContactNumber] = useState(false);
  const [isValidEmail, setValidEmail] = useState(true);
  const [submitError, setSubmitError] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };
  // Handle form submission

  useEffect(() => {
    const isValidFormatContactNumber = /^(09\d{9}|[2,4]\d{6})$/.test(
      contactNumber,
    );
    if (!isValidFormatContactNumber) {
      // Handle the case where the contact number is not in the desired format
      console.log("Invalid contact number format");
      setValidContactNumber(false);
    } else {
      setValidContactNumber(true);
    }
    const isValidFormatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidEmail = isValidFormatEmail || email === "";
    if (!isValidEmail) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [contactNumber, email]);

  useEffect(() => {
    // Your validation logic goes here
    const isLastNameValid = lastName.trim() !== "";
    const isFirstNameValid = firstName.trim() !== "";
    const isBirthdateValid = birthdate.trim() !== "";
    const isSexValid = sex.trim() !== "";
    const isAddressValid = streetAddress.trim() !== "";
    const isCityValid = city.trim() !== "";
    const isContactNumberValid =
      contactNumber.trim() !== "" &&
      /^(09\d{9}|[2,4]\d{6})$/.test(contactNumber);
    const isEmailValid =
      email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Update form validity state
    setFormValid(
      isLastNameValid &&
        isFirstNameValid &&
        isBirthdateValid &&
        isSexValid &&
        isAddressValid &&
        isCityValid &&
        isContactNumberValid &&
        isEmailValid,
    );
  }, [
    lastName,
    firstName,
    birthdate,
    sex,
    streetAddress,
    city,
    contactNumber,
    email,
  ]);

  const isEmpty = (field) => {
    // Trim the field to remove leading and trailing whitespaces
    const trimmedField = field.trim();

    // Check if the trimmed field is empty
    return trimmedField === "";
  };

  const handleSubmit = () => {
    // Check if required fields are empty
    if (!isFormValid) {
      console.log("Please fill out all required fields");
      return;
    }

    const formData = {
      last_name: lastName.trim(),
      first_name: firstName.trim(),
      middle_name: middleName.trim(),
      birthdate: birthdate.trim(),
      sex: sex.trim(),
      contact_number: contactNumber.trim(),
      email: email.trim(), // Assuming you have defined 'email' state
      street_address: streetAddress.trim(),
      city: city.trim(),
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
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setSubmitError(true);
        // Handle or display an error message to the user
      })
      .finally(() => {
        if (!submitError) {
          navigate("/patientRecordList");
        }
      });
  };

  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <div className="flex items-center justify-between border-b bg-custom-blue px-12 pb-6 pt-8">
          <h1 className="font-Montserrat text-4xl font-bold text-white">
            Add Record
          </h1>
        </div>

        <form
          className="md:grids-cols-4 sm:grids-cols-1 mb-8 grid flex-col justify-between gap-x-6 gap-y-10 px-12 py-8 lg:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3 flex items-center">
              Last Name <span className="text-2xl text-red-500">*</span>
            </label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={lastName}
              onChange={(event) => handleInputChange(event, setLastName)}
              required
            />
            {/*{isEmpty(lastName) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">
              {" "}
              First Name <span className="text-2xl text-red-500">*</span>
            </label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={firstName}
              onChange={(event) => handleInputChange(event, setFirstName)}
              required
            />
            {/*{isEmpty(firstName) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">Middle Name</label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={middleName}
              onChange={(event) => handleInputChange(event, setMiddleName)}
            />
          </div>
          {/* Improved Birthdate input field */}
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">
              Birthdate <span className="text-2xl text-red-500">*</span>
            </label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="date"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
              required
            />
            {/*{isEmpty(birthdate) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">
              Sex <span className="text-2xl text-red-500">*</span>
            </label>
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
            {/*{isEmpty(sex) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          <div className="col-span-2 flex flex-col font-Karla text-lg">
            <label className="mb-3">
              Address <span className="text-2xl text-red-500">*</span>
            </label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={streetAddress}
              onChange={(event) => handleInputChange(event, setStreetAddress)}
              required
            />
            {/*{isEmpty(streetAddress) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">
              City <span className="text-2xl text-red-500">*</span>
            </label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={city}
              onChange={(event) => handleInputChange(event, setCity)}
              required
            />
            {/*{isEmpty(city) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">
              Contact Number <span className="text-2xl text-red-500">*</span>
            </label>
            <input
              className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="text"
              value={contactNumber}
              onChange={(event) => handleInputChange(event, setContactNumber)}
              required
              placeholder="09xxxxxxxxx"
              pattern="^(09\d{9}|[2,4]\d{6})$"
              title="Enter a valid phone number (e.g., 09xxxxxxxxx or 2xxxxxx or 4xxxxxx)"
            />
            {/*{isEmpty(contactNumber) && (*/}
            {/*  <span className="flex items-center gap-1 text-sm text-red-500">*/}
            {/*    <MdError />*/}
            {/*    This field is required*/}
            {/*  </span>*/}
            {/*)}*/}
            {!isEmpty(contactNumber) && !isValidContactNumber && (
              <span className="flex items-center gap-1 text-sm text-red-500">
                <MdError />
                Invalid Contact Number
              </span>
            )}
          </div>
          {/* Improved Email input field */}
          <div className="col-span-1 flex flex-col font-Karla text-lg">
            <label className="mb-3">Email</label>
            <input
              className="...peer h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
              type="email"
              value={email}
              onChange={(event) => handleInputChange(event, setEmail)}
              placeholder="sample@email.com"
            />
            {!isValidEmail && (
              <span className="flex items-center gap-1 text-sm text-red-500">
                <MdError />
                Invalid Email
              </span>
            )}
          </div>
          <button
            className="col-span-3 h-12 w-40 place-self-center rounded-lg border-2 bg-custom-green font-Karla text-2xl font-bold text-white hover:bg-green-600"
            onClick={handleSubmit}
            disabled={isFormValid && !isValidContactNumber && !isValidEmail}
          >
            Submit
          </button>
        </form>
      </Contents>
    </>
  );
}

export default AddRecord;
