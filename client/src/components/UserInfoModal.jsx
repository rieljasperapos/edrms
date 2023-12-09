import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserInfoModal = ({ user, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    accountId: user.accountId,
    username: user.username,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    birthdate: user.birthdate,
  });

  const [sessionData, setSessionData] = useState();
  const fetchSession = () => {
    fetch("http://localhost:3000/session", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSessionData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleClick = () => {
    fetch(`http://localhost:3000/account/${user.accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
        } else {
          // Handle the case where data is falsy
        }
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        fetchSession();
        setEditMode(false);
      });
  };

  console.log(editedUser);

  const formatDate = (dateString) => {
    const originalDate = new Date(dateString);

    // Format the date to "yyyy-MM-dd"
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <div className="z-99 fixed inset-0 flex h-[calc(100%)] items-center justify-center bg-black bg-gray-500 bg-opacity-75 md:inset-0">
      <div className="relative rounded-xl border bg-white p-8 text-black shadow-lg">
        {/*<button*/}
        {/*  className="absolute right-4 top-4 text-gray-600"*/}
        {/*  onClick={editMode ? handleClick : handleEditClick}*/}
        {/*>*/}
        {/*  {editMode ? "Save" : "Edit"}*/}
        {/*</button>*/}
        <div className="w-96">
          <div className="mb-8 mt-6 flex flex-col items-center gap-4">
            <FaUserCircle className="text-4xl" />
            <p className="text-2xl">
              {user.firstName} {user.middleName} {user.lastName}
            </p>
          </div>
          <div className="mb-10 flex flex-col gap-4">
            <p className="font-semibold uppercase">First name</p>
            {editMode ? (
              <input
                className="border p-2"
                value={editedUser.firstName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
              />
            ) : (
              <p>{user.firstName}</p>
            )}
          </div>
          <div className="mb-10 flex flex-col gap-4">
            <p className="font-semibold uppercase">Middle name</p>
            {editMode ? (
              <input
                className="border p-2"
                value={editedUser.middleName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, middleName: e.target.value })
                }
              />
            ) : (
              <p>{user.middleName}</p>
            )}
          </div>
          <div className="mb-10 flex flex-col gap-4">
            <p className="font-semibold uppercase">Last name</p>
            {editMode ? (
              <input
                className="border p-2"
                value={editedUser.lastname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastname: e.target.value })
                }
              />
            ) : (
              <p>{user.lastName}</p>
            )}
          </div>
          <div className="mb-10 flex flex-col gap-4">
            <p className="font-semibold uppercase">Birth date</p>
            {editMode ? (
              <input
                type="date"
                className="border p-2"
                value={formatDate(editedUser.birthdate)}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, birthdate: e.target.value })
                }
              />
            ) : (
              <p>{formatDate(user.birthdate)}</p>
            )}
          </div>
          <div>
            <button
              className="mt-4 w-full rounded-full bg-custom-blue px-4 py-2 text-white"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
