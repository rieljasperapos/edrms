// Navbar.jsx
import React from "react";
import Logo from "../assets/clinicLogo.png";
import AddIcon from "../assets/add-icon.png";
import CalendarIcon from "../assets/calendar-icon.png";
import FolderIcon from "../assets/folder-icon.png";
import LogoutIcon from "../assets/logout-icon.png";
import { AiOutlineFolderOpen } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        fetch('http://localhost:3000/signout', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error (`Error ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate('/signin');
            })
    }

  return (
    <div className="navbar-menu fixed flex h-screen w-28 flex-col overflow-auto bg-custom-blue font-Montserrat text-white shadow-2xl ">
      <div>
        <img src={Logo} className="mx-auto my-6 h-24" alt="Page Logo" />
      </div>
      <div className="flex flex-grow flex-col items-center justify-center bg-white text-black">
        <div className="m-auto mt-4 grid">
          <NavItem icon={FolderIcon} text="Patient Records" />
          <NavItem icon={AddIcon} text="Add Record" />
          <NavItem icon={CalendarIcon} text="Calendar" />
        </div>
        <button
          id="menu-logout"
          className="mb-10 mt-auto flex cursor-pointer space-x-2 p-1 hover:bg-custom-gray"
          onClick={handleLogout}
        >
          <img src={LogoutIcon} className="h-6 w-6" alt="Logout Icon" />
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text }) => {
  return (
    <div className="cursor-pointer pl-2 pr-2">
      <div className="flex h-20 flex-col flex-wrap items-center justify-center rounded-xl p-2 hover:bg-custom-gray hover:shadow-inner-dark">
        <img src={icon} className="h-6 w-6" alt={`${text} Icon`} />
        <p className="text-center text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Navbar;
