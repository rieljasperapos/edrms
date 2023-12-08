import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

function Login() {
  const { authenticated } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [validAccount, setValidAccount] = useState(true);
  const [inputsFilled, setInputsFilled] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [notDeactivatedAccount, setNotDeactivatedAcocunt] = useState(true);

  const handleLogin = () => {
    setValidAccount(true);
    setNotDeactivatedAcocunt(true);
    if (!inputsFilled) {
      return;
    }
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
          navigate("/dashboard");
        } else {
          if (data.message === "Account is deactivated") {
            setNotDeactivatedAcocunt(data.valid);
          }
          if (
            data.message === "User not found" ||
            data.message === "Invalid Credentials"
          ) {
            setValidAccount(data.valid);
          }
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    validateInputs();
  }, [userName, password]);

  const validateInputs = () => {
    if (!userName || !password) {
      // Handle validation error, for example, set an error state or display a message
      console.error("Username and password are required.");
      setInputsFilled(false);
    } else {
      // Inputs are valid, you can perform additional actions if needed
      console.log("Inputs are valid.");
      setInputsFilled(true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("signupSuccess") === "true") {
      setSignupSuccess(true);

      // Hide the success message after 2 seconds
      const timeoutId = setTimeout(() => {
        setSignupSuccess(false);
      }, 1000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, []);

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

      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
              required
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
              required
            />
          </div>
          {!validAccount && notDeactivatedAccount && (
            <div className="relative mt-4 flex items-center gap-1 self-start text-red-500">
              <MdError />
              Invalid Username or Password
            </div>
          )}
          {!notDeactivatedAccount && validAccount && (
            <div className="relative mt-4 flex items-center gap-1 self-start text-red-500">
              <MdError />
              Blocked Account
            </div>
          )}
        </div>

        {/* Log in button */}
        <div className="my-5">
          <button
            className="h-12 w-96 rounded-lg border-2 bg-green-400 text-white hover:bg-green-600"
            type="submit"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>

        <div className="flex items-center justify-center p-4">
          <p>
            Do not have an account?{" "}
            <span
              className="cursor-pointer text-custom-blue transition-transform ease-in hover:text-opacity-60 hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
      {/* Display success message as a modal at the top */}
      {signupSuccess && (
        <div className="fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-gray-500 bg-opacity-80 p-4 shadow-md">
          <div className="flex items-center gap-1 text-green-500">
            <FaCheckCircle />
            Signup was successful! You can now log in.
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
