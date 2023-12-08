import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserModal = ({ user, onClose, fetchSession }) => {
    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
    
        // Format the date to "yyyy-MM-dd"
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({
        username: user.username,
        firstName: user.first_name,
        middleName: user.middle_name,
        lastname: user.last_name,
        birthdate: formatDate(user.birthdate),
    });

    const handleEditClick = () => {
        setEditMode(true);
    };

    console.log(user);

    const handleClick = () => {
        fetch(`http://localhost:3000/account/${user.account_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( editedUser )
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log(data);
                } else {
                    // Handle the case where data is falsy
                }
            })
            .catch(err => {
                console.error(err.message);
            })
            .finally(() => {
                fetchSession();
                setEditMode(false);
            })
    }

    console.log(editedUser);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-99 md:inset-0 h-[calc(100%)]">
            <div className="bg-white p-8 rounded-xl relative shadow-lg border">
                <button
                    className="absolute top-4 right-4 text-gray-600"
                    onClick={editMode ? handleClick : handleEditClick}
                >
                    {editMode ? "Save" : "Edit"}
                </button>
                <div className="w-96">
                    <div className="flex flex-col items-center mb-8 mt-6 gap-4">
                        <FaUserCircle className="text-4xl" />
                        <p className="text-2xl">
                            {user.first_name} {user.middle_name} {user.last_name}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 mb-10">
                        <p className="uppercase font-semibold">First name</p>
                        {editMode ? (
                            <input
                                className="p-2 border"
                                value={editedUser.firstName}
                                onChange={(e) =>
                                    setEditedUser({ ...editedUser, firstName: e.target.value })
                                }
                            />
                        ) : (
                            <p>{user.first_name}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 mb-10">
                        <p className="uppercase font-semibold">Middle name</p>
                        {editMode ? (
                            <input
                                className="p-2 border"
                                value={editedUser.middleName}
                                onChange={(e) =>
                                    setEditedUser({ ...editedUser, middleName: e.target.value })
                                }
                            />
                        ) : (
                            <p>{user.middle_name}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 mb-10">
                        <p className="uppercase font-semibold">Last name</p>
                        {editMode ? (
                            <input
                                className="p-2 border"
                                value={editedUser.lastname}
                                onChange={(e) =>
                                    setEditedUser({ ...editedUser, lastname: e.target.value })
                                }
                            />
                        ) : (
                            <p>{user.last_name}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 mb-10">
                        <p className="uppercase font-semibold">Birth date</p>
                        {editMode ? (
                            <input
                                type="date"
                                className="p-2 border"
                                value={editedUser.birthdate}
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
                            className="mt-4 bg-custom-blue text-white rounded-full w-full px-4 py-2"
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

export default UserModal;