// Navbar.jsx
import React, { useEffect, useState } from "react";
import Logo from "../assets/clinicLogo.png";
import AddIcon from "../assets/add-icon.png";
import CalendarIcon from "../assets/calendar-icon.png";
import FolderIcon from "../assets/folder-icon.png";
import LogoutIcon from "../assets/logout-icon.png";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import UserModal from './userInfoModal';

import { useNavigate } from "react-router-dom";

// const UserModal = ({ user, onClose, fetchSession }) => {
//     const [editMode, setEditMode] = useState(false);
//     const [editedUser, setEditedUser] = useState({
//         firstName: user.firstName,
//         middleName: user.middleName,
//         lastname: user.lastname,
//     });

//     const handleEditClick = () => {
//         setEditMode(true);
//     };

//     console.log(user.accountId);

//     const handleClick = () => {
//         fetch(`http://localhost:3000/account/${user.accountId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify( editedUser )
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Error ${response.status}`)
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data) {
//                     console.log(data);
//                 } else {
//                     // Handle the case where data is falsy
//                 }
//             })
//             .catch(err => {
//                 console.error(err.message);
//             })
//             .finally(() => {
//                 fetchSession();
//                 setEditMode(false);
//             })
//     }

//     console.log(editedUser);

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//             <div className="bg-white p-8 rounded-xl relative">
//                 <button
//                     className="absolute top-4 right-4 text-gray-600"
//                     onClick={editMode ? handleClick : handleEditClick}
//                 >
//                     {editMode ? "Save" : "Edit"}
//                 </button>
//                 <div className="w-96">
//                     <div className="flex flex-col items-center mb-8 mt-6 gap-4">
//                         <FaUserCircle className="text-4xl" />
//                         <p className="text-2xl">
//                             {editedUser.firstName} {editedUser.middleName} {editedUser.lastname}
//                         </p>
//                     </div>
//                     <div className="flex flex-col gap-4 mb-10">
//                         <p className="uppercase font-semibold">First name</p>
//                         {editMode ? (
//                             <input
//                                 className="p-2 border"
//                                 value={editedUser.firstName}
//                                 onChange={(e) =>
//                                     setEditedUser({ ...editedUser, firstName: e.target.value })
//                                 }
//                             />
//                         ) : (
//                             <p>{user.firstName}</p>
//                         )}
//                     </div>
//                     <div className="flex flex-col gap-4 mb-10">
//                         <p className="uppercase font-semibold">Middle name</p>
//                         {editMode ? (
//                             <input
//                                 className="p-2 border"
//                                 value={editedUser.middleName}
//                                 onChange={(e) =>
//                                     setEditedUser({ ...editedUser, middleName: e.target.value })
//                                 }
//                             />
//                         ) : (
//                             <p>{user.middleName}</p>
//                         )}
//                     </div>
//                     <div className="flex flex-col gap-4 mb-10">
//                         <p className="uppercase font-semibold">Last name</p>
//                         {editMode ? (
//                             <input
//                                 className="p-2 border"
//                                 value={editedUser.lastname}
//                                 onChange={(e) =>
//                                     setEditedUser({ ...editedUser, lastname: e.target.value })
//                                 }
//                             />
//                         ) : (
//                             <p>{user.lastname}</p>
//                         )}
//                     </div>
//                     <div>
//                         <button
//                             className="mt-4 bg-custom-blue text-white rounded-full w-full px-4 py-2"
//                             onClick={onClose}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


const Navbar = (props) => {
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState({});
    const [user, setUser] = useState({});
    const [showUserModal, setShowUserModal] = useState(false);
    const handleLogout = () => {
        fetch("http://localhost:3000/signout", {
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
                navigate("/signin");
            });
    };

    // const fetchSession = () => {
    //     fetch("http://localhost:3000/session", {
    //         credentials: "include",
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`Error ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             setSessionData(data);
    //         })
    //         .catch((err) => {
    //             console.error(err.message);
    //         });
    // }

    // console.log(sessionData.accountId);

    // useEffect(() => {
    //     fetchSession();
    // }, [showUserModal]);

    // console.log(sessionData);
    // console.log(user)

    // useEffect(() => {
    //     fetch(`http://localhost:3000/getAccountById`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify( {accountId: sessionData.accountId} )
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Error ${response.status}`)
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data) {
    //                 setUser(data);
    //                 console.log(data);
    //             } else {
    //                 // Handle the case where data is falsy
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err.message);
    //         })
    // }, [sessionData])

    console.log(props.user);


    return (
        <div className="navbar-menu border-gray-300-600 fixed flex h-screen w-28 flex-col overflow-auto border-r bg-custom-blue font-Montserrat text-white shadow-2xl">
            <div>
                <img src={Logo} className="mx-auto my-6 h-24" alt="Page Logo" />
            </div>
            <div className="flex flex-grow flex-col items-center justify-center bg-white text-black">
                <div className="m-auto mt-4 grid">
                    <NavItem text="Dashboard" />
                    <NavItem icon={FolderIcon} text="Patient Records" />
                    <NavItem icon={AddIcon} text="Add Record" />
                    <NavItem icon={CalendarIcon} text="Calendar" />
                    {user.isAdmin ? <NavItem text="Manage" /> : ""}
                </div>
                <div className="m-auto mt-4 flex flex-col gap-2 ">
                    <div
                        className="flex flex-col items-center gap-1 rounded-xl p-4 hover:bg-custom-gray hover:shadow-inner-dark cursor-pointer"
                        onClick={() => setShowUserModal(true)}>
                        <FaUserCircle className="text-4xl" />
                        <p className="text-xl">{props.user.first_name}</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            id="menu-logout"
                            className="flex items-center justify-center rounded-xl p-2 hover:bg-custom-gray hover:shadow-inner-dark"
                            onClick={handleLogout}
                        >
                            <BiLogOut className="text-2xl" />
                        </button>
                    </div>
                </div>
                {showUserModal && (
                    <UserModal user={props.user} onClose={() => setShowUserModal(false)} fetchSession={props.fetchSession} />
                )}
            </div>
        </div>
    );
};

const NavItem = ({ icon, text }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (text === "Add Record") {
            navigate("/addRecord");
        } else if (text === "Patient Records") {
            navigate("/patientRecordList");
        } else if (text === "Calendar") {
            navigate("/calendar");
        } else if (text === "Dashboard") {
            navigate("/dashboard");
        } else if (text === "Manage") {
            navigate("/manage");
        }
    };
    return (
        <div className="cursor-pointer pl-2 pr-2" onClick={handleClick}>
            <div className="flex h-20 flex-col flex-wrap items-center justify-center rounded-xl p-2 hover:bg-custom-gray hover:shadow-inner-dark">
                {text === "Manage" ? (
                    <RiUserSettingsLine className="text-3xl" />
                ) : text === "Dashboard" ? (
                    <RiHome2Line className="text-3xl" />
                ) : (
                    <img src={icon} className="h-6 w-6" alt={`${text} Icon`} />
                )}
                <p className="text-center text-sm">{text}</p>
            </div>
        </div>
    );
};

export default Navbar;