import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // console.log(userName);
  // console.log(password);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userName, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.valid) {
          console.log(data);
          navigate("/patientRecordList");
          alert(data.message);
        } else {
          alert("No record exist");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

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
          navigate("/patientRecordList");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="mt-24 text-center ">
        <h1 className="text-5xl font-bold">Clam-Pasco Dental Clinic</h1>
        <div className="mx-96 my-10 h-px bg-cyan-600"></div>
      </div>

      <div className="my-10 space-y-4 text-center">
        <h2 className="text-4xl">Login</h2>
        <h3 className="font-bold">ADMIN ACCESS ONLY</h3>
      </div>

      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        {/* Username input box */}
        <div className="my-5">
          <div className="relative">
            <FaRegUserCircle
              className="absolute left-4 top-1/2 -translate-y-1/2 transform text-black"
              size={22}
            />
            <input
              className="h-12 w-96 rounded-lg border-2 border-cyan-600 pl-12"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        {/* Password input box */}
        <div className="my-5">
          <div className="relative">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 transform text-black"
              size={22}
            />
            <input
              className="h-12 w-96 rounded-lg border-2 border-cyan-600 pl-12"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Log in button */}
        <div className="my-5">
          <button
            className="h-12 w-96 rounded-lg border-2 bg-green-400 text-white hover:bg-green-600"
            type="submit"
          >
            Log in
          </button>
        </div>

        <div className="flex items-center justify-center p-4">
          <p>
            Do not have an account?{" "}
            <span
              className="cursor-pointer text-custom-blue transition-transform ease-in hover:text-opacity-60 hover:underline"
              onClick={handleSignUp}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
