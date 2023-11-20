// Navbar.jsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({propUser}) => {
    return (
        <>
                <div className="fixed flex items-center gap-3 top-0 right-0 text-2xl m-4 mb-8 bg-gray-300 p-2 rounded-lg">
                        <FaUserCircle />
                    <p>{propUser.username}</p>
                </div>
        </>
    );
};

export default Navbar;
