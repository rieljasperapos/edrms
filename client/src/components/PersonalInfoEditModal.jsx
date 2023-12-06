import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import personalInfoModal from "./PersonalInfoModal.jsx";
import { MdError } from "react-icons/md";
function PersonalInfoEditModal({
  propSetModalVisible,
  propPersonalInfo,
  propFetchPersonalInfo,
}) {
  const [personalInfo, setPersonalInfo] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [isFormValid, setFormValid] = useState(false);
  const [isValidContactNumber, setValidContactNumber] = useState(false);
  const [isValidEmail, setValidEmail] = useState(true);

  const [submitError, setSubmitError] = useState(false);

  const convertDateFormat = (inputDate) => {
    // Split the input date string into an array
    const dateArray = inputDate.split("-");

    // Rearrange the array elements to form the desired format "yyyy-mm-dd"
    const formattedDate = `${dateArray[2]}-${dateArray[0].padStart(
      2,
      "0",
    )}-${dateArray[1].padStart(2, "0")}`;

    return formattedDate;
  };
  const closePIEditModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };

  const submitPIEditModal = () => {
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

    fetch(`http://localhost:3000/updateRecord/${propPersonalInfo.patientId}`, {
      method: "PUT",
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
          // Assuming navigate is a function available in your component
          // You may need to import it or use the appropriate navigation method for your setup
          propFetchPersonalInfo();
          propSetModalVisible(false);
        }
      });
  };

  useEffect(() => {
    setPersonalInfo(propPersonalInfo);
    setFirstName(propPersonalInfo.firstName || "");
    setLastName(propPersonalInfo.lastName || "");
    setMiddleName(propPersonalInfo.middleName || "");
    setBirthdate(convertDateFormat(propPersonalInfo.birthdate) || "");
    setSex(propPersonalInfo.sex || "");
    setStreetAddress(propPersonalInfo.address || "");
    setCity(propPersonalInfo.city || "");
    setContactNumber(propPersonalInfo.contactNumber || "");
    setEmail(propPersonalInfo.email || "");
  }, [propPersonalInfo]);

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
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex w-3/4 flex-col rounded-lg border-2 bg-white sm:col-span-1 md:col-span-1 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between border-b pb-2 pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Personal Information
            </h1>
            <div className="">
              <button
                className="inline-flex items-center rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black"
                onClick={closePIEditModal}
              >
                <IoMdCloseCircle />
              </button>
            </div>
          </div>

          <form
            className="grid gap-x-4 gap-y-5 px-8 py-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                First Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Last Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Middle Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Birthdate
              </div>
              <input
                type="date"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Sex
              </div>
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
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-5">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Address
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                City
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                CONTACT NUMBER
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              {!isEmpty(contactNumber) && !isValidContactNumber && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <MdError />
                  Invalid Contact Number
                </span>
              )}
            </div>
            <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                EMAIL
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isValidEmail && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <MdError />
                  Invalid Email
                </span>
              )}
            </div>
            <div className="mb-2 mt-3 flex w-full justify-center sm:col-span-3 md:col-span-6 lg:col-span-11">
              <button
                className="w-2/12 rounded-lg border-2 bg-custom-green px-5 py-1 text-lg text-white hover:bg-green-600"
                onClick={submitPIEditModal}
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalInfoEditModal;
