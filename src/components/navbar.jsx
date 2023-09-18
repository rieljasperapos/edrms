import React from "react";
import Logo from '../assets/clinicLogo.png'
import AddIcon from '../assets/add-icon.png'
import CalendarIcon from '../assets/calendar-icon.png'
import FolderIcon from '../assets/folder-icon.png'
import LogoutIcon from '../assets/logout-icon.png'
import './navbar.css'

const Navbar = () => {
    return (
        <>
            <div className="navbar-menu">
                <div>
                    <img src={Logo} className="page-logo"></img>
                    <div className="menu">
                        <div id="menu-rec">
                            <div className="icon-text">
                                <img src={FolderIcon}></img>
                                <p>Patient Records</p>
                            </div>
                        </div>
                        <div id="menu-calendar">
                            <div className="icon-text">
                                <img src={CalendarIcon}></img>
                                <p>Calendar</p>
                            </div>
                        </div>
                        <div id="menu-addPatient">
                            <div className="icon-text">
                                <img src={AddIcon}></img>
                                <p>Add Patient</p>
                            </div>
                        </div>
                        <div id="menu-logout">
                            <div className="icon-text">
                                <img src={LogoutIcon}></img>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;

// import React from "react";
// import Logo from '../assets/clinicLogo.png';
// import AddIcon from '../assets/add-icon.png';
// import CalendarIcon from '../assets/calendar-icon.png';
// import FolderIcon from '../assets/folder-icon.png';
// import LogoutIcon from '../assets/logout-icon.png';
// import './output.css'

// const Navbar = () => {
//     return (
//         <div className="navbar-menu bg-custom-blue text-white w-64 fixed h-screen overflow-auto shadow-lg flex flex-col">
//             <div className="flex-grow flex flex-col justify-center">
//                 <img src={Logo} className="h-24 mx-auto my-6" alt="Page Logo" />
//                 <div className="text-center space-y-4">
//                     <div className="cursor-pointer flex items-center space-x-2">
//                         <img src={FolderIcon} className="w-6 h-6" alt="Patient Records Icon" />
//                         <p className="text-sm">Patient Records</p>
//                     </div>
//                     <div className="cursor-pointer flex items-center space-x-2">
//                         <img src={CalendarIcon} className="w-6 h-6" alt="Calendar Icon" />
//                         <p className="text-sm">Calendar</p>
//                     </div>
//                     <div className="cursor-pointer flex items-center space-x-2">
//                         <img src={AddIcon} className="w-6 h-6" alt="Add Patient Icon" />
//                         <p className="text-sm">Add Patient</p>
//                     </div>
//                 </div>
//             </div>
//             <div id="menu-logout" className="cursor-pointer mt-auto flex items-center space-x-2 justify-center">
//                 <img src={LogoutIcon} className="w-6 h-6" alt="Logout Icon" />
//                 <p className="text-sm">Logout</p>
//             </div>
//         </div>
//     );
// }

// export default Navbar;

