import React, { useState, useEffect } from "react";
import img11 from "../assets/toothImages/11.png";
import img12 from "../assets/toothImages/12.png";
import img13 from "../assets/toothImages/13.png";
import img14 from "../assets/toothImages/14.png";
import img15 from "../assets/toothImages/15.png";
import img16 from "../assets/toothImages/16.png";
import img17 from "../assets/toothImages/17.png";
import img18 from "../assets/toothImages/18.png";
import img21 from "../assets/toothImages/21.png";
import img22 from "../assets/toothImages/22.png";
import img23 from "../assets/toothImages/23.png";
import img24 from "../assets/toothImages/24.png";
import img25 from "../assets/toothImages/25.png";
import img26 from "../assets/toothImages/26.png";
import img27 from "../assets/toothImages/27.png";
import img28 from "../assets/toothImages/28.png";
import img31 from "../assets/toothImages/31.png";
import img32 from "../assets/toothImages/32.png";
import img33 from "../assets/toothImages/33.png";
import img34 from "../assets/toothImages/34.png";
import img35 from "../assets/toothImages/35.png";
import img36 from "../assets/toothImages/36.png";
import img37 from "../assets/toothImages/37.png";
import img38 from "../assets/toothImages/38.png";
import img41 from "../assets/toothImages/41.png";
import img42 from "../assets/toothImages/42.png";
import img43 from "../assets/toothImages/43.png";
import img44 from "../assets/toothImages/44.png";
import img45 from "../assets/toothImages/45.png";
import img46 from "../assets/toothImages/46.png";
import img47 from "../assets/toothImages/47.png";
import img48 from "../assets/toothImages/48.png";
import img51 from "../assets/toothImages/51.png";
import img52 from "../assets/toothImages/52.png";
import img53 from "../assets/toothImages/53.png";
import img54 from "../assets/toothImages/54.png";
import img55 from "../assets/toothImages/55.png";
import img61 from "../assets/toothImages/61.png";
import img62 from "../assets/toothImages/62.png";
import img63 from "../assets/toothImages/63.png";
import img64 from "../assets/toothImages/64.png";
import img65 from "../assets/toothImages/65.png";
import img71 from "../assets/toothImages/71.png";
import img72 from "../assets/toothImages/72.png";
import img73 from "../assets/toothImages/73.png";
import img74 from "../assets/toothImages/74.png";
import img75 from "../assets/toothImages/75.png";
import img81 from "../assets/toothImages/81.png";
import img82 from "../assets/toothImages/82.png";
import img83 from "../assets/toothImages/83.png";
import img84 from "../assets/toothImages/84.png";
import img85 from "../assets/toothImages/85.png";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";

function ToothChartModal({ propSetVisibleModal, propPatientId }) {
  const x1 = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const x2 = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const x3 = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
  const x4 = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

  const [editMode, setEditMode] = useState(false);

  const toothImagesPath = {
    11: img11,
    12: img12,
    13: img13,
    14: img14,
    15: img15,
    16: img16,
    17: img17,
    18: img18,
    21: img21,
    22: img22,
    23: img23,
    24: img24,
    25: img25,
    26: img26,
    27: img27,
    28: img28,
    31: img31,
    32: img32,
    33: img33,
    34: img34,
    35: img35,
    36: img36,
    37: img37,
    38: img38,
    41: img41,
    42: img42,
    43: img43,
    44: img44,
    45: img45,
    46: img46,
    47: img47,
    48: img48,
    51: img51,
    52: img52,
    53: img53,
    54: img54,
    55: img55,
    61: img61,
    62: img62,
    63: img63,
    64: img64,
    65: img65,
    71: img71,
    72: img72,
    73: img73,
    74: img74,
    75: img75,
    81: img81,
    82: img82,
    83: img83,
    84: img84,
    85: img85,
  };

  const [toothData, setToothData] = useState({});
  const [teethData, setTeethData] = useState([]);

  const [formToothNumber, setFormToothNumber] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [toothList, setToothList] = useState([]);

  const [toothAlreadyExist, setToothAlreadyExist] = useState(false);
  const [toothNotFound, setToothNotFound] = useState(false);
  const fetchToothList = () => {
    fetch(`http://localhost:3000/toothNumbers`)
      .then((response) => response.json())
      .then((item) => {
        setToothList(item.data);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  const fetchList = () => {
    fetch(`http://localhost:3000/teethChart/${propPatientId}`)
      .then((response) => response.json())
      .then((item) => {
        setTeethData(item.data);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchList();
    fetchToothList();
  }, [propPatientId]);

  const handleSubmit = () => {
    setToothAlreadyExist(false);
    setToothNotFound(false);
    const toothData = {
      toothNumber: formToothNumber,
      status: formStatus,
    };

    console.log(toothData);
    // Make the API request
    fetch(`http://localhost:3000/teethChart/${propPatientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toothData),
    })
      .then((response) => {
        if (!response.ok) {
          setToothAlreadyExist(true);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tooth data submitted successfully", data);
        // Reset form values after successful submission
        setFormToothNumber("");
        setFormStatus("");
        fetchList();
      })
      .catch((error) => {
        console.error("Error submitting tooth data:", error.message);
        setToothAlreadyExist(true);
      });
  };

  const handleEdit = () => {
    setToothAlreadyExist(false);
    setToothNotFound(false);

    const data = {
      toothNumber: formToothNumber,
      status: formStatus,
    };
    // Assuming you have a backend endpoint for updating tooth status
    console.log("edit");
    fetch(`http://localhost:3000/teethChart/${propPatientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404 || response.status === 400) {
            // Tooth not found
            setToothNotFound(true);
          } else {
            // Handle other errors if needed
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle success if needed
        setFormToothNumber("");
        setFormStatus("");
        fetchList();
      })
      .catch((error) => {
        console.error("Error updating tooth status:", error);
        // Handle other errors if needed
      });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex min-h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="mt-10 h-auto w-8/12 overflow-auto rounded-lg border-2 bg-white p-4 pb-3">
          <div className="flex">
            <div className="mb-4 w-full text-4xl font-bold">TEETH CHART</div>
            <div className="pr-8">
              {!editMode && (
                <button
                  className="flex items-center gap-1 font-Karla text-xl text-green-500 hover:text-green-800 hover:underline"
                  onClick={() => {
                    setEditMode(true);
                    setToothNotFound(false);
                    setToothAlreadyExist(false);
                  }}
                >
                  <FaEdit />
                  Update
                </button>
              )}
              {editMode && (
                <button
                  className="flex items-center gap-1 font-Karla text-xl text-blue-900 hover:text-green-800 hover:underline"
                  onClick={() => {
                    setEditMode(false);
                    setToothNotFound(false);
                    setToothAlreadyExist(false);
                    console.log(teethData);
                  }}
                >
                  <IoAddCircle className="text-2xl" />
                  Add
                </button>
              )}
            </div>
            <div
              className="text-2xl text-gray-500 hover:text-black"
              onClick={() => propSetVisibleModal(false)}
            >
              <IoMdCloseCircle />
            </div>
          </div>

          <div id="x1-2">
            <div className="flex">
              {x1.map((item) => {
                // Find the corresponding teeth data for the current item number
                const matchingTeethData = teethData.find(
                  (data) => data.tooth_number === item,
                );

                return (
                  <div
                    key={item}
                    className="flex flex-initial flex-col justify-between border p-2 text-center"
                  >
                    <img
                      src={toothImagesPath[item]}
                      alt={`Image for ${item}`}
                      className="h-10 w-14" // Adjust the width and height classes as needed
                    />
                    <div>
                      <div>{item}</div>
                      <div
                        className={
                          matchingTeethData ? "text-xs" : "text-xs text-white"
                        }
                      >
                        {matchingTeethData ? matchingTeethData.status : "None"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex">
              {x2.map((item) => {
                // Find the corresponding teeth data for the current item number
                const matchingTeethData = teethData.find(
                  (data) => data.tooth_number === item,
                );

                return (
                  <div
                    key={item}
                    className="flex flex-initial flex-col justify-between border p-2 text-center"
                  >
                    <img
                      src={toothImagesPath[item]}
                      alt={`Image for ${item}`}
                      className="h-10 w-14" // Adjust the width and height classes as needed
                    />
                    <div>
                      <div>{item}</div>
                      <div
                        className={
                          matchingTeethData ? "text-xs" : "text-xs text-white"
                        }
                      >
                        {matchingTeethData ? matchingTeethData.status : "None"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex ">
            <div
              id="x3-4"
              className="mt-6 flex flex-col items-center rounded-lg bg-white px-12 py-4"
            >
              <div className="flex">
                {x3.map((item) => {
                  // Find the corresponding teeth data for the current item number
                  const matchingTeethData = teethData.find(
                    (data) => data.tooth_number === item,
                  );

                  return (
                    <div
                      key={item}
                      className="flex flex-initial flex-col justify-between border p-2 text-center"
                    >
                      <img
                        src={toothImagesPath[item]}
                        alt={`Image for ${item}`}
                        className="h-10 w-14" // Adjust the width and height classes as needed
                      />
                      <div>
                        <div>{item}</div>
                        <div
                          className={
                            matchingTeethData ? "text-xs" : "text-xs text-white"
                          }
                        >
                          {matchingTeethData
                            ? matchingTeethData.status
                            : "None"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex">
                {x4.map((item) => {
                  // Find the corresponding teeth data for the current item number
                  const matchingTeethData = teethData.find(
                    (data) => data.tooth_number === item,
                  );

                  return (
                    <div
                      key={item}
                      className="flex flex-initial flex-col justify-between border p-2 text-center"
                    >
                      <img
                        src={toothImagesPath[item]}
                        alt={`Image for ${item}`}
                        className="h-10 w-14" // Adjust the width and height classes as needed
                      />
                      <div>
                        <div>{item}</div>
                        <div
                          className={
                            matchingTeethData ? "text-xs" : "text-xs text-white"
                          }
                        >
                          {matchingTeethData
                            ? matchingTeethData.status
                            : "None"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <form className="self-center" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <label className="mb-1 font-Karla text-base font-bold text-black">
                  Tooth Number
                </label>
                <select
                  className="h-8 w-full rounded-lg border-2 px-3 font-Karla"
                  value={formToothNumber}
                  onChange={(e) => setFormToothNumber(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Tooth Number
                  </option>
                  {toothList.map((toothNumber) => (
                    <option key={toothNumber} value={toothNumber}>
                      {toothNumber}
                    </option>
                  ))}
                </select>
                {toothAlreadyExist && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <IoIosWarning />
                    Tooth Exist, click Update
                  </div>
                )}
                {toothNotFound && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <IoIosWarning />
                    Tooth Not Found, click Add
                  </div>
                )}
              </div>
              <div className="flex flex-col pb-3">
                <label className="mb-1 font-Karla text-base font-bold text-black">
                  Status
                </label>
                <input
                  type="text"
                  className="h-8 w-full rounded-lg border-2 px-3 font-Karla"
                  value={formStatus}
                  required
                  onChange={(e) => setFormStatus(e.target.value)}
                />
              </div>
              <div className="flex ">
                <button
                  className=" self-center rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
                  onClick={editMode ? handleEdit : handleSubmit}
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToothChartModal;
