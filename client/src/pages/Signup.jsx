import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import Logo from "../assets/dentalClinicLogo.png";
import Matched from "../assets/icon-check.png";
import EyeIcon from "../assets/eye-icon.png";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const Signup = () => {
  const { authenticated } = useAuth();
  const [userName, setUserName] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
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
    setUserExist(false);
    // Validate password before proceeding
    if (!testPasswordValidity(password, confirmPassword)) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }

    if (
      !userName ||
      !password ||
      !firstName ||
      !lastName ||
      !middleName ||
      !birthDate
    ) {
      console.log("All fields must be filled out");
      return;
    }

    // If password is valid, proceed with the fetch request
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
        if (data.valid) {
          console.log("Successfully Registered");
          navigate("/signin?signupSuccess=true");
        } else {
          setUserExist(true);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error registering user: ${error.message}`);
      });
  };

  // Validation function outside handleSignup (assuming this is a separate function)
  const testPasswordValidity = (password, confirmPassword) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/])[A-Za-z\d!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/]{8,}$/;
    const isLengthValid = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/]/.test(password);
    const meetsComplexityRequirements = regex.test(password);

    const isValid =
      password !== "" &&
      isLengthValid &&
      hasUppercase &&
      hasDigit &&
      hasSpecialChar &&
      meetsComplexityRequirements;

    return isValid;
  };

  // const handleChange = (e) => {
  //   const newUserName = e.target.value;
  //   setUserName(newUserName);
  //   console.log(newUserName);
  //
  //   fetch(`http://localhost:3000/accounts`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userName: newUserName }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Error ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setUserExist(data.exist);
  //     })
  //     .catch((error) => {
  //       console.error(`Error registering user: ${error.message}`);
  //     });
  // };

  useEffect(() => {
    setMatchStatus(
      password === confirmPassword &&
        (password !== "" || confirmPassword !== ""),
    );
  }, [password, confirmPassword]);

  // console.log(matchStatus)

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
              {userExist && (
                <div className="flex items-center gap-1 pt-1 text-xs text-red-500">
                  <MdError />
                  Username already exist
                </div>
              )}
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
              {!validPassword && (
                <div className="pt-1 text-xs text-red-500">
                  <div className="flex items-center gap-1">
                    <MdError />
                    Password must contain:
                  </div>
                  <ul>
                    <li>Minimum 8 characters required</li>
                    <li>Must contain at least one uppercase character.</li>
                    <li>Must contain at least one number (0-9)</li>
                  </ul>
                </div>
              )}
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
                    onClick={() => navigate("/signin")}
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
