import React from "react";
import Logo from '../assets/clinicLogo.png';
import AddIcon from '../assets/add-icon.png';
import CalendarIcon from '../assets/calendar-icon.png';
import FolderIcon from '../assets/folder-icon.png';
import LogoutIcon from '../assets/logout-icon.png';

const Navbar = () => {
    return (
        <div className="navbar-menu bg-custom-blue text-white w-64 fixed h-screen overflow-auto shadow-lg flex flex-col">
            <div className="flex-grow flex flex-col justify-center">
                <img src={Logo} className="h-24 mx-auto my-6" alt="Page Logo" />
                <div className="ml-6 space-y-4">
                    <NavItem icon={FolderIcon} text="Patient Records" />
                    <NavItem icon={CalendarIcon} text="Calendar" />
                    <NavItem icon={AddIcon} text="Add Patient" />
                </div>
                <div id="menu-logout" className="cursor-pointer mt-auto mb-10 pb-8 ml-8 flex space-x-2">
                    <img src={LogoutIcon} className="w-6 h-6" alt="Logout Icon" />
                    <p className="text-sm">Logout</p>
                </div>
            </div>
        </div>
    );
}

const NavItem = ({ icon, text }) => {
    return (
        <div className="cursor-pointer flex items-center space-x-2 p-2 rounded hover:bg-custom-blue-light">
            <img src={icon} className="w-6 h-6" alt={`${text} Icon`} />
            <p className="text-sm">{text}</p>
        </div>
    );
}

export default Navbar;
