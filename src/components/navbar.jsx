import React from "react";
import Logo from '../assets/clinicLogo.png';
import AddIcon from '../assets/add-icon.png';
import CalendarIcon from '../assets/calendar-icon.png';
import FolderIcon from '../assets/folder-icon.png';
import LogoutIcon from '../assets/logout-icon.png';

const Navbar = () => {
    return (
        <div className="navbar-menu bg-custom-blue text-white w-28 fixed h-screen overflow-auto shadow-2xl flex flex-col">
            <div>
                <img src={Logo} className="h-24 mx-auto my-6" alt="Page Logo" />
            </div>
            <div className="flex-grow flex flex-col items-center justify-center bg-white text-black">
                <div className="grid m-auto mt-4">
                    <NavItem icon={FolderIcon} text="Patient Records" />
                    <NavItem icon={AddIcon} text="Add Record" />
                    <NavItem icon={CalendarIcon} text="Calendar" />
                </div>
                <div id="menu-logout" className="cursor-pointer mt-auto mb-10 pb-8 flex space-x-2">
                    <img src={LogoutIcon} className="w-6 h-6" alt="Logout Icon" />
                </div>
            </div>
        </div>
    );
}

const NavItem = ({ icon, text }) => {
    return (
        <div className="cursor-pointer pr-2 pl-2">
            <div className="flex flex-col flex-wrap justify-center items-center p-2 hover:bg-custom-gray h-20 rounded-xl hover:shadow-inner-dark">
                <img src={icon} className="w-6 h-6" alt={`${text} Icon`} />
                <p className="text-sm text-center">{text}</p>
            </div>
        </div>
    );
}

export default Navbar;
