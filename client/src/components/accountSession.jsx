// Navbar.jsx
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/dashboard", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.valid) {
          const account = {
            username: data.username,
            isAdmin: data.is_admin,
          };
          setUser(account);
          console.log(user);
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  return (
    <>
      <div className="fixed right-0 top-0 m-4 mb-8 flex items-center gap-3 rounded-lg bg-gray-300 p-2 text-2xl">
        <FaUserCircle />
        <p>{user.username}</p>
        <p>{user.isAdmin}</p>
      </div>
    </>
  );
};

export default Navbar;
