import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import useAuth from "../hooks/useAuth.js";

const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { authenticated, username } = useAuth();

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
    setName(username);
    console.log(username);
  }, [username]); // Include username as a dependency

  return (
    <>
      <Navbar />
      <h1>Temporary Dashboard</h1>
      <p>Welcome {name}</p>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default Dashboard;
