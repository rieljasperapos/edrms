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

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
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

  useEffect(() => {
    fetch("http://localhost:3000/sessionInfo", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

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
          <div className="flex flex-col items-center gap-1 rounded-xl p-4 hover:bg-custom-gray hover:shadow-inner-dark">
            <FaUserCircle className="text-4xl" />
            <p className="text-xl">{user.username}</p>
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
