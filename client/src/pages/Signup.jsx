import { useState, useEffect } from "react";
import Logo from "../assets/dentalClinicLogo.png";
import Matched from "../assets/icon-check.png";
import EyeIcon from "../assets/eye-icon.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [matchStatus, setMatchStatus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    if (
      !userName ||
      !password ||
      !firstName ||
      !lastName ||
      !middleName ||
      !birthDate
    ) {
      alert("All fields must be filled out");
      return;
    }

    fetch(`http://localhost:3000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        middleName,
        birthDate,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Successfully Registered");
        console.log(data);
        navigate("/signin");
      })
      .catch((error) => {
        console.error(`Error registering user: ${error.message}`);
      });
  };

  useEffect(() => {
    if (
      password === confirmPassword &&
      (password != "" || confirmPassword != "")
    ) {
      setMatchStatus(true);
    } else {
      setMatchStatus(false);
    }
  }, [password, confirmPassword]);

  // console.log(matchStatus)

  const handleSignIn = () => {
    navigate("/signin");
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

  return (
    <>
      <div className="h-screen sm:grid sm:grid-cols-2">
        <div className="mb-12 flex justify-center rounded-b-2xl bg-custom-blue sm:mb-0 sm:shadow-2xl">
          <div className="flex items-center justify-center">
            <img src={Logo}></img>
          </div>
        </div>
        <div className="ml-16 mr-16 flex w-auto flex-col justify-center pb-8 pt-8 2xl:ml-36 2xl:mr-36">
          <h1 className="p-10 pt-0 text-center text-4xl font-semibold text-custom-blue">
            Signup
          </h1>
          <div className="flex items-center justify-center p-4">
            <div className="w-full">
              <p>Username</p>
              <input
                required
                value={userName}
                type="text"
                className="w-full rounded-lg border p-2"
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="w-full">
              <div className="flex">
                <p>Password</p>
                {matchStatus && <img className="ml-2 h-6" src={Matched}></img>}
              </div>
              <div className="relative">
                <input
                  required
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border p-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-4 top-2.5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    className="h-5"
                    src={EyeIcon}
                    alt={showPassword ? "Hide" : "Show"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="w-full">
              <div className="flex">
                <p>Confirm Password</p>
                {matchStatus && <img className="ml-2 h-6" src={Matched}></img>}
              </div>
              <div className="relative">
                <input
                  required
                  value={confirmPassword}
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border p-2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute right-4 top-2.5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    className="h-5"
                    src={EyeIcon}
                    alt={showPassword ? "Hide" : "Show"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 sm:flex-row">
            <div className="w-full pb-4 sm:mr-4 sm:p-0">
              <p>First name</p>
              <input
                required
                value={firstName}
                type="text"
                className="w-full rounded-lg border p-2"
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="w-full pt-4 sm:p-0">
              <p>Last name</p>
              <input
                required
                value={lastName}
                type="text"
                className="w-full rounded-lg border p-2"
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 sm:flex-row">
            <div className="w-full pb-4 sm:mr-4 sm:p-0">
              <p>Middle name</p>
              <input
                required
                value={middleName}
                type="text"
                className="w-full rounded-lg border p-2"
                onChange={(e) => setMiddleName(e.target.value)}
              ></input>
            </div>
            <div className="w-full pt-4 sm:p-0">
              <p>Birth Date</p>
              <input
                required
                value={birthDate}
                type="date"
                className="w-full rounded-lg border p-2"
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="dd / mm / yy"
              ></input>
            </div>
          </div>
          <div className="mt-16 flex items-center justify-center p-4">
            <div className="w-full">
              <button
                className="w-full rounded-lg bg-custom-blue p-4 text-white transition-transform ease-in hover:bg-opacity-60"
                onClick={handleSignup}
              >
                Sign up
              </button>
              <div className="mt-4 flex flex-row justify-center">
                <div className="mt-2 h-2 w-64 border-b"></div>
                <p className="ml-4 mr-4 text-center">or</p>
                <div className="mt-2 h-2 w-64 border-b"></div>
              </div>
              <div className="flex items-center justify-center p-4">
                <p>
                  Already have an account?{" "}
                  <span
                    className="cursor-pointer text-custom-blue transition-transform ease-in hover:text-opacity-60 hover:underline"
                    onClick={handleSignIn}
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
